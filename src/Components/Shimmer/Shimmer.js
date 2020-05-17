import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Shimmer.css';

const Shimmer = ({ className }) => (
  <div className={classNames('Shimmer', className)} />
);

Shimmer.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Shimmer;
