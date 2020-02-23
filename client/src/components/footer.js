import React from "react";
import styled from "styled-components";

import Link from "./link";

import { colors, dimensions, spacing } from "../utils/styles";

const FooterWrapper = styled.footer`
  height: ${dimensions.footerHeight};
  background-color: ${colors.lavender};
  color: ${colors.black};
  display: flex;
  padding: ${spacing.xs};
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const FooterLinksSection = styled.div`
  display: flex;
  align-items: center;

  a {
    color: ${colors.lightest};
    padding-left: ${spacing.md};
  }
`;

const Copyright = styled.span`
  color: ${colors.lightest};
  margin-top: ${spacing.sm};
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLinksSection>
        <Link to="/contact/">Contact</Link>
        <Link to="/about/">About</Link>
        <Link to="/terms/">Terms of Service</Link>
      </FooterLinksSection>
      <FooterLinksSection>
        <Copyright>Ⓒ {new Date().getFullYear()}</Copyright>
      </FooterLinksSection>
    </FooterWrapper>
  );
};

export default Footer;
