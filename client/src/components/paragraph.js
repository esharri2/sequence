import React from "react";
import styled from "styled-components";
import { breakpoints, colors, spacing } from "../utils/styles";

const ParaTag = styled.p`
  margin: ${spacing.xs} 0;
  max-width: ${breakpoints.md};

  a {
    color: ${colors.brightlavender};
  }
`;

const Paragraph = props => <ParaTag {...props}>{props.children}</ParaTag>;

export default Paragraph;
