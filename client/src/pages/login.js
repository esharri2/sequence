import React, { useContext, useState } from "react";
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

import { postData } from "../utils/http";
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

  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await postData("/auth/login", {
        email: email.value,
        password: password.value
      });
      clientLogIn(userContext, response.email);
      if (response.hasSequences) {
        navigate("/my-sequences/");
      } else {
        navigate("/home/");
      }
    } catch (error) {
      const message =
        error.code === 401
          ? errorMessages.badCredentials
          : errorMessages.generic;
      setErrorMessage(message);
      setLoading(false);
    }
  };

  return (
    <Layout mobileSized={true} hideFooter={true} hideNav={true}>
      <Back />
      <Heading center={true} level={1}>
        Log In
      </Heading>
      {loading && <SpinnerOverlay />}
      {isNewUser && (
        <CenteredParagraph>
          Thanks for signing up! Log in to get started.
        </CenteredParagraph>
      )}
      {isNewPassword && (
        <CenteredParagraph>Log in with your new password.</CenteredParagraph>
      )}
      <AuthForm
        handleSubmit={handleSubmit}
        email={email}
        password={password}
        isEmailValid={isEmailValid}
        isPasswordValid={isPasswordValid}
        error={errorMessage ? <AlertMessage message={errorMessage} /> : false}
        setErrorMessage={setErrorMessage}
      />

      <Link to="/forgot-password/">Forgot password?</Link>
    </Layout>
  );
};
