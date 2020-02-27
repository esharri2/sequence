import React, { useState } from "react";
import { navigate } from "gatsby";

import AlertMessage from "../components/alert-message";
import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Link from "../components/link";
import Paragraph from "../components/paragraph";
import AuthForm from "../components/auth-form";
import SpinnerOverlay from "../components/spinner-overlay";

import { postData } from "../utils/http";
import useFormInput from "../utils/customHooks/useFormInput";
import useValidityCheck from "../utils/customHooks/useValidityCheck";
import { errorMessages } from "../utils/errorMessages";

import { validateEmail, validatePassword } from "../utils/validators";

//TODO refactor SignUp / Login to remove code duplication

export default props => {
  const email = useFormInput(process.env.GATSBY_TESTING_USERNAME || "");
  const password = useFormInput(process.env.GATSBY_TESTING_PASSWORD || "");
  const acceptsPolicies = useFormInput(false);
  const acceptsPasswordPolicy = useFormInput(false);
  const isEmailValid = useValidityCheck(false, email, validateEmail);
  const isPasswordValid = useValidityCheck(false, password, validatePassword);

  const locationState = props.location.state || {};
  const isDemo = locationState.isDemo;

  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postData("/auth/signup", {
        email: email.value,
        password: password.value,
        isDemo
      });
      navigate("/login/", {
        replace: true,
        state: {
          isNewUser: true
        }
      });
    } catch (error) {
      const message =
        error.code === 401
          ? errorMessages.credentialsAlreadyExist
          : errorMessages.generic;
      setErrorMessage(message);
      setLoading(false);
    }
  };

  return (
    <Layout mobileSized={true} hideFooter={true} hideNav={true}>
      <Back />
      {loading && <SpinnerOverlay />}
      <Heading center={true} level={1}>
        Sign up
      </Heading>
      <AuthForm
        handleSubmit={handleSubmit}
        email={email}
        password={password}
        acceptsPolicies={acceptsPolicies}
        acceptsPasswordPolicy={acceptsPasswordPolicy}
        isEmailValid={isEmailValid}
        isPasswordValid={isPasswordValid}
        error={errorMessage ? <AlertMessage message={errorMessage} /> : false}
        setErrorMessage={setErrorMessage}
      />
      <Paragraph>
        Already have an account? <Link to="/login/">Log in here.</Link>
      </Paragraph>
    </Layout>
  );
};
