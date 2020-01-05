import React from "react";

import Play from "../../images/icons/media-play.svg";
import Icon from "../icon";

const PlayIcon = props => {
  return (
    <Icon dark={props.dark} color={props.color}>
      <Play />
    </Icon>
  );
};

export default PlayIcon;
