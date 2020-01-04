import React, { useContext, useState, useEffect } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";

import AlertMessage from "../components/alert-message";
import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Link from "../components/link";
import AuthForm from "../components/auth-form";
import Paragraph from "../components/paragraph";
import SpinnerOverlay from "../components/spinner-overlay";

import useFetch from "../utils/customHooks/useFetch";
import useFormInput from "../utils/customHooks/useFormInput";
import UserContext from "../context/UserContext";
import useValidityCheck from "../utils/customHooks/useValidityCheck";
import { errorMessages } from "../utils/errorMessages";

import { validateEmail, validatePassword } from "../utils/validators";
import { clientLogIn } from "../utils/auth";

const CenteredParagraph = styled(Paragraph)`
  text-align: center;
`;

//TODO refactor SignUp / Login to remove code duplication

export default props => {
  const userContext = useContext(UserContext);
  const email = useFormInput(process.env.GATSBY_TESTING_USERNAME || "");
  const password = useFormInput(process.env.GATSBY_TESTING_PASSWORD || "");
  const isEmailValid = useValidityCheck(false, email, validateEmail);
  const isPasswordValid = useValidityCheck(false, password, validatePassword);
  const locationState = props.location.state || {};
  const isNewUser = locationState.isNewUser;
  const isNewPassword = locationState.isNewPassword;

  const apiResponse = useFetch(
    undefined,
    { body: JSON.stringify({ email: email.value, password: password.value }) },
    "POST",
    false,
    response => {
      clientLogIn(userContext, response.email);
      navigate("/home/");
    }
  );

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (apiResponse.error) {
      const message =
        apiResponse.error.status === 401
          ? errorMessages.badCredentials
          : errorMessages.generic;
      setErrorMessage(message);
    }
  }, [apiResponse.error]);

  const handleSubmit = event => {
    event.preventDefault();

    apiResponse.setRoute("/auth/login");
  };

  return (
    <Layout mobileSized={true} hideFooter={true} hideNav={true}>
      <Back />
      <Heading center={true} level={1}>
        Log In
      </Heading>
      {isNewUser ? (
        <CenteredParagraph>
          Thanks for signing up! Log in to get started.
        </CenteredParagraph>
      ) : null}
      {isNewPassword ? (
        <CenteredParagraph>Log in with your new password.</CenteredParagraph>
      ) : null}
      {apiResponse.loading ? (
        <SpinnerOverlay />
      ) : (
        <AuthForm
          handleSubmit={handleSubmit}
          email={email}
          password={password}
          isEmailValid={isEmailValid}
          isPasswordValid={isPasswordValid}
          error={errorMessage ? <AlertMessage message={errorMessage} /> : false}
          onFocus={() => {
            setErrorMessage(null);
          }}
        />
      )}
      <Link to="/ForgotPassword/">Forgot password?</Link>
    </Layout>
  );
};
