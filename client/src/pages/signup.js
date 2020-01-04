import React, { useState } from "react";
import { navigate } from "gatsby";

import AlertMessage from "../components/alert-message";
import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import AuthForm from "../components/auth-form";
import SpinnerOverlay from "../components/spinner-overlay";

import { errorMessages } from "../utils/errorMessages";
import { signUp } from "../utils/api";
import useFormInput from "../utils/customHooks/useFormInput";
import useValidityCheck from "../utils/customHooks/useValidityCheck";
import { validateEmail, validatePassword } from "../utils/validators";

//TODO refactor SignUp / Login to remove code duplication

export default props => {
  const email = useFormInput("");
  const password = useFormInput("");

  const locationState = props.location.state || {};
  const isDemo = locationState.isDemo;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isEmailValid = useValidityCheck(false, email, validateEmail);
  const isPasswordValid = useValidityCheck(false, password, validatePassword);

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    signUp(email.value, password.value, isDemo)
      .then(() => {
        navigate("/Login/", {
          replace: true,
          state: {
            isNewUser: true
          }
        });
      })
      .catch(error => {
        const errorBody = error.response ? error.response.data : {};
        const messageFromCode = errorMessages[errorBody.code];
        setError(messageFromCode || errorMessages.generic);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout mobileSized={true} hideFooter={true} hideNav={true}>
      <Back />
      {loading && <SpinnerOverlay />}
      <Heading center={true} level={1}>
        Sign Up
      </Heading>
      <AuthForm
        handleSubmit={handleSubmit}
        email={email}
        password={password}
        isEmailValid={isEmailValid}
        isPasswordValid={isPasswordValid}
        error={error ? <AlertMessage message={error} /> : false}
        onFocus={() => {
          setError(false);
        }}
      />
    </Layout>
  );
};
