import React from "react";
import styled from "styled-components";
import AddIcon from "../../images/icons/cross.svg";
import Icon from "../icon";

const CustomAddIcon = styled(AddIcon)`
  transform: rotate(45deg);
`;

const Add = props => {
  return (
    <Icon {...props}>
      <CustomAddIcon />
    </Icon>
  );
};

export default Add;
