import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import NoSleep from "nosleep.js";

import AddAction from "../components/add-action";
import Button from "../components/button";
import Pause from "../components/icons/pause";
import Play from "../components/icons/play";
import Spinner from "../components/spinner";
import Stop from "../components/icons/stop";
import Upload from "../components/icons/upload";

import { breakpoints, colors, spacing, transitions } from "../utils/styles";
import { postData } from "../utils/http";

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
        justify-content: flex-end;
      }
    }
  }
`;

const ButtonText = styled.span`
  margin-left: ${spacing.xs};
`;

const changeBackgroundColor = keyframes`

    to{
      background-color: ${colors.brightlavender};
    }
`;

const SaveButton = styled(Button)`
  &:not(:disabled) {
    animation: ${changeBackgroundColor} ${transitions.slow} linear alternate
      infinite;
  }
`;

const Controls = props => {
  const {
    actions,
    authenticated,
    hasChanged,
    paused,
    playAction,
    playing,
    sequenceId,
    setActions,
    setHasChanged,
    setPaused,
    setPlaying,
    setSequenceId,
    title
  } = props;

  const [loading, setLoading] = useState(false);
  const noSleep = useRef(new NoSleep());

  const handlePlay = event => {
    event.preventDefault();
    noSleep.current.enable();

    if (playing) {
      setPaused(false);
      playAction();
    } else {
      // HACK: Trigger a sound once on action to allow timer to trigger sound subsequently.
      speechSynthesis.speak(new SpeechSynthesisUtterance("start"));
      setPlaying(true);
    }
  };

  const handlePause = event => {
    event.preventDefault();
    noSleep.current.disable();
    setPaused(true);
  };

  const handleStop = event => {
    event.preventDefault();
    noSleep.current.disable();
    setPlaying(false);
  };

  const handleSave = async event => {
    event.preventDefault();
    setLoading(true);
    const response = await postData("/sequence", {
      _id: sequenceId,
      title,
      actions
    });
    if (response.error) {
      alert(
        "Woops! There was a problem saving your sequence. Try closing the site and logging in again."
      );
      setLoading(false);
    } else {
      setSequenceId(response._id);
      setHasChanged(false);
      setLoading(false);
    }
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
      {authenticated && (
        <SaveButton onClick={handleSave} disabled={!hasChanged || playing}>
          {loading ? (
            <Spinner />
          ) : (
            <ButtonText>
              <Upload dark />
              <ButtonText>Save</ButtonText>
            </ButtonText>
          )}
        </SaveButton>
      )}
      <AddAction actions={actions} setActions={setActions} playing={playing} />
    </ButtonBar>
  );
};

export default Controls;
