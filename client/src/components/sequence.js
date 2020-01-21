import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";

import Add from "../components/icons/add";
import Button from "../components/button";
import Controls from "../components/controls";
import Close from "../components/icons/close";
import Input from "../components/input";
import Link from "../components/link";
import List from "../components/icons/list";
import LinkButton from "../components/link-button";
import MoveButtons from "../components/move-buttons";
import TimeInputs from "../components/time-inputs";

import speech from "../utils/speech";
import { border, colors, spacing } from "../utils/styles";

const HeaderLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    border: solid 1px ${colors.lavender};
    &:hover,
    &:focus {
      border-color: ${colors.brightlavender};
    }
  }

  a:nth-child(2) {
    margin-left: ${spacing.sm};
  }
`;

const ButtonText = styled.span`
  margin-left: ${spacing.sm};
`;

const SequenceTitleInput = styled(Input)`
  font-size: 2rem;
`;

const Actions = styled.div`
  margin-bottom: ${spacing.xl};
`;

const Action = styled.div`
  display: grid;
  grid-gap: ${spacing.xs};
  grid-template-areas: "number title title title title title minutes seconds up down delete";
  grid-template-columns: repeat(11, 1fr);
  ${props => {
    if (props.isPlaying) {
      return `div:first-child > span {
    background-color: ${colors.brightlavender};
    border-color: ${colors.brightlavender};
    color: ${colors.black};`;
    }
  }}
`;

const ActionNumber = styled.div`
  display: flex;
  align-items: center;
  span {
    border: ${border.style} ${border.size} ${colors.lavender};
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ActionTitleInput = styled(Input)`
  grid-area: title;
`;

const Sequence = ({
  id,
  authenticated,
  title: initialTitle,
  actions: initialActions
}) => {
  const [sequenceId, setSequenceId] = useState(id);
  // const [hasChanged, setHasChanged] = useState(!sequenceId ? true : false);
  const [hasChanged, setHasChanged] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const handleTitleChange = event => {
    setHasChanged(true);
    setTitle(event.target.value);
  };

  const [actions, setActions] = useState(initialActions);

  const [current, setCurrent] = useState(undefined);
  useEffect(() => {
    if (playing && actions[current]) {
      setElapsedOncurrent(0);
      playAction(actions[current].title);
    }

    if (playing && !actions[current]) {
      speech("Your sequence is over.");
      setPlaying(false);
      setCurrent(undefined);
      setElapsedOncurrent(0);
    }
  }, [current, playing]);

  const [elapsedOncurrent, setElapsedOncurrent] = useState(0);
  useEffect(() => {
    if (playing) {
      const duration = current !== undefined ? actions[current].duration : null;
      if (elapsedOncurrent === duration + 1) {
        const newcurrent = current + 1;
        clearInterval(timerRef.current);
        setCurrent(newcurrent);
      }
    }
  }, [elapsedOncurrent, playing]);

  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) {
      setCurrent(0);
    } else {
      setCurrent(undefined);
      setPaused(false);
      setElapsedOncurrent(0);
      clearInterval(timerRef.current);
    }
  }, [playing]);

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current);
    }
  }, [paused]);

  const timerRef = useRef();

  const playAction = title => {
    if (title) {
      speech(title);
    }
    const timerId = setInterval(() => {
      setElapsedOncurrent(prev => prev + 1);
    }, 1000);
    timerRef.current = timerId;
  };

  const getIndex = event => {
    return event.target.closest("[data-index]").dataset.index;
  };

  const handleDelete = event => {
    event.preventDefault();
    const index = getIndex(event);
    const actionsClone = [...actions];
    actionsClone.splice(index, 1);
    setActions(actionsClone);
  };

  const handleActionChange = event => {
    const { name, value } = event.target;
    const index = getIndex(event);
    const actionsClone = [...actions];
    if (name === "title") {
      actionsClone[index].title = value;
    }
    if (name === "minutes") {
      const seconds = event.target.parentNode.querySelector(
        "input[name='seconds']"
      ).value;
      actionsClone[index].duration = Number(value) * 60 + Number(seconds);
      console.log(actionsClone[index]);
    }
    if (name === "seconds") {
      // do that
    }
    setActions(actionsClone);
  };

  return (
    <form>
      <HeaderLinks>
        <LinkButton reverse to="/home/">
          <Add />
          <ButtonText>Create new</ButtonText>
        </LinkButton>
        {authenticated && (
          <LinkButton reverse to="/my-sequences/">
            <List />
            <ButtonText>Saved sequences</ButtonText>
          </LinkButton>
        )}
      </HeaderLinks>
      {/* <div>Elapsed: {elapsedOncurrent}</div>
      <div>Current Action: {current}</div> */}
      <SequenceTitleInput
        type="text"
        name="title"
        placeholder="Your sequence title"
        value={title}
        onChange={handleTitleChange}
      />
      <Controls
        actions={actions}
        authenticated={authenticated}
        hasChanged={hasChanged}
        paused={paused}
        playAction={playAction}
        playing={playing}
        sequenceId={sequenceId}
        setActions={setActions}
        setHasChanged={setHasChanged}
        setPaused={setPaused}
        setPlaying={setPlaying}
        setSequenceId={setSequenceId}
        title={title}
      />
      <Actions>
        {actions.map((action, index) => (
          <Action key={index} data-index={index} isPlaying={index === current}>
            <ActionNumber>
              <span>{index + 1}</span>
            </ActionNumber>
            <ActionTitleInput
              onChange={handleActionChange}
              type="text"
              name="title"
              value={action.title}
              placeholder="action title"
            />
            <TimeInputs
              handleActionChange={handleActionChange}
              duration={action.duration}
            />
            <MoveButtons
              actions={actions}
              index={index}
              getIndex={getIndex}
              setActions={setActions}
            />
            <Button reverse onClick={handleDelete}>
              <Close />
            </Button>
          </Action>
        ))}
      </Actions>
    </form>
  );
};

export default Sequence;
