import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function FaIcon({ iconName, className, type }) {
  const iconClassNames = classNames(className, {
    fa: type === 'default',
    fal: type === 'light',
    far: type === 'regular',
    fas: type === 'solid',
  }, `fa-${iconName}`);

  return (
    <i className={iconClassNames} />
  );
}

FaIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf([ 'light', 'solid', 'regular' ]),
};

FaIcon.defaultProps = {
  className: '',
  type: 'default',
};
