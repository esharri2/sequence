import React, { useContext } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import ButtonLinkStyle from "./button-link-style";
import ExitIcon from "./icons/exit";

import UserContext from "../context/UserContext";
import { getData } from "../utils/http";
import { clientLogOut } from "../utils/auth";
import { colors, spacing } from "../utils/styles";

const StyledButtonLinkStyle = styled(ButtonLinkStyle)`
  text-transform: uppercase;
`;

const LogOutButton = () => {
  const userContext = useContext(UserContext);

  const handleClick = async () => {
    const response = await getData("/auth/logout");
    if (response.error) {
      alert(
        "There may have been a problem logging you out, or you're already logged out."
      );
    } else {
      clientLogOut(userContext);
      navigate("/", { replace: true });
    }
  };

  return (
    <StyledButtonLinkStyle onClick={handleClick}>
      Log out
      {/* <PaddedExitIcon color={colors.accent1} /> */}
    </StyledButtonLinkStyle>
  );
};

export default LogOutButton;
