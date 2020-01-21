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
  color: ${props => props.textColor};
  fill: ${props => props.textColor};
  border: ${border.style} ${border.size} transparent;
  border-radius: ${border.radius};
  padding: ${spacing.sm};
  transition: background-color ${transitions.fast}, color ${transitions.fast},
    border-color ${transitions.fast}, fill ${transitions.fast};
  text-decoration: none;
  font-size: 1rem;
  text-align: center;
  font-weight: ${fonts.mediumWeight};
  cursor: pointer;

  &:active {
    outline: 0;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    color: ${props => (props.reverse ? colors.brightlavender : colors.black)};
    background-color: ${props =>
      props.reverse ? "transparent" : colors.brightlavender};
    /* outline-color: ${colors.accent2}; */
    /* border-color: ${colors.accent1}; */
    outline: none;
    fill: ${props => (props.reverse ? colors.brightlavender : colors.black)};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${props =>
      props.reverse ? `transparent` : colors.oslogray};
    color: ${props => (props.reverse ? colors.oslogray : colors.black)};
    fill: ${props => (props.reverse ? colors.oslogray : colors.black)};
  }
`;

const Button = props => {
  const colorA = colors.lavender;
  const colorB = colors.black;

  const buttonColor = props.reverse ? colorB : colorA;
  const textColor = buttonColor === colorB ? colorA : colorB;

  return (
    <ButtonTag
      reverse={props.reverse}
      buttonColor={buttonColor}
      textColor={textColor}
      aria-label={props.title}
      {...props}>
      {props.children}
    </ButtonTag>
  );
};

export default Button;
