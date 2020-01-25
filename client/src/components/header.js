import React, { useContext } from "react";
import styled from "styled-components";

import Link from "./link";
import LogOutButton from "./log-out";

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
  text-transform: lowercase;
  font-size: 2rem;

  &:hover {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;

  *:not(:last-child) {
    margin-right: ${spacing.md};
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

// const CustomMenuButton = styled(MenuButton)`
//   background-color: transparent;
//   border: none;
//   fill: ${colors.black};
//   cursor: pointer;
//   &:focus {
//     outline-color: ${colors.accent2};
//   }
// `;

// const CustomMenuList = styled(MenuList)`
//   background: ${colors.lavender} !important;
//   color: ${colors.black};
//   box-shadow: ${shadows.small};
//   border-radius: ${border.radius};

//   [data-reach-menu-item] {
//     width: 250px;
//     font-family: ${fonts.body};
//     &:hover,
//     &:focus {
//       * {
//         color: ${colors.lightest};
//         fill: ${colors.lightest};
//       }
//     }
//   }

//   [data-reach-menu-item][data-selected] {
//     background-color: ${colors.accent1};
//     text-decoration: none;
//     color: ${colors.lightest}!important;
//   }
// `;

// const MenuTitle = styled.div`
//   width: 100%;
//   text-align: center;
//   font-size: larger;
//   height: 30px;
// `;

const Header = props => {
  const links = props.authenticated ? (
    <Nav>
      <NavLink to="/my-sequences/">Sequences</NavLink>
      <NavLink to="/settings/">Settings</NavLink>
      <NavLink to="/about/">About</NavLink>
      <LogOutButton />
    </Nav>
  ) : (
    <Nav>
      <NavLink to="/settings/">Settings</NavLink>
      <NavLink to="/about/">About</NavLink>
      <span> | </span>
      <NavLink to="/signup/">Sign up</NavLink>
      <NavLink to="/login/">Log in</NavLink>
    </Nav>
  );

  return (
    <HeaderWrapper>
      <HeaderTag>
        <LogoLink to="/">Vois</LogoLink>
        {!props.hideNav && links}
      </HeaderTag>
    </HeaderWrapper>
  );
};

export default Header;

// <Menu>
//   <CustomMenuButton aria-label="View user settings options">
//     <GearIcon dark={true} />
//   </CustomMenuButton>
//   <CustomMenuList>
//     <MenuTitle>Hi {email}!</MenuTitle>
//     <MenuLink as={Link} to="/my-sequences/">
//       My Sequences
//     </MenuLink>
//     <MenuLink as={Link} to="/settings/">
//       Settings
//     </MenuLink>
//     <MenuLink as={Link} to="/about/">
//       About
//     </MenuLink>
//     <MenuItem onSelect={() => {}}>
//       {email ? <LogOutButton /> : <Link to="/login/">Login</Link>}
//     </MenuItem>
//   </CustomMenuList>
// </Menu>;
