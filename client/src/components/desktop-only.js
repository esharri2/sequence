import React from "react";
import styled from "styled-components";

import { breakpoints } from "../utils/styles";

const Wrapper = styled.span`
  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

const DesktopOnly = props => <Wrapper>{props.children}</Wrapper>;

export default DesktopOnly;
