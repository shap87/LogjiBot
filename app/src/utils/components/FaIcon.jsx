import React from 'react';
import PropTypes from 'prop-types';

import iconType from '../iconType';

export default function FaIcon({ iconName, className, type }) {
  return (
    <i className={`${className} fa${iconType(type)} fa-${iconName}`} />
  );
}

FaIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

FaIcon.defaultProps = {
  className: '',
  type: '',
};
