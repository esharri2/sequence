import React from "react";

import Button from "../components/button";
import ChevronUp from "../components/icons/chevron-up";
import ChevronDown from "../components/icons/chevron-down";

const MoveButtons = props => {
  const { actions, getIndex, index, setActions } = props;

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
      <Button
        reverse
        disabled={index === 0}
        data-direction="up"
        onClick={handleMove}>
        <ChevronUp />
      </Button>
      <Button
        reverse
        disabled={index === actions.length - 1}
        data-direction="down"
        onClick={handleMove}>
        <ChevronDown />
      </Button>
    </>
  );
};

export default MoveButtons;
