import React from "react";
import styled from "styled-components";

import Button from "../components/button";
import Link from "../components/link";

import { colors } from "../utils/styles";

import ChevronLeftIcon from "./icons/chevron-left";

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  padding-left: 0;
`;

const PositionedIcon = styled(ChevronLeftIcon)`
  position: relative;
  left: -0.5rem;
`;

const Back = props => {
  const to = props.to;
  // Send user to specific location
  if (to) {
    return (
      <CustomLink to={`/${to}/`}>
        {" "}
        <ChevronLeftIcon color={colors.darkest} />
        Back to {to}
      </CustomLink>
    );
  }

  const handleClick = event => {
    event.preventDefault();
    if (typeof window === "undefined") {
      return;
    }
    window.history.back();
  };

  return (
    <StyledButton reverse onClick={handleClick}>
      <PositionedIcon />
      Back
    </StyledButton>
  );
};

export default Back;
