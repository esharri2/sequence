import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import NoSleep from "nosleep.js";

import Add from "./icons/add";
import AddAction from "./add-action";
import BackToTop from "./back-to-top";
import Button from "./button";
import Controls from "./controls";
import Copy from "./icons/copy";
import Close from "./icons/close";
import DesktopOnly from "./desktop-only";
import FadeIn from "./animators/fade-in";
import Input from "./input";
import List from "./icons/list";
import LinkButton from "./link-button";
import MobileOnly from "./mobile-only";
import MoveButtons from "./move-buttons";
import SlideInX from "./animators/slide-in-x";
import TimeInputs from "./time-inputs";

import speech from "../utils/speech";
import {
  animations,
  border,
  breakpoints,
  colors,
  shadows,
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
  font-size: 1.5rem;
  border-radius: ${border.radius} ${border.radius} 0 0;
  @media screen and (max-width: ${breakpoints.md}) {
    margin-top: ${spacing.lg};
    font-size: 1.3rem;
  }
`;

const Actions = styled.div`
  margin-bottom: ${spacing.xl};
`;

const Action = styled.div`
  display: grid;
  grid-gap: ${spacing.xs};
  grid-template-areas: "number title minutes seconds copy up down remove";
  grid-template-columns: 0.5fr 10fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-radius: ${border.radius};
  transition: box-shadow 0.5s ease-in-out;

  input {
    border-radius: ${border.radius} ${border.radius} 0 0;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    grid-template-areas:
      "title title title title minutes seconds"
      "number .... copy up down remove";
    grid-gap: 0 ${spacing.xs};

    grid-template-rows: 1fr 1fr;
    grid-template-columns: 0.5fr repeat(5, 1fr);
    box-shadow: ${shadows.sm};
    padding: ${spacing.xs};
    margin-bottom: ${spacing.xs};

    &:first-child {
      margin-top: ${spacing.xs};
    }
  }

  /* @media screen and (max-width: ${breakpoints.sm}) {
    grid-gap: 0 ${spacing.xs};
  } */

  ${props =>
    props.isPlaying &&
    css`
    box-shadow: ${shadows.md} !important;
    color: ${colors.brightlavender};
    div:first-child > span {
    background-color: ${colors.brightlavender};
    border-color: ${colors.brightlavender};
    color: ${colors.black};`}
`;

const ActionNumber = styled.div`
  display: flex;
  align-items: center;
  grid-area: number;
  padding-left: ${spacing.xs};
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
`;

const Sequence = ({
  id,
  authenticated,
  title: initialTitle,
  actions: initialActions
}) => {
  const [sequenceId, setSequenceId] = useState(id);
  const [hasChanged, setHasChanged] = useState(false);
  const noSleep = useRef(typeof window !== "undefined" && new NoSleep());

  const [title, setTitle] = useState(initialTitle);
  const handleTitleChange = event => {
    setHasChanged(true);
    setTitle(event.target.value);
  };

  const [actions, setActions] = useState(initialActions);

  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) {
      noSleep.current.enable();
      setCurrent(0);
    } else {
      noSleep.current.disable();
      setCurrent(undefined);
      setPaused(false);
      setElapsedOnCurrent(0);
      clearInterval(timerRef.current);
    }
  }, [playing]);

  const [current, setCurrent] = useState(undefined);
  useEffect(() => {
    if (playing && actions[current]) {
      setElapsedOnCurrent(0);
      playAction(actions[current].title);
    }

    if (playing && current && !actions[current]) {
      speech("Your sequence is over.");
      setPlaying(false);
      setCurrent(undefined);
      setElapsedOnCurrent(0);
    }
  }, [actions, current, playing]);

  const currentActionRef = useRef(null);

  const [elapsedOnCurrent, setElapsedOnCurrent] = useState(0);
  useEffect(() => {
    if (playing) {
      const duration = current !== undefined ? actions[current].duration : null;
      if (elapsedOnCurrent === duration) {
        const newcurrent = current + 1;
        clearInterval(timerRef.current);
        setCurrent(newcurrent);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [actions, elapsedOnCurrent, playing]);

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current);
    } else {
      noSleep.current.enable();
    }
  }, [paused]);

  const timerRef = useRef();

  const playAction = title => {
    if (currentActionRef.current) {
      currentActionRef.current.scrollIntoView(true);
    }
    if (title) {
      speech(title);
    }
    const timerId = setInterval(() => {
      setElapsedOnCurrent(prev => prev + 1);
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
    setHasChanged(true);
    setActions(actionsClone);
  };

  const handleCopy = event => {
    event.preventDefault();
    const index = getIndex(event);
    const actionsClone = [...actions];
    const newAction = { ...actions[index] };
    const placeholderId = newAction.placeholderId;
    // Modify placeholder id to prevent duplicate keys
    if (placeholderId) {
      newAction.placeholderId = placeholderId + new Date().getTime();
    }
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
    setHasChanged(true);
  };

  return (
    <form>
      <HeaderLinks>
        <LinkButton reverse to="/home/" state={{ id: null }}>
          <Add />
          <ButtonText>
            Create new <DesktopOnly>sequence</DesktopOnly>
          </ButtonText>
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
      {/* <div>Elapsed: {elapsedOnCurrent}</div>
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
        {actions.map((action, index) => {
          const isPlaying = index === current;
          const ref = isPlaying ? { ref: currentActionRef } : null;
          return (
            <FadeIn key={action._id || action.placeholderId}>
              <Action data-index={index} isPlaying={isPlaying} {...ref}>
                <ActionNumber>
                  <span>{index + 1}</span>
                </ActionNumber>
                <ActionTitleInput
                  onChange={handleActionChange}
                  type="text"
                  name="title"
                  value={action.title}
                  placeholder="Action title"
                  disabled={playing}
                />
                <TimeInputs
                  id={index + (action._id || action.placeholderId)}
                  handleActionChange={handleActionChange}
                  duration={action.duration}
                  isPlaying={isPlaying}
                  elapsedOnCurrent={elapsedOnCurrent}
                  playing={playing}
                />
                <CopyButton
                  aria-label="Copy this action"
                  title="copy"
                  disabled={playing}
                  reverse
                  onClick={handleCopy}>
                  <Copy />
                </CopyButton>
                <MoveButtons
                  disabled={playing}
                  actions={actions}
                  index={index}
                  getIndex={getIndex}
                  setActions={setActions}
                />
                <RemoveButton
                  disabled={playing}
                  title="Remove"
                  aria-label="Remove action from sequence"
                  reverse
                  onClick={handleDelete}>
                  <Close />
                </RemoveButton>
              </Action>
            </FadeIn>
          );
        })}
      </Actions>
      {actions.length > 12 && (
        <DesktopOnly>
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
        </DesktopOnly>
      )}
      <MobileOnly>
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
      </MobileOnly>
    </form>
  );
};

export default Sequence;
