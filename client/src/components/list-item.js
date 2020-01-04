import React from "react";
import styled from "styled-components";

const ListItemTag = styled.li`
  /* color: cyan; */
`;

const ListItem = props => (
  <ListItemTag {...props}>{props.children}</ListItemTag>
);

export default ListItem;
