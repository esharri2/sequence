import React from "react";
import styled from "styled-components";

import Button from "./button";
import FormField from "./form-field";

import { breakpoints, spacing } from "../utils/styles";

const AuthFormWrapper = styled.form`
  margin: 0 auto ${spacing.md} 0;
`;

const WideButton = styled(Button)`
  @media screen and (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`;

const AuthForm = props => {
  const handleOnFocus = () => {
    if (props.error) {
      props.setErrorMessage(false);
    }
  };

  return (
    <AuthFormWrapper>
      <FormField
        id="email"
        type="email"
        label="Email"
        autocomplete="on"
        onFocus={handleOnFocus}
        {...props.email}
      />
      <FormField
        id="password"
        type="password"
        label="Password"
        autocomplete="on"
        onFocus={handleOnFocus}
        {...props.password}
      />
      {props.error || (
        <WideButton
          forwardedAs="input"
          disabled={!props.isEmailValid || !props.isPasswordValid}
          type="submit"
          value="Submit"
          onClick={props.handleSubmit}
        />
      )}
    </AuthFormWrapper>
  );
};

export default AuthForm;
