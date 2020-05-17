import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Shimmer from '../Shimmer';
import './Contributor.css';

class Contributor extends Component {
  state = { hasFinishedAnimating: true };

  componentDidUpdate(prevProps) {
    if (prevProps.isVisible && !this.props.isVisible) {
      this.setState({
        hasFinishedAnimating: false,
      });
      // If we are hiding the contributors, wait for the drawer animation to finish before hiding
      setTimeout(() => {
        this.setState({
          hasFinishedAnimating: true,
        });
      }, 1000);
    }
  }
  render() {
    const { contributor, index, isLoading, isFake, isVisible } = this.props;
    const { hasFinishedAnimating } = this.state;
    const { login, avatar_url, html_url } = contributor;

    if (!isVisible && hasFinishedAnimating) {
      return null;
    }

    return (
      <>
        {isFake && (
          <div className="Contributor">
            <Shimmer className="Contributor__fakeName" />
            <Shimmer className="Contributor__fakeAvatar" />
          </div>
        )}
        <a
          href={html_url}
          className={classNames('Contributor', {
            'Contributor-hidden': isLoading,
          })}
        >
          <p className="Contributor__rank">{`#${index + 1}`}</p>
          <div
            className="Contributor__progressBar"
            style={{ width: `${contributor.contributionsPercentage}%` }}
          />
          <h4 className="Contributor__name">{login}</h4>
          <img
            className="Contributor__avatar"
            alt={login}
            src={avatar_url}
          ></img>
        </a>
      </>
    );
  }
}

Contributor.defaultProps = {
  isFake: false,
  isVisible: false,
  isLoading: false,
  contributor: { login: '', avatar_url: '', html_url: '' },
  index: 0,
};

Contributor.propTypes = {
  contributor: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFake: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Contributor;
