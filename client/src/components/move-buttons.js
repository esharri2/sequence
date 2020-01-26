import React from "react";
import styled from "styled-components";

import Button from "../components/button";
import ChevronUp from "../components/icons/chevron-up";
import ChevronDown from "../components/icons/chevron-down";

const Up = styled(Button)`
  grid-area: up;
`;

const Down = styled(Button)`
  grid-area: down;
`;

const MoveButtons = props => {
  const { actions, disabled, getIndex, index, setActions } = props;

  const handleMove = event => {
    event.preventDefault();
    const index = getIndex(event);
    const direction = event.target.dataset.direction;
    const actionsClone = [...actions];
    const actionToMove = actionsClone.splice(index, 1)[0];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    actionsClone.splice(newIndex, 0, actionToMove);
    setActions(actionsClone);
  };

  return (
    <>
      <Up
        reverse
        disabled={index === 0 || disabled}
        data-direction="up"
        onClick={handleMove}>
        <ChevronUp />
      </Up>
      <Down
        reverse
        disabled={index === actions.length - 1 || disabled}
        data-direction="down"
        onClick={handleMove}>
        <ChevronDown />
      </Down>
    </>
  );
};

export default MoveButtons;
