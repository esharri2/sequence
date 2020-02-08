import React from "react";
import styled from "styled-components";

import { breakpoints } from "../utils/styles";

const Wrapper = styled.span`
  @media screen and (min-width: calc(${breakpoints.md} + 1px)) {
    display: none;
  }
`;

const MobileOnly = props => <Wrapper>{props.children}</Wrapper>;

export default MobileOnly;
