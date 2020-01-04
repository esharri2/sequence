import React from "react";

import Delete from "../../images/icons/trash.svg";
import Icon from "../icon";

const DeleteIcon = props => {
  return (
    <Icon {...props}>
      <Delete />
    </Icon>
  );
};

export default DeleteIcon;
