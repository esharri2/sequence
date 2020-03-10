import { createGlobalStyle } from "styled-components";
import { colors, fonts } from "../utils/styles";

const GlobalStyle = createGlobalStyle`

  html {
    height: 100%;
    scroll-behavior: smooth;
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
  }
`;

export default GlobalStyle;
