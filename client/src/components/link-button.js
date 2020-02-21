import React from "react";
import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import Button from "./button";

const Link = styled(GatsbyLink)`
  text-decoration: none;
`;

const LinkButton = props => {
  return (
    <Link to={props.to}>
      <Button tabIndex="0" reverse={props.reverse}>
        {props.children}
      </Button>
    </Link>
  );
};

export default LinkButton;
