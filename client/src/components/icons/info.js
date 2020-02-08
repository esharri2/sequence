import React from "react";

import Info from "../../images/icons/information.svg";
import Icon from "../icon";

const InfoIcon = props => {
  return (
    <Icon dark={props.dark} color={props.color}>
      <Info />
    </Icon>
  );
};

export default InfoIcon;
