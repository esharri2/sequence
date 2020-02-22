import React, { useState } from "react";

import Back from "../components/back";
import Button from "../components/button";
import FormField from "../components/form-field";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Paragraph from "../components/paragraph";
import SpinnerOverlay from "../components/spinner-overlay";

import useFormInput from "../utils/customHooks/useFormInput";
import useValidityCheck from "../utils/customHooks/useValidityCheck";
import { validateEmail } from "../utils/validators";
import { requestPasswordReset } from "../utils/api";

export default () => {
  const email = useFormInput("");
  const isEmailValid = useValidityCheck(false, email, validateEmail);

  const [loading, setLoading] = useState(false);
  const [wasEmailSent, setWasEmailSent] = useState(undefined);

  const handleSubmit = event => {
    setLoading(true);
    event.preventDefault();
    requestPasswordReset(email.value)
      .then(response => {
        //TODO use alert msg componet
        setWasEmailSent(true);
      })
      .catch(error => {
        setWasEmailSent(false);
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
        Forgot your password?
        <br /> No problem.
      </Heading>
      {wasEmailSent === undefined && (
        <>
          <Paragraph>
            Enter your email, and we'll send you a link to reset your password.
          </Paragraph>
          <form>
            <FormField
              id="email"
              type="email"
              label="Email"
              autocomplete="on"
              {...email}
            />
            <Button
              as="input"
              disabled={!isEmailValid}
              type="submit"
              value="Reset now"
              onClick={handleSubmit}
            />
          </form>
        </>
      )}
      {wasEmailSent === true && (
        <Paragraph>Check your email for further instructions.</Paragraph>
      )}
      {wasEmailSent === false && (
        <Paragraph>Whoops. That didn't work</Paragraph>
      )}
    </Layout>
  );
};
