import React from "react";

import CheckmarkIcon from "../../images/icons/checkmark.svg";
import Icon from "../icon";

const Checkmark = props => {
  return (
    <Icon {...props}>
      <CheckmarkIcon />
    </Icon>
  );
};

export default Checkmark;
