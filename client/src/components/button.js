import React from "react";
import styled from "styled-components";
import {
  border,
  colors,
  hexTransparencies,
  fonts,
  spacing,
  transitions
} from "../utils/styles";

const ButtonTag = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  background-color: ${props =>
    props.buttonColor ? props.buttonColor : colors.lavender};
  color: ${props => (props.textColor ? props.textColor : colors.black)};
  fill: ${props => props.textColor};
  border: ${border.style} ${border.size} transparent;
  border-radius: ${border.radius};
  padding: ${spacing.sm};
  transition: background-color ${transitions.fast}, color ${transitions.fast},
    border-color ${transitions.fast};
  text-decoration: none;
  font-size: 1rem;
  text-align: center;
  font-weight: ${fonts.mediumWeight};
  cursor: pointer;

  &:active {
    outline: 0;
  }

  &:hover,
  &:focus {
    background-color: ${props =>
      props.buttonColor
        ? props.buttonColor
        : colors.lavender + hexTransparencies[90]};
    color: ${props => props.buttonColor};
    /* outline-color: ${colors.accent2}; */
    /* border-color: ${colors.accent1}; */
    fill: ${props => props.buttonColor};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Button = props => {
  const colorA = colors.lightest;
  const colorB = colors.accent1;
  const buttonColor = props.reverse ? colorA : colorB;
  const textColor = buttonColor === colorA ? colorB : colorA;

  return (
    <ButtonTag
      buttonColor={buttonColor}
      textColor={textColor}
      aria-label={props.title}
      {...props}>
      {props.children}
    </ButtonTag>
  );
};

export default Button;
