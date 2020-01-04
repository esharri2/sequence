import React, { useContext } from "react";
import styled from "styled-components";

import GearIcon from "./icons/gear";
import Link from "./link";
import LogOutButton from "./log-out";
import Logo from "./logo";
import UserContext from "../context/UserContext";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink
} from "@reach/menu-button";

import "@reach/menu-button/styles.css";

import {
  border,
  breakpoints,
  colors,
  dimensions,
  fonts,
  shadows,
  spacing
} from "../utils/styles";

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
  @media screen and (max-width: ${breakpoints.small}) {
    padding: 0 ${spacing.xs};
  }
`;

const LogoLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const HeaderLogo = styled(Logo)`
  font-size: 2rem;
  /* Hack: Vertically aligns lowercsae logo text */
  padding-bottom: 0.4rem;
`;

const LinksWrapper = styled.div`
  /* background-color: red; */
`;

const CustomMenuButton = styled(MenuButton)`
  background-color: transparent;
  border: none;
  fill: ${colors.black};
  cursor: pointer;
  &:focus {
    outline-color: ${colors.accent2};
  }
`;

const CustomMenuList = styled(MenuList)`
  background: ${colors.lavender} !important;
  color: ${colors.black};
  box-shadow: ${shadows.small};
  border-radius: ${border.radius};

  [data-reach-menu-item] {
    width: 250px;
    font-family: ${fonts.body};
    &:hover,
    &:focus {
      * {
        color: ${colors.lightest};
        fill: ${colors.lightest};
      }
    }
  }

  [data-reach-menu-item][data-selected] {
    background-color: ${colors.accent1};
    text-decoration: none;
    color: ${colors.lightest}!important;
  }
`;

const MenuTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: larger;
  height: 30px;
`;

const Header = props => {
  const user = useContext(UserContext).user;
  const email = user ? user.email : null;
  const homeName = user ? (user.home ? user.home.name : null) : null;

  return (
    <HeaderWrapper>
      <HeaderTag>
        <LogoLink to="/home/">
          <HeaderLogo />
        </LogoLink>
        {!props.hideNav && (
          <LinksWrapper>
            <Menu>
              <CustomMenuButton aria-label="View user settings options">
                <GearIcon dark={true} />
              </CustomMenuButton>
              <CustomMenuList>
                <MenuTitle>Hi {email}!</MenuTitle>
                <MenuLink as={Link} to="/my-sequences/">
                  My Sequences
                </MenuLink>
                <MenuLink as={Link} to="/settings/">
                  Settings
                </MenuLink>
                <MenuLink as={Link} to="/about/">
                  About
                </MenuLink>
                <MenuItem onSelect={() => {}}>
                  {email ? <LogOutButton /> : <Link to="/login/">Login</Link>}
                </MenuItem>
              </CustomMenuList>
            </Menu>
          </LinksWrapper>
        )}
      </HeaderTag>
    </HeaderWrapper>
  );
};

export default Header;
