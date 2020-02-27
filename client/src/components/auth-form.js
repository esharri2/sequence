import React from "react";
import styled from "styled-components";

import Button from "./button";
import FormField from "./form-field";
import Link from "./link";

import { breakpoints, spacing } from "../utils/styles";

const AuthFormWrapper = styled.form`
  margin: 0 auto ${spacing.md} 0;
`;

const WideButton = styled(Button)`
  @media screen and (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const AuthForm = props => {
  const handleOnFocus = () => {
    if (props.error) {
      props.setErrorMessage(false);
    }
  };

  const termsLabel = (
    <>
      I have read and agree to the{" "}
      <StyledLink to="/terms/"> Terms of Service</StyledLink> and{" "}
      <StyledLink to="/privacy/"> Privacy Policy</StyledLink>
    </>
  );

  const hasCheckboxes =
    props.acceptsPasswordPolicy !== undefined &&
    props.acceptsPolicies !== undefined;

  console.log(props.acceptsPolicies);

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
      {hasCheckboxes && (
        <FormField
          id="acceptsPolicies"
          type="checkbox"
          label={termsLabel}
          {...props.acceptsPolicies}
        />
      )}
      {hasCheckboxes && (
        <FormField
          id="acceptsPasswordPolicy"
          type="checkbox"
          label="I agree to not use a password I am already using elsewhere."
          {...props.acceptsPasswordPolicy}
        />
      )}
      {props.error || (
        <WideButton
          forwardedAs="input"
          disabled={
            !props.isEmailValid ||
            !props.isPasswordValid ||
            (hasCheckboxes && props.acceptsPolicies.value === false) ||
            (hasCheckboxes && props.acceptsPasswordPolicy.value === false)
          }
          type="submit"
          value="Submit"
          onClick={props.handleSubmit}
        />
      )}
    </AuthFormWrapper>
  );
};

export default AuthForm;
