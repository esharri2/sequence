import React from "react";
import styled from "styled-components";

import Spinner from "./spinner";

import { breakpoints, colors, zIndexes } from "../utils/styles";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${colors.black};
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${zIndexes.top};
  opacity: 0.9;

  > div {
    height: 60vh;
    width: 60vh;

    @media screen and (max-width: ${breakpoints.md}) {
      height: 60vw;
      width: 60vw;
    }
  }
`;

const SpinnerOverlay = props => (
  <Overlay>
    <Spinner />
  </Overlay>
);

export default SpinnerOverlay;
