import React from "react";
import styled, { keyframes } from "styled-components";

import { animations, transitions } from "../../utils/styles";

const animation = keyframes`
   0% {
      opacity: 0;
    }

    100 {
      opacity: 1;
    }
`;

const Wrapper = styled.div`
  animation: ${animation} ${transitions.medium} ease-in;
`;

const FadeIn = props => <Wrapper>{props.children}</Wrapper>;

export default FadeIn;
