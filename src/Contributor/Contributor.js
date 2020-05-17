import React, { Component } from 'react';
import classNames from 'classnames';
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
    const {
      contributor = {},
      index,
      isLoading,
      isFake,
      isVisible,
    } = this.props;
    const { hasFinishedAnimating } = this.state;
    const { login = '', avatar_url = '', html_url = '' } = contributor;

    if (!isVisible && hasFinishedAnimating) {
      return null;
    }
    console.log(contributor, contributor.contributionsPercentage);
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

export default Contributor;
