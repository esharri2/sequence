import React from "react";
import styled from "styled-components";

import Input from "./input";
import Label from "./label";

import { convertToYYYYMMDD } from "../utils/time";
import { border, colors, spacing } from "../utils/styles";

const FormFieldWrapper = styled.div`
  /* border-left: ${border.size} ${border.style} ${colors.medium}; */
  /* padding-left: ${spacing.md}; */
  margin-bottom: ${spacing.md};
  /* &:hover,
  &:focus-within {
    border-color: ${colors.accent1};
  } */
`;

const InlineLabel = styled(Label)`
  display: flex;
  align-items: center;
  input {
    width: auto;
    margin: 0;
    margin-right: ${spacing.sm};
  }
`;

const FormField = props => {
  //Need to convert all date string to date input friendly format
  const value =
    props.type === "date" ? convertToYYYYMMDD(props.value) : props.value;

  // Note checkboxes may not be working properly
  const checked =
    props.type === "radio" || props.type === "checkbox"
      ? { checked: props.checked }
      : "";

  const InputComponent = (
    <Input
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      id={props.id}
      name={props.name || props.id}
      type={props.type}
      placeholder={props.placeholder}
      value={value}
      autocomplete={props.autocomplete || "off"}
      min={props.min}
      max={props.max}
      disabled={props.disabled}
      {...checked}
    />
  );

  return (
    <FormFieldWrapper className={props.className}>
      {checked ? (
        <InlineLabel htmlFor={props.id} type={props.type}>
          {InputComponent} <span>{props.label}</span>
        </InlineLabel>
      ) : (
        <>
          {InputComponent}
          <Label htmlFor={props.id}>{props.label}</Label>
        </>
      )}
    </FormFieldWrapper>
  );
};
export default FormField;
