import React from "react";
import styled from "styled-components";

import { breakpoints, colors, fonts, spacing } from "../utils/styles";

const Text = styled.h1`
  text-transform: lowercase;
  font-size: 6rem;
  margin: 0;
  line-height: 1;
  /* color: ${colors.black}; */

  @media screen and (min-width: ${breakpoints.md}) {
    font-size: 8rem;
  }
`;

const Logo = props => {
  const heading = <Text className={props.className}>Vois</Text>;

  if (props.link) {
    return <a href={props.link}>{heading}</a>;
  } else {
    return heading;
  }
};

export default Logo;
