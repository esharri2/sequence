import React from "react";
import styled, { css } from "styled-components";

import { animations, transitions } from "../../utils/styles";

const Wrapper = styled.span`
  ${props =>
    props.from === "right"
      ? css`
          animation: ${transitions.medium} ${animations.slideInFromRight}
            ${animations.defaultTimingFunction};
        `
      : css`
          animation: ${transitions.medium} ${animations.slideInFromLeft}
            ${animations.defaultTimingFunction};
        `}
`;

const SlideInX = props => <Wrapper from={props.from}>{props.children}</Wrapper>;

export default SlideInX;
