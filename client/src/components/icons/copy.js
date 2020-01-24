import React from "react";

import Copy from "../../images/icons/copy.svg";
import Icon from "../icon";

const CopyIcon = props => {
  return (
    <Icon dark={props.dark} color={props.color}>
      <Copy />
    </Icon>
  );
};

export default CopyIcon;
