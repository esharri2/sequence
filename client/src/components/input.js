import React from "react";
import styled from "styled-components";
import { border, breakpoints, colors, spacing } from "../utils/styles";

const InputTag = styled.input`
  font-size: inherit;
  font-family: inherit;
  padding: ${spacing.xs};
  padding-bottom: calc(${spacing.xs} + 1px);
  margin: ${spacing.xs} 0;
  width: 100%;
  max-width: ${breakpoints.small};
  border: none;
  border-bottom: ${border.size} ${border.style} ${colors.medium};
  background-color: transparent;
  color: ${colors.lavender};
  border-radius: ${border.radius} ${border.radius} 0 0;

  &:focus {
    border-bottom-color: ${colors.brightlavender};
    background-color: ${colors.blacklavender};
    outline: none;
  }

  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type="radio"] {
    position: relative;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    padding: 0;
    margin: 0 ${spacing.sm};

    & + label::before {
      cursor: pointer;
    }

    &:after {
      content: "";
      display: block;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      border: 2px ${border.style} ${colors.accent1};
      cursor: pointer;
    }

    &:checked {
      &:after {
        background-color: ${colors.accent1};
      }
    }
  }
`;

const TextAreaTag = styled(InputTag)`
  height: calc(${breakpoints.xsmall} / 4);
`;

const Input = props =>
  props.type === "textarea" ? (
    <TextAreaTag as="textarea" {...props}>
      {props.children}
    </TextAreaTag>
  ) : (
    <InputTag {...props}>{props.children}</InputTag>
  );
export default Input;
