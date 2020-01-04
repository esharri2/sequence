import React from "react";
import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import Button from "./button";

const Link = styled(GatsbyLink)`
  text-decoration: none;
`;

const LinkButton = props => (
  <Link {...props}>
    {/* TODO i think tab index needs to come off this Button? */}
    <Button tabIndex="0" buttonColor={props.buttonColor}>
      {props.children}
    </Button>
  </Link>
);

export default LinkButton;
