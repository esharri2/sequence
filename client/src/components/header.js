import React from "react";
import styled from "styled-components";

import Gear from "./icons/gear";
import Info from "./icons/info";
import Link from "./link";
import LogOutButton from "./log-out";

import { breakpoints, colors, dimensions, spacing } from "../utils/styles";

const HeaderWrapper = styled.div`
  width: 100%;
  background-color: ${colors.lavender};
  color: ${colors.black};
`;

const HeaderTag = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${dimensions.headerHeight};
  padding: 0 ${spacing.lg};
  @media screen and (max-width: ${breakpoints.sm}) {
    padding: 0 ${spacing.xs};
  }
`;

const LogoLink = styled(Link)`
  text-transform: lowercase;
  font-size: 2rem;
  padding-bottom: ${spacing.xs};

  &:hover {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;

  *:not(:last-child) {
    margin-right: ${spacing.md};
  }

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 0.8rem;
  }
`;

const NavLink = styled(Link)`
  text-transform: uppercase;

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${colors.plumppurple};
  }
`;

const SignupNavLink = styled(NavLink)`
  color: ${colors.plumppurple};
`;

const Header = props => {
  const links = props.authenticated ? (
    <Nav>
      <NavLink aria-label="Settings" to="/settings/">
        <Gear />
      </NavLink>
      <NavLink aria-label="About" to="/about/">
        <Info />
      </NavLink>
      <LogOutButton />
    </Nav>
  ) : (
    <Nav>
      <NavLink title="About" to="/about/">
        <Info />
      </NavLink>
      <span> </span>
      <SignupNavLink to="/signup/">Sign up</SignupNavLink>
    </Nav>
  );

  return (
    <HeaderWrapper>
      <HeaderTag>
        <LogoLink to="/home">Vois</LogoLink>
        {!props.hideNav && links}
      </HeaderTag>
    </HeaderWrapper>
  );
};

export default Header;
