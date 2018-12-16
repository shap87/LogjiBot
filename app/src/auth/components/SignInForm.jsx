import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Form, FormGroup, Label, Button, Progress,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import CustomInput from '../../utils/components/CustomInput';

export default function SignInForm({ onSubmit, isCustomerAuthenticating }) {
  const validationSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
    keepSignedIn: yup.bool().required(),
  });
  const initialValues = {
    email: '',
    password: '',
    keepSignedIn: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="loginInput">
              Email address / Username
            </Label>
            <Field
              type="email"
              name="email"
              id="loginInput"
              placeholder="john.smith@email.com"
              component={CustomInput}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="passwordInput">
              Password
            </Label>
            <Field
              name="password"
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="enter your password"
              component={CustomInput}
            />
            <Link
              to="/forgot-password"
              className="small float-right"
            >
              forgot password?
            </Link>
          </FormGroup>
          <FormGroup check>
            <Field
              name="keepSignedIn"
              type="checkbox"
              className="form-check-input"
              id="rememberInput"
              component={CustomInput}
              withoutValidation
            />
            <Label
              htmlFor="rememberInput"
              className="form-check-label"
            >
              Keep me signed in
            </Label>
          </FormGroup>
          { isCustomerAuthenticating
            ? (
              <Progress className="mt-3" animated value={100} />
            )
            : (
              <div className="d-flex justify-content-between mt-3">
                <Link
                  to="/signup"
                  className="btn btn-outline-primary"
                >
                Create new account
                </Link>
                <Button
                  type="submit"
                  color="primary"
                  disabled={!isValid}
                >
                Sign In
                </Button>
              </div>
            )
          }
        </Form>
      )}
    </Formik>
  );
}

SignInForm.propTypes = {
  isCustomerAuthenticating: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
