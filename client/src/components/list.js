import React from "react";
import styled from "styled-components";

const ListTag = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  /* color: orange; */
`;

const List = props => <ListTag {...props}>{props.children}</ListTag>;

export default List;
