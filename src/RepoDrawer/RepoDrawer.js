import React, { Component } from 'react';
import classNames from 'classnames';
import Contributor from '../Contributor';
import './RepoDrawer.css';

class RepoDrawer extends Component {
  state = { isFakeLoading: true };
  PLACEHOLDER_AMOUNT = Math.floor(Math.random() * (7 - 3) + 3);

  componentDidUpdate(prevProps) {
    if (prevProps.hasFetched !== this.props.hasFetched) {
      // if we are coming to a finished loading state, add a little extra loading time
      // to make the transition more smooth.
      setTimeout(() => {
        this.setState({ isFakeLoading: false });
      }, 1000);
    }
  }

  render() {
    const { isVisible, isLoading, contributors } = this.props;
    const { isFakeLoading } = this.state;
    console.log(contributors);
    return (
      <div
        className={classNames('RepoDrawer', {
          'RepoDrawer-visible': isVisible,
        })}
      >
        {(isLoading || isFakeLoading) &&
          [...Array(this.PLACEHOLDER_AMOUNT)].map((_, i) => (
            <Contributor
              key={i}
              isLoading={isLoading || isFakeLoading}
              isVisible={isVisible}
              isFake
            ></Contributor>
          ))}
        {contributors.map((contributor) => (
          // sort by contributions?
          <Contributor
            key={contributor.id}
            isLoading={isLoading || isFakeLoading}
            isVisible={isVisible}
            contributor={contributor}
          ></Contributor>
        ))}
      </div>
    );
  }
}

export default RepoDrawer;
