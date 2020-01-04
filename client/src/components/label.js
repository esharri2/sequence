import React from "react";
import styled from "styled-components";

import { colors } from "../utils/styles";

const LabelTag = styled.label`
  display: block;
  color: ${colors.accent1};
  ${props => {
    if (props.type === "radio") {
      return `
        display: flex;
        align-items: center;
        cursor: pointer;
      `;
    }
  }}
  /* cursor: ${props => (props.type === "radio" ? " pointer" : "normal")}; */
  /* font-size: 50px; */
`;

const Label = props => <LabelTag {...props}>{props.children}</LabelTag>;

export default Label;
