import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { graphql, navigate } from "gatsby";

import FadeIn from "../components/animators/fade-in";
import Link from "../components/link";
import SEO from "../components/seo";
import Spinner from "../components/spinner";

import UserContext from "../context/UserContext";
import { clientLogIn, isReturningUser } from "../utils/auth";
import { getData } from "../utils/http";

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
  height: 100vh;
  background-color: ${colors.lavender};
  background-image: linear-gradient(
    170deg,
    ${colors.lavender} 20%,
    ${colors.brightlavender} 99%
  );
`;

const Logo = styled.h1`
  text-transform: lowercase;
  font-size: 5rem;
  margin: 0;
  line-height: 0.8;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 8rem;
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
  height: 95vh;
  padding: 0 ${spacing.xs};
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
  margin: ${spacing.md} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  a {
    width: 100%;
    text-decoration: none !important;
    max-width: 500px;

    &:first-child {
      padding-bottom: ${spacing.md};
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    /* margin-top: 1rem; */
    width: 30vw;
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
  border-radius: ${border.radius};

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

const Inline = styled.span`
  display: flex;
  align-items: center;

  & > *:first-child {
    margin-right: ${spacing.xs};
  }
`;

export default ({ data }) => {
  const { title, description } = data.site.siteMetadata;
  const userContext = useContext(UserContext);

  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    isReturningUser() ? setAuthCheck(true) : setAuthCheck(false);
  }, []);

  useEffect(() => {
    if (authCheck) {
      async function checkAuthentication() {
        try {
          const response = await getData("/auth/check");
          if (!response) {
            setAuthCheck(false);
          } else {
            setTimeout(function() {
              clientLogIn(userContext, response.email);
              navigate("/my-sequences/");
            }, 2000);
          }
        } catch (error) {
          setAuthCheck(false);
        }
      }
      checkAuthentication();
    }
  }, [authCheck]);

  return (
    <SplashWrapper>
      <SEO />
      <FadeIn>
        <Main>
          <HeaderLinks>
            <StyledLink to="/about/">About</StyledLink>
            <StyledLink to="/login/">Log in</StyledLink>
          </HeaderLinks>
          <Logo>{title}</Logo>
          <TagLine>{description}</TagLine>

          <LinkWrapper>
            {authCheck ? (
              <Inline>
                <Spinner />
                <span>Signing in...</span>
              </Inline>
            ) : (
              <>
                <Link to="/home/">
                  <StyledButton tabIndex="-1">Start</StyledButton>
                </Link>
                <Link buttonColor="transparent" to="/signup/">
                  <StyledButton tabIndex="-1">Create an account</StyledButton>
                </Link>
              </>
            )}
          </LinkWrapper>
        </Main>
      </FadeIn>
    </SplashWrapper>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
