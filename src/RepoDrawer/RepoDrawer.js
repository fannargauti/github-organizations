import React, { Component } from 'react';
import classNames from 'classnames';
import './RepoDrawer.css';

class RepoDrawer extends Component {
  render() {
    const { isVisible, isLoading } = this.props;

    // if (isLoading) {
    //   return <div className="RepoDrawer-loading"></div>;
    // }

    return (
      <div
        className={classNames('RepoDrawer', {
          'RepoDrawer-visible': isVisible,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export default RepoDrawer;
