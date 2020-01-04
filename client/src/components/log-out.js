import React, { useContext } from "react";
import styled from "styled-components";

import { navigate } from "gatsby";
import ButtonLinkStyle from "./button-link-style";
import ExitIcon from "./icons/exit";
import UserContext from "../context/UserContext";
import { logOut } from "../utils/api";
import { clientLogOut } from "../utils/auth";
import { colors, spacing } from "../utils/styles";

const PaddedExitIcon = styled(ExitIcon)`
  margin-left: ${spacing.xs};
`;

const LogOutButton = () => {
  const userContext = useContext(UserContext);
  const handleClick = () => {
    logOut()
      .then(response => {
        clientLogOut(userContext);
        navigate("/", { replace: true });
      })
      .catch(error => {
        alert("error");
      });
  };
  return (
    <ButtonLinkStyle onClick={handleClick}>
      Log out <PaddedExitIcon color={colors.accent1} />
    </ButtonLinkStyle>
  );
};

export default LogOutButton;
