import React from "react";
import styled from "styled-components";

import Add from "../components/icons/add";
import Button from "./button";

import { spacing } from "../utils/styles";

const ButtonText = styled.span`
  margin-left: ${spacing.xs};
`;

const AddAction = ({ actions, playing, setActions }) => {
  const handleAdd = event => {
    event.preventDefault();
    setActions([
      ...actions,
      { title: "", duration: 30, _id: actions.length + 1 }
    ]);
  };
  return (
    <Button disabled={playing} reverse onClick={handleAdd}>
      <Add />
      <ButtonText>Add an action</ButtonText>
    </Button>
  );
};

export default AddAction;
