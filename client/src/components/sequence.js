import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Add from "./icons/add";
import AddAction from "./add-action";
import BackToTop from "./back-to-top";
import Button from "./button";
import Controls from "./controls";
import Copy from "./icons/copy";
import Close from "./icons/close";
import DesktopOnly from "./desktop-only";
import Input from "./input";
import List from "./icons/list";
import LinkButton from "./link-button";
import MoveButtons from "./move-buttons";
import SlideInX from "./slide-in-x";
import TimeInputs from "./time-inputs";

import speech from "../utils/speech";
import {
  animations,
  border,
  breakpoints,
  colors,
  spacing,
  transitions
} from "../utils/styles";

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
  grid-template-areas: "number title minutes seconds copy up down remove";
  grid-template-columns: 1fr 8fr 1fr 1fr 1fr 1fr 1fr 1fr;
  animation: ${transitions.slow} ${animations.fadeIn}
    ${animations.defaultTimingFunction};

  @media screen and (max-width: ${breakpoints.md}) {
    grid-template-areas:
      "number title title title title title"
      ".... .... minutes minutes seconds seconds"
      ".... .... copy up down remove";
    grid-gap: 0 ${spacing["3xs"]};
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 0.5fr repeat(5, 1fr);
    border-radius: ${border.radius};
    border: ${border.style} ${border.size} ${colors.lavender};
    padding: ${spacing.xs};
    margin-bottom: ${spacing.xs};

    &:first-child {
      margin-top: ${spacing.xs};
    }
  }

  ${props =>
    props.isPlaying &&
    `
    border-color: ${colors.brightlavender}!important;
    div:first-child > span {
    background-color: ${colors.brightlavender};
    border-color: ${colors.brightlavender};
    color: ${colors.black};`}
`;

const ActionNumber = styled.div`
  display: flex;
  align-items: center;
  grid-area: number;
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

const CopyButton = styled(Button)`
  grid-area: copy;
`;

const RemoveButton = styled(Button)`
  grid-area: remove;
`;

const BottomButtons = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: lime; */
`;

const Sequence = ({
  id,
  authenticated,
  title: initialTitle,
  actions: initialActions
}) => {
  const [sequenceId, setSequenceId] = useState(id);
  const [hasChanged, setHasChanged] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const handleTitleChange = event => {
    setHasChanged(true);
    setTitle(event.target.value);
  };

  const [actions, setActions] = useState(initialActions);

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

  const [current, setCurrent] = useState(undefined);
  useEffect(() => {
    if (playing && actions[current]) {
      setElapsedOncurrent(0);
      playAction(actions[current].title);
    }

    if (playing && current && !actions[current]) {
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

  const handleCopy = event => {
    event.preventDefault();
    const index = getIndex(event);
    const actionsClone = [...actions];
    const newAction = { ...actions[index] };
    actionsClone.splice(index, 0, newAction);
    setActions(actionsClone);
  };

  const handleActionChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const index = getIndex(event);
    const actionsClone = [...actions];
    if (name === "title") {
      actionsClone[index].title = value;
    } else {
      const prevDuration = actionsClone[index].duration;
      const prevSeconds = prevDuration % 60;
      const prevMinutes = Math.floor(prevDuration / 60);

      if (name === "minutes") {
        actionsClone[index].duration = Number(value) * 60 + prevSeconds;
      }

      if (name === "seconds") {
        actionsClone[index].duration = Number(value) + prevMinutes * 60;
      }
    }
    setActions(actionsClone);
  };

  return (
    <form>
      <HeaderLinks>
        <LinkButton reverse to="/home/" state={{ id: null }}>
          <Add />
          <ButtonText>Create new</ButtonText>
        </LinkButton>
        {authenticated && (
          <LinkButton reverse to="/my-sequences/">
            <List />
            <ButtonText>
              Saved <DesktopOnly>sequences</DesktopOnly>
            </ButtonText>
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
          <Action
            key={action._id}
            data-index={index}
            isPlaying={index === current}>
            {/* <DragHandle>move handle</DragHandle> */}
            <ActionNumber>
              <span>{index + 1}</span>
            </ActionNumber>
            <ActionTitleInput
              onChange={handleActionChange}
              type="text"
              name="title"
              value={action.title}
              placeholder="Action title"
            />
            <TimeInputs
              id={index + action._id}
              handleActionChange={handleActionChange}
              duration={action.duration}
            />
            <CopyButton disabled={playing} reverse onClick={handleCopy}>
              <Copy />
            </CopyButton>
            <MoveButtons
              disabled={playing}
              actions={actions}
              index={index}
              getIndex={getIndex}
              setActions={setActions}
            />
            <RemoveButton disabled={playing} reverse onClick={handleDelete}>
              <Close />
            </RemoveButton>
          </Action>
        ))}
      </Actions>
      {actions.length > 12 && (
        <BottomButtons>
          <SlideInX from="left">
            <AddAction
              actions={actions}
              setActions={setActions}
              playing={playing}
            />
          </SlideInX>
          <SlideInX from="right">
            <BackToTop />
          </SlideInX>
        </BottomButtons>
      )}
    </form>
  );
};

export default Sequence;
