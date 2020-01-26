import React from "react";
import styled from "styled-components";

import Button from "./button";
import ChevronUp from "./icons/chevron-up";

import { spacing } from "../utils/styles";

const ButtonText = styled.span`
  margin-left: ${spacing.xs};
`;

const BackToTop = () => {
  const scrollToTop = event => {
    event.preventDefault();
    window.scrollTo(0, 0);
  };
  return (
    <Button onClick={scrollToTop}>
      <ChevronUp />
      <ButtonText></ButtonText>
      Back to top
    </Button>
  );
};

export default BackToTop;
