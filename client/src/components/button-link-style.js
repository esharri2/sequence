import React from "react";
import styled from "styled-components";

import Button from "./button";

import { colors, transitions } from "../utils/styles";

const ButtonLinkStyleTag = styled(Button)`
  display: flex;
  position: relative;
  font-size: inherit;
  background-color: transparent;
  border: none;
  color: ${colors.accent1};
  padding: 0;
  line-height: 1rem;
  /* text-decoration: none; */
  transition: all ${transitions.fast};
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: underline;
    outline-color: ${colors.accent2};
  }
`;

const ButtonLinkStyle = props => (
  <ButtonLinkStyleTag {...props}>{props.children}</ButtonLinkStyleTag>
);

export default ButtonLinkStyle;
