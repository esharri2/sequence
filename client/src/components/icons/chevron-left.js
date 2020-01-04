import React from "react";

import ChevronLeftIcon from "../../images/icons/chevron-left.svg";
import Icon from "../icon";

const ChevronLeft = props => {
  return (
    <Icon {...props}>
      <ChevronLeftIcon />
    </Icon>
  );
};

export default ChevronLeft;
