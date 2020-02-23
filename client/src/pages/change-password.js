import React, { useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";

import Back from "../components/back";
import Button from "../components/button";
import Heading from "../components/heading";
import FormField from "../components/form-field";
import Layout from "../components/layout";
import SpinnerOverlay from "../components/spinner-overlay";

import { errorMessages } from "../utils/errorMessages";
import useFormInput from "../utils/customHooks/useFormInput";
import { postData } from "../utils/http";
import { breakpoints } from "../utils/styles";

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
    event.preventDefault();
    setLoading(true);
    try {
      postData("/auth/changepassword", {
        newPassword: newPassword.value
      });
      navigate("/login/", {
        replace: true,
        state: {
          isNewPassword: true
        }
      });
    } catch (error) {
      setError(errorMessages.generic);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout mobileSized={true}>
      <Back />
      <Heading level={1}>Change Password</Heading>
      {loading && <SpinnerOverlay />}
      {/* TODO improve this */}
      {error && "There is an error."}
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
