import React from "react";
import styled from "styled-components";

import Heading from "./heading";
import Paragraph from "./paragraph";

import { colors } from "../utils/styles";

const ErrorWrapper = styled.div`
  /* background-color: red; */
`;

const ErrorHeading = styled(Heading)`
  color: ${colors.accent2};
`;

const PageError = props => (
  <ErrorWrapper>
    <ErrorHeading level={2}>Whoops!</ErrorHeading>
    {/* Show message from Error object, if passed */}
    {props.message && <Paragraph>{props.message}</Paragraph>}
    {/* Also show whatever children components are passed */}
    {props.children}
  </ErrorWrapper>
);

export default PageError;
