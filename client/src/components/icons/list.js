import React from "react";

import List from "../../images/icons/list.svg";
import Icon from "../icon";

const ListIcon = props => {
  return (
    <Icon dark={props.dark} color={props.color}>
      <List />
    </Icon>
  );
};

export default ListIcon;
