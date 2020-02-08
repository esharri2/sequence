import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { breakpoints, fonts, spacing } from "../utils/styles";

const HeadingTag = styled.h1`
  font-family: ${fonts.heading};
  margin: ${spacing.sm} 0;
  text-align: ${props => (props.center === true ? "center" : "left")};

  @media screen and (max-width: ${breakpoints.md}) {
    text-align: center;
  }
`;

const Heading = props => {
  return (
    <HeadingTag
      center={props.center}
      className={props.className}
      as={`h${props.level}`}>
      {props.children}
    </HeadingTag>
  );
};

Heading.propTypes = {
  level: PropTypes.number
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
