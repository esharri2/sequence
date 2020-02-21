import React from "react";
import styled, { keyframes } from "styled-components";

import { colors } from "../utils/styles";

// todo import keyframes

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Ring = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: solid 2px ${colors.black};
  border-top: solid 2px ${colors.lavender};
  animation: ${rotate} 1s linear infinite;
`;

const Spinner = () => <Ring />;

export default Spinner;
