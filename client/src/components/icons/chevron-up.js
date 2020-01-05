import React from "react";

import ChevronUpIcon from "../../images/icons/chevron-up.svg";
import Icon from "../icon";

const ChevronUp = props => {
  return (
    <Icon {...props}>
      <ChevronUpIcon />
    </Icon>
  );
};

export default ChevronUp;
