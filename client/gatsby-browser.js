import React from "react";
import { UserProvider } from "./src/context/UserContext";
import { createGlobalStyle } from "styled-components";
import { breakpoints, colors, fonts } from "./src/utils/styles";
require("typeface-open-sans");
require("typeface-shrikhand");
require("@openfonts/alata_all");

const GlobalStyle = createGlobalStyle`

  html {
    height: 100%;
    /* overflow-y: scroll; */
  }

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

   body {
    background-color: ${colors.black};
    color: ${colors.lavender};
    font-family: ${fonts.body};
    font-size: 1rem;
    position: relative;
    min-height: 100%;
    *, *:before, *:after {
      box-sizing: inherit;
    }

    /* @media screen and (max-width: ${breakpoints.md}) {
      font-size: .8rem;
    } */
  }
`;

export const wrapRootElement = ({ element }) => (
  <UserProvider>
    <GlobalStyle />
    {element}
  </UserProvider>
);
