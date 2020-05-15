import React, { Component } from 'react';
import classNames from 'classnames';
import Shimmer from '../Shimmer';
import './Contributor.css';

class Contributor extends Component {
  state = { hasFinishedAnimating: false };
  componentDidUpdate(prevProps) {
    if (prevProps.isVisible && !this.props.isVisible) {
      // If we are hiding the contributors, wait for the drawer animation to finish before hiding
      setTimeout(() => {
        this.setState({
          hasFinishedAnimating: true,
        });
      }, 1000);
    }
    // if we are showing the drawer, reset the animation flag
    if (!prevProps.isVisible && this.props.isVisible) {
      this.setState({
        hasFinishedAnimating: false,
      });
    }
  }
  render() {
    const { contributor = {}, isLoading, isFake, isVisible } = this.props;
    const { hasFinishedAnimating } = this.state;
    const { login = '', avatar_url = '', html_url = '' } = contributor;

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
