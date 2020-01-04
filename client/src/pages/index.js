import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import Link from "../components/link";
import Logo from "../components/logo";

import {
  border,
  breakpoints,
  colors,
  fonts,
  spacing,
  transitions,
  zIndexes
} from "../utils/styles";

const SplashWrapper = styled.div`
  overflow: hidden;
  color: ${colors.black};
`;

const SplashImgWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;

  img {
    object-fit: cover;
    object-position: center bottom;
    width: 100%;
    height: 100%;
  }
`;

const Main = styled.main`
  z-index: ${zIndexes.middle};
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: ${breakpoints.md}) {
    padding-left: ${spacing.xl};
    align-items: flex-start;
  }
`;

const TagLine = styled.p`
  margin: ${spacing.lg} 0 ${spacing.xl} 0;
  font-size: 1rem;
  text-align: center;
  @media screen and (min-width: ${breakpoints.md}) {
    text-align: left;
    font-size: 1.2rem;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 240px;
  margin-bottom: ${spacing.lg};
  a {
    flex-grow: 0;
    flex-basis: calc(120px - ${spacing.sm});
    text-decoration: none !important;
  }
`;

const HomeButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  border: ${colors.black} ${border.style} ${border.size};
  background-color: transparent;
  font-family: ${fonts.body};
  text-transform: uppercase;
  font-size: 1rem;
  transition: background-color ${transitions.fast};
  text-decoration: none;
  width: 100%;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${colors.black};
    color: ${colors.lavender};
  }
`;

const SignUpButton = styled(HomeButton)`
  background-color: ${colors.black};
  color: ${colors.lavender};

  &:hover,
  &:focus {
    background-color: ${colors.shark};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

export default ({ data }) => {
  const srcSet = data.file.childImageSharp.fluid.srcSet;
  return (
    <SplashWrapper>
      <Main>
        <Logo />
        <TagLine>A talking timer for yoga and exercise.</TagLine>
        <LinkWrapper>
          <Link buttonColor="transparent" to="/signup/">
            <SignUpButton tabIndex="-1">Sign up</SignUpButton>
          </Link>
          <Link to="/login/">
            <HomeButton tabIndex="-1">Login</HomeButton>
          </Link>
        </LinkWrapper>
        <StyledLink to="/home/">Try it out.</StyledLink>
      </Main>
      <SplashImgWrapper>
        <img srcSet={srcSet} sizes="100vw" alt="" />
      </SplashImgWrapper>
    </SplashWrapper>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "yoga_xl.jpg" }) {
      childImageSharp {
        # Specify a fluid image and fragment
        # The default maxWidth is 800 pixels
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
