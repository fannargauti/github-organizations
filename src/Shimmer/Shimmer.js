import React from 'react';
import classNames from 'classnames';
import './Shimmer.css';

const Shimmer = ({ className }) => (
  <div className={classNames('Shimmer', className)} />
);

export default Shimmer;
