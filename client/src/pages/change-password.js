import React, { useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";

import Button from "../components/button";
import FormField from "../components/form-field";

import Heading from "../components/heading";
import Layout from "../components/layout";

import { errorMessages } from "../utils/errorMessages";
import { changePassword } from "../utils/api";
import useFormInput from "../utils/customHooks/useFormInput";
import SpinnerOverlay from "../components/spinner-overlay";

import { breakpoints } from "../utils/styles";

//TODO refactor SignUp / Login to remove code duplication

const WideButton = styled(Button)`
  @media screen and (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`;

export default () => {
  const newPassword = useFormInput("");
  const newPasswordRetype = useFormInput("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = event => {
    setLoading(true);
    event.preventDefault();
    changePassword(newPassword.value)
      .then(response => {
        navigate("/login/", {
          replace: true,
          state: {
            isNewPassword: true
          }
        });
      })
      .catch(error => {
        setError(
          error.status === 401
            ? errorMessages.badCredentials
            : errorMessages.generic
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout mobileSized={true}>
      <Heading level={1}>Change Password</Heading>
      {loading && <SpinnerOverlay />}
      {/* TODO improve this */}
      {error && "there is an error."}
      <form>
        <FormField
          id="newPassword"
          type="password"
          label="New password"
          autocomplete="on"
          {...newPassword}
        />
        <FormField
          id="newPasswordRetype"
          type="password"
          label="Retype password"
          autocomplete="on"
          {...newPasswordRetype}
        />
        <WideButton
          forwardedAs="input"
          disabled={newPassword.value !== newPasswordRetype.value}
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>
    </Layout>
  );
};
