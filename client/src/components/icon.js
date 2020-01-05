import React from "react";
import styled from "styled-components";

import { colors, hexTransparencies, spacing } from "../utils/styles";

//TODO used prop types to control padding prop options

const IconWrapper = styled.span`
  background-color: transparent;
  pointer-events: none;
  display: inline-block;
  width: 1.2rem;
  height: 1rem;
  margin-right: ${props => (props.padding === "right" ? spacing.xs : 0)};
  margin-left: ${props => (props.padding === "left" ? spacing.xs : 0)};
  fill: inherit;

  svg {
    height: 125%;
    width: 125%;
  }
`;

const Icon = props => {
  return (
    <IconWrapper
      padding={props.padding}
      className={props.className}
      color={props.color}
      dark={props.dark}
      aria-hidden>
      {props.children}
    </IconWrapper>
  );
};

export default Icon;
