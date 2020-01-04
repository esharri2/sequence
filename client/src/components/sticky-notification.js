import React from "react";
import styled from "styled-components";

import { breakpoints, colors, spacing, zIndexes } from "../utils/styles";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${colors.accent2};
  color: ${colors.accent1};
  z-index: ${zIndexes.top};
  position: fixed;
  bottom: 0;
  padding: ${spacing.xl} ${spacing.large};
  opacity: 0.95;
`;

const Text = styled.div`
  max-width: ${breakpoints.small};
  display: flex;
  align-items: center;
`;

const StickyNotification = props => {
  return (
    <Wrapper>
      <Text>{props.children}</Text>
    </Wrapper>
  );
};

export default StickyNotification;
