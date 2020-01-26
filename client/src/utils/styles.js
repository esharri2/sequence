import { keyframes } from "styled-components";

export const colors = {
  shark: "#1B1E21",
  black: "#272c30",
  lavender: "#EAE0f3",
  brightlavender: "#A594F9",
  blacklavender: "#1E1B2E",
  white: "#F9F8F8",
  yellow: "#FAA916",
  oslogray: "#939597",
  plumppurple: "#5941A9",
  darkpurple: "#2D232E"
};

export const hexTransparencies = {
  95: "F2",
  90: "E6",
  75: "BF",
  50: "80"
};

export const defaultFontStack = ["Alata", "Helvetica", "sans-serif"].join();

export const fonts = {
  body: defaultFontStack,
  heading: defaultFontStack,
  normal: 400,
  medium: 600,
  heavy: 900,
  lineHeight: 1.5
};

export const dimensions = {
  headerHeight: "60px",
  footerHeight: "120px"
};

export const spacing = {
  "3xs": "2px",
  "2xs": "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px"
};

export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  md: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  lg: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  xl: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
};

export const transitions = {
  fast: "0.2s",
  medium: ".5s,",
  slow: "1s"
};

export const zIndexes = {
  bottom: 1,
  middle: 2,
  top: 3
};

export const breakpoints = {
  lg: "1280px",
  md: "880px",
  sm: "680px",
  xs: "340px"
};

export const border = {
  radius: "4px",
  size: "1px",
  style: "solid"
};

export const animations = {
  defaultTimingFunction: "ease-out",
  fadeIn: keyframes`
    0% {
      opacity: 0;
    }

    100 {
      opacity: 1;
    }
`,
  slideInFromRight: keyframes`
    0% {
      opacity: 0;
      transform: translateX(100px)
    }

    100% {
      opacity: 1
      transform: translateX(0)
    }
`,
  slideInFromLeft: keyframes`
    0% {
      opacity: 0;
      transform: translateX(-100px)
    }

    100% {
      opacity: 1
      transform: translateX(0)
    }
`
};
