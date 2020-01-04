import React from "react";
import styled from "styled-components";
import { border, breakpoints, colors, spacing } from "../utils/styles";

const InputTag = styled.input`
  font-size: inherit;
  padding: ${spacing.xs};
  margin: ${spacing.xs} 0;
  // TODO this may be difficult to work with using grid like forms? idk
  width: 100%;
  max-width: ${breakpoints.small};
  border: none;
  border-bottom: ${border.size} ${border.style} ${colors.medium};

  &:focus {
    outline-color: ${colors.accent2};
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
  /* max-width: ${breakpoints.small}; */
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
