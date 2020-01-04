import React from "react";

import CloseIcon from "../../images/icons/cross.svg";
import Icon from "../icon";

const Close = props => {
  return (
    <Icon {...props}>
      <CloseIcon />
    </Icon>
  );
};

export default Close;
