import React from "react";
import styled from "styled-components";

import FormField from "../components/form-field";

import { colors, spacing } from "../utils/styles";

const TimeInput = styled(FormField)`
  margin: 0;
  display: flex;
  input {
    text-align: right;
  }
  label {
    color: ${colors.oslogray};
    display: flex;
    align-items: flex-end;
    margin-bottom: ${spacing.xs};
    padding-right: ${spacing.xs};
  }
`;

const MinutesInput = styled(TimeInput)`
  grid-area: minutes;
`;

const SecondsInput = styled(TimeInput)`
  grid-area: seconds;
`;

const TimeInputs = props => {
  const { duration, handleActionChange } = props;

  // Quotes are added to these to prevent leading zeros.
  // See: github.com/facebook/react/issues/9402#issuecomment-447891987
  const minutes = Math.floor(duration / 60) + "";
  const seconds = (duration % 60) + "";

  return (
    <>
      <MinutesInput
        onChange={handleActionChange}
        name="minutes"
        type="number"
        value={minutes}
        placeholder="M"
        min="0"
        label="m"
      />
      <SecondsInput
        onChange={handleActionChange}
        type="number"
        name="seconds"
        value={seconds}
        placeholder="S"
        min="0"
        label="s"
      />
    </>
  );
};

export default TimeInputs;
