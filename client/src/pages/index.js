import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import Link from "../components/link";
import SEO from "../components/seo";

import {
  animations,
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
  height: 100vh;
  background-color: ${colors.lavender};
  background-image: linear-gradient(
    170deg,
    ${colors.lavender} 20%,
    ${colors.brightlavender} 99%
  );

  animation: ${transitions.medium} ${animations.fadeIn}
    ${animations.defaultTimingFunction};
`;

const SplashImgWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.lavender};
  animation: ${transitions.slow} ${animations.fadeIn}
    ${animations.defaultTimingFunction};
  img {
    object-fit: cover;
    object-position: center bottom;
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

const Logo = styled.h1`
  text-transform: lowercase;
  /* text-shadow: 3px 3px 1px ${colors.brightlavender}; */
  font-size: 5rem;
  margin: 0;
  line-height: 0.8;
  @media screen and (min-width: ${breakpoints.md}) {
    font-size: 8rem;
    margin-top: 8rem;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    margin-top: calc(${spacing.xl} * 2);
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
    /* align-items: flex-start; */
  }
`;

const TagLine = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
  padding: ${spacing.md} 0;
  line-height: 1;
  @media screen and (min-width: ${breakpoints.md}) {
    font-size: 2rem;
  }
`;

const LinkWrapper = styled.div`
  margin-bottom: ${spacing.md};
  a {
    width: 100%;
    text-decoration: none !important;

    &:first-child {
      padding-bottom: ${spacing.md};
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    margin-top: 1rem;
    width: 25vw;
  }
`;

const StyledButton = styled.button`
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

const HeaderLinks = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: ${spacing.md} ${spacing.md} 0 0;
  font-size: 1rem;

  *:first-child {
    padding-right: ${spacing.md};
  }
`;

const StyledLink = styled(Link)`
  text-transform: uppercase;
`;

export default ({ data }) => {
  const srcSet = data.file.childImageSharp.fluid.srcSet;
  const { title, description } = data.site.siteMetadata;
  return (
    <SplashWrapper>
      <SEO />
      <Main>
        <HeaderLinks>
          <StyledLink to="/about/">About</StyledLink>
          <StyledLink to="/login/">Log in</StyledLink>
        </HeaderLinks>
        <Logo>{title}</Logo>
        <TagLine>{description}</TagLine>

        <LinkWrapper>
          <Link to="/home/">
            <StyledButton tabIndex="-1">Start</StyledButton>
          </Link>
          <Link buttonColor="transparent" to="/signup/">
            <StyledButton tabIndex="-1">Create an account</StyledButton>
          </Link>
        </LinkWrapper>
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
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
