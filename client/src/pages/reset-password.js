import React, { useState } from "react";
import { navigate } from "gatsby";

import AlertMessage from "../components/alert-message";
import Button from "../components/button";
import FormField from "../components/form-field";

import Heading from "../components/heading";
import Layout from "../components/layout";
import Link from "../components/link";
import SpinnerOverlay from "../components/spinner-overlay";

import { errorMessages } from "../utils/errorMessages";
import useFormInput from "../utils/customHooks/useFormInput";
import { postData } from "../utils/http";

//TODO refactor SignUp / Login to remove code duplication

export default props => {
  const newPassword = useFormInput("");
  const newPasswordRetype = useFormInput("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Get token from url param
  const token = props["*"];

  if (!token && !error) {
    setError(true);
  }

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    try {
      postData("/auth/changepassword", {
        newPassword: newPassword.value,
        token
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
    <Layout mobileSized={true} hideFooter={true} hideNav={true}>
      <Heading center={true} level={1}>
        Reset Password
      </Heading>
      {loading && <SpinnerOverlay />}
      {error && (
        <AlertMessage>
          Uh-oh. Something is wrong. Please return <Link to="/">home</Link>.
        </AlertMessage>
      )}
      {!loading && !error && (
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
            label="Retype new password"
            autocomplete="on"
            {...newPasswordRetype}
          />
          <Button
            as="input"
            disabled={
              !newPassword.value ||
              newPassword.value !== newPasswordRetype.value
            }
            type="submit"
            value="Submit"
            onClick={handleSubmit}
          />
        </form>
      )}
    </Layout>
  );
};
