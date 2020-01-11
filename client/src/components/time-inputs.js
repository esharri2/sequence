import React from "react";
import styled from "styled-components";

import Input from "../components/input";

const MinutesInput = styled(Input)`
  grid-area: minutes;
`;

const SecondsInput = styled(Input)`
  grid-area: seconds;
`;

const TimeInputs = props => {
  const { duration, handleActionChange } = props;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <>
      <MinutesInput
        onChange={handleActionChange}
        name="minutes"
        type="number"
        value={minutes}
        placeholder="M"
      />
      <SecondsInput
        onChange={handleActionChange}
        type="number"
        name="seconds"
        value={seconds}
        placeholder="S"
      />
    </>
  );
};

export default TimeInputs;
