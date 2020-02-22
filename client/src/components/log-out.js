import React, { useContext } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import Button from "./button";

import UserContext from "../context/UserContext";
import { getData } from "../utils/http";
import { clientLogOut } from "../utils/auth";

const StyledButton = styled(Button)`
  text-transform: uppercase;
`;

const LogOutButton = () => {
  const userContext = useContext(UserContext);

  const handleClick = async () => {
    try {
      await getData("/auth/logout");
      clientLogOut(userContext);
      navigate("/", { replace: true });
    } catch (error) {
      alert(
        "There may have been a problem logging you out, or you're already logged out."
      );
    }
  };

  return <StyledButton onClick={handleClick}>Log out</StyledButton>;
};

export default LogOutButton;
