import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class OAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasValidationBeenFailed: false,
    };

    this.handleTokenValidation = this.handleTokenValidation.bind(this);
  }

  componentDidMount() {
    const { validateToken, location } = this.props;

    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access');
    const refreshToken = params.get('refresh');

    validateToken(accessToken, refreshToken)
      .then(this.handleTokenValidation);
  }

  handleTokenValidation() {
    const { isAuthenticated } = this.props;

    this.setState({ hasValidationBeenFailed: !isAuthenticated });
  }

  render() {
    const { hasValidationBeenFailed } = this.state;
    const { isAuthenticated } = this.props;

    if (hasValidationBeenFailed) {
      return (<Redirect to="/signin" />);
    }

    if (isAuthenticated) {
      return (<Redirect to="/" />);
    }

    return (
      <section className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
        <div className="px-4 py-3 shadow-z3 rounded">
          <h5 className="text-center px-5">Verifying your token...</h5>
          <Progress animated value={100} />
        </div>
      </section>
    );
  }
}

OAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  validateToken: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
