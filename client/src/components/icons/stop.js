import React from "react";

import Stop from "../../images/icons/media-stop.svg";
import Icon from "../icon";

const StopIcon = props => {
  return (
    <Icon dark={props.dark} color={props.color}>
      <Stop />
    </Icon>
  );
};

export default StopIcon;
