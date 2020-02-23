import React, { useState, useContext } from "react";
import styled from "styled-components";

import Button from "./button";
import FormField from "./form-field";
import Paragraph from "./paragraph";
import SpinnerOverlay from "./spinner-overlay";

import { errorMessages } from "../utils/errorMessages";
import useFormInput from "../utils/customHooks/useFormInput";
import useValidityCheck from "../utils/customHooks/useValidityCheck";
import { validateEmail } from "../utils/validators";
import UserContext from "../context/UserContext";
import { breakpoints } from "../utils/styles";
import { postData } from "../utils/http";

const ContactFormWrapper = styled.form`
  margin: 0 auto;
  max-width: ${breakpoints.xsmall};
`;

const ContactForm = props => {
  const name = useFormInput("");
  const user = useContext(UserContext).user;
  const email = useFormInput(user ? user.email : null);
  const message = useFormInput("");

  const [error, setError] = useState(false);
  const isEmailValid = useValidityCheck(false, email, validateEmail);

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setIsSending(true);
    try {
      postData("/email/contactForm", {
        name: name.value,
        email: email.value,
        message: message.value
      });

      if (typeof window === "undefined") {
        setIsSent(true);
        return;
      }
      setIsSent(true);
      setTimeout(() => {
        window.history.back();
      }, 3000);
    } catch (error) {
      setError(errorMessages.generic);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ContactFormWrapper>
      {isSending && <SpinnerOverlay />}
      {isSent && (
        <>
          <Paragraph>Your message was sent!</Paragraph>
          <Paragraph>Returning you to the previous page...</Paragraph>
        </>
      )}
      {!isSending && !isSent && (
        <>
          <FormField
            id="name"
            placeholder="Name"
            label="Your name"
            type="text"
            {...name}
          />
          <FormField
            id="email"
            placeholder="Email address"
            type="email"
            label="Email"
            {...email}
          />
          <FormField
            value=""
            id="message"
            type="textarea"
            label="Message"
            placeholder="Tell us what's on your mind!"
            {...message}
          />
          {error || (
            <Button
              as="input"
              disabled={!isEmailValid}
              type="submit"
              value="Send"
              onClick={handleSubmit}
            />
          )}
        </>
      )}
    </ContactFormWrapper>
  );
};

export default ContactForm;
