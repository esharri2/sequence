import React, { useState } from "react";
import styled from "styled-components";

import Add from "../components/icons/add";
import Button from "../components/button";
import Pause from "../components/icons/pause";
import Play from "../components/icons/play";
import Spinner from "../components/spinner";
import Stop from "../components/icons/stop";
import Upload from "../components/icons/upload";

import { breakpoints, colors, shadows, spacing } from "../utils/styles";
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

const SaveButton = styled(Button)`
  @keyframes animatedGradient {
    0% {
      background-position: 0% 00%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
      /* transform: translateY(-1px); */
      box-shadow: ${shadows.sm};
    }
  }

  &:not(:disabled) {
    background: linear-gradient(
      270deg,
      ${colors.lavender},
      ${colors.brightlavender}
    );
    background-size: 200% 200%;
    animation: animatedGradient 1.5s infinite linear alternate;
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
      {authenticated && !playing && (
        <SaveButton onClick={handleSave} disabled={!hasChanged}>
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
      {!playing && (
        <Button reverse onClick={handleAdd}>
          <Add />
          <ButtonText>Add an action</ButtonText>
        </Button>
      )}
    </ButtonBar>
  );
};

export default Controls;
