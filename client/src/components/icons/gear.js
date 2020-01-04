import React from "react";

import Gear from "../../images/icons/gear.svg";
import Icon from "../icon";

const GearIcon = props => {
  return (
    <Icon dark={props.dark} color={props.color}>
      <Gear />
    </Icon>
  );
};

export default GearIcon;
