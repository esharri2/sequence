import React from "react";
import styled from "styled-components";

import Add from "../components/icons/add";
import Button from "../components/button";
import Pause from "../components/icons/pause";
import Play from "../components/icons/play";
import Stop from "../components/icons/stop";

import { breakpoints, spacing } from "../utils/styles";

const ButtonBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  button {
    flex: 1 1 ${spacing.xs};
    margin: ${spacing.xs} ${spacing.xs} ${spacing.xs} 0;

    &:last-child {
      margin-right: 0;
    }

    @media screen and (max-width: ${breakpoints.md}) {
      &:nth-last-child(2) {
        margin-right: 0;
      }

      &:last-child {
        flex-basis: 100%;
        margin: 0;
      }
    }
  }
`;

const ButtonText = styled.span`
  padding-left: ${spacing.xs};
`;

const Controls = props => {
  const {
    actions,
    hasChanged,
    paused,
    playAction,
    playing,
    setActions,
    setPaused,
    setPlaying
  } = props;

  const handleAdd = event => {
    event.preventDefault();
    setActions([...actions, { title: "", duration: 30 }]);
  };

  const handlePlay = event => {
    event.preventDefault();
    if (playing) {
      setPaused(false);
      playAction();
    } else {
      setPlaying(true);
    }
  };

  const handlePause = event => {
    event.preventDefault();
    setPaused(true);
  };

  const handleStop = event => {
    event.preventDefault();
    setPlaying(false);
  };

  const handleSave = event => {
    event.preventDefault();
    alert("save! figure out post shit.");
    // postData.setRoute("/sequence");
  };

  return (
    <ButtonBar>
      {playing && !paused ? (
        <Button onClick={handlePause}>
          <Pause dark />
          <ButtonText>Pause</ButtonText>
        </Button>
      ) : (
        <Button onClick={handlePlay}>
          <Play dark />
          <ButtonText>Play</ButtonText>
        </Button>
      )}
      <Button disabled={!playing} onClick={handleStop}>
        <Stop dark />
        <ButtonText>Stop</ButtonText>
      </Button>
      <Button onClick={handleSave} disabled={!hasChanged}>
        <ButtonText>Save</ButtonText>
      </Button>
      <Button reverse onClick={handleAdd}>
        <Add />
        <ButtonText>Add an action</ButtonText>
      </Button>
    </ButtonBar>
  );
};

export default Controls;
