import React from "react";
import styled from "styled-components";

import Button from "./button";
import FormField from "./form-field";

import { spacing } from "../utils/styles";

const AuthFormWrapper = styled.form`
  margin: 0 auto ${spacing.md} 0;
`;

const AuthForm = props => (
  <AuthFormWrapper onFocus={props.onFocus}>
    <FormField
      id="email"
      type="email"
      label="Email"
      autocomplete="on"
      {...props.email}
    />
    <FormField
      id="password"
      type="password"
      label="Password"
      autocomplete="on"
      {...props.password}
    />
    {props.error || (
      <Button
        as="input"
        disabled={!props.isEmailValid || !props.isPasswordValid}
        type="submit"
        value="Submit"
        onClick={props.handleSubmit}
      />
    )}
  </AuthFormWrapper>
);

export default AuthForm;
