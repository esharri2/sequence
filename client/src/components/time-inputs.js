import React from "react";
import styled from "styled-components";

import FormField from "../components/form-field";

import { breakpoints, colors, spacing } from "../utils/styles";

const TimeInput = styled(FormField)`
  margin: 0;
  display: flex;

  input {
    text-align: right;
    flex-grow: 1;
    min-width: 0;
  }

  label {
    color: ${colors.oslogray};
    flex-grow: 0;
    display: flex;
    align-items: flex-end;
    margin-bottom: ${spacing.xs};
    /* padding-right: ${spacing.xs}; */
  }
`;

const MinutesInput = styled(TimeInput)`
  grid-area: minutes;
`;

const SecondsInput = styled(TimeInput)`
  grid-area: seconds;
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: ${colors.brightlavender};
  grid-area: seconds;
  font-variant-numeric: tabular-nums;
  @media screen and (max-width: ${breakpoints.md}) {
    justify-content: flex-end;
  }
`;

const PlaceholderDisplay = styled(TimeDisplay)`
  grid-area: minutes;
`;

const TimeInputs = ({
  duration,
  id,
  handleActionChange,
  isPlaying,
  elapsedOnCurrent,
  playing
}) => {
  // Quotes are added to these to prevent leading zeros.
  // See: github.com/facebook/react/issues/9402#issuecomment-447891987

  const handleFocus = event => event.target.select();
  const adjustedDuration = isPlaying ? duration - elapsedOnCurrent : duration;

  const minutes = Math.floor(adjustedDuration / 60) + "";
  // TODO abstract this
  const seconds = ("0" + (adjustedDuration % 60)).slice(-2);

  return (
    <>
      {isPlaying ? (
        <>
          <PlaceholderDisplay />
          <TimeDisplay>
            {minutes}:{seconds}
          </TimeDisplay>
        </>
      ) : (
        <>
          <MinutesInput
            onChange={handleActionChange}
            name="minutes"
            type="number"
            value={minutes}
            placeholder="M"
            min="0"
            label="m"
            id={"m" + id}
            disabled={playing}
            onFocus={handleFocus}
          />
          <SecondsInput
            onChange={handleActionChange}
            type="number"
            name="seconds"
            value={seconds}
            placeholder="S"
            min="0"
            label="s"
            id={"s" + id}
            disabled={playing}
            onFocus={handleFocus}
          />
        </>
      )}
    </>
  );
};

export default TimeInputs;
