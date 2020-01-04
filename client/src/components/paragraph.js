import React from "react";
import styled from "styled-components";
import { breakpoints, spacing } from "../utils/styles";

const ParaTag = styled.p`
  margin: ${spacing.xs} 0;
  max-width: ${breakpoints.md};
`;

const Paragraph = props => <ParaTag {...props}>{props.children}</ParaTag>;

export default Paragraph;
