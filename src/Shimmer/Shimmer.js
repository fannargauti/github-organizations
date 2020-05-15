import React, { Component } from 'react';
import classNames from 'classnames';
import './Shimmer.css';

class Shimmer extends Component {
  render() {
    const { className } = this.props;
    return <div className={classNames('Shimmer', className)}></div>;
  }
}

export default Shimmer;
