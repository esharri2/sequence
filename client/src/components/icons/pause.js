import React from "react";

import Pause from "../../images/icons/media-pause.svg";
import Icon from "../icon";

const PauseIcon = props => {
  return (
    <Icon dark={props.dark} color={props.color}>
      <Pause />
    </Icon>
  );
};

export default PauseIcon;
