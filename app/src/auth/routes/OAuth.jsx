import React from 'react';
import PropTypes from 'prop-types';

export default function OAuth({ location }) {
  const params = new URLSearchParams(location.search);

  return (
    <div>
      {params.get('token')}
    </div>
  );
}

OAuth.propTypes = {
  location: PropTypes.object.isRequired,
};
