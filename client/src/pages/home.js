import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";

import Add from "../components/icons/add";
import Button from "../components/button";
import ChevronUp from "../components/icons/chevron-up";
import ChevronDown from "../components/icons/chevron-down";
import Close from "../components/icons/close";
import Heading from "../components/heading";
import Input from "../components/input";
import Layout from "../components/layout";
import Pause from "../components/icons/pause";
import Play from "../components/icons/play";
import Stop from "../components/icons/stop";

import speech from "../utils/speech";
import { border, breakpoints, colors, spacing } from "../utils/styles";
import useFetch from "../utils/customHooks/useFetch";

const SequenceTitleInput = styled(Input)`
  /* grid-row: "title"; */
`;

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

const Actions = styled.div`
  margin-bottom: ${spacing.xl};
`;

const Action = styled.div`
  display: grid;
  grid-gap: ${spacing.xs};
  grid-template-areas: "number title title title title title minutes seconds up down delete";
  grid-template-columns: repeat(11, 1fr);
`;

const PlayingAction = styled(Action)`
  div:first-child > span {
    background-color: ${colors.brightlavender};
    border-color: ${colors.brightlavender};
    color: ${colors.black};
  }
`;

const ActionNumber = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
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

const MinutesInput = styled(Input)`
  grid-area: minutes;
`;

const SecondsInput = styled(Input)`
  grid-area: seconds;
`;

const Home = () => {
  const user = useContext(UserContext).user;
  // TODO use this to add auth conditionals
  const email = user ? user.email : null;

  const getData = useFetch(undefined, {}, "GET", false, response => {
    alert("get is done");
  });

  const postData = useFetch(
    undefined,
    { body: JSON.stringify({ _id: id, title, actions }) },
    "POST",
    true,
    response => {
      alert("yay!");
    }
  );

  // TODO default props should be props.location.state or null;
  const [id, setId] = useState(null);
  const [hasChanged, setHasChanged] = useState(!id ? true : false);
  const [title, setTitle] = useState("my cool sequence");
  const handleTitleChange = event => {
    setHasChanged(true);
    setTitle(event.target.value);
  };

  const [actions, setActions] = useState([
    { title: "hi", duration: 5 },
    { title: "yo", duration: 7 },
    { title: "adios", duration: 3 }
  ]);

  // TODO add fetch here, setActions and setTitle

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

  // CONTROLS
  const getIndex = event => {
    return event.target.closest("[data-index]").dataset.index;
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

  const handleAdd = event => {
    event.preventDefault();
    setActions([...actions, { title: "", duration: 30 }]);
  };

  const handleSave = event => {
    event.preventDefault();
    postData.setRoute("/sequence");
  };

  const handleDelete = event => {
    event.preventDefault();
    const index = getIndex(event);
    const actionsClone = [...actions];
    actionsClone.splice(index, 1);
    setActions(actionsClone);
  };

  const handleMove = event => {
    event.preventDefault();
    const index = getIndex(event);
    const direction = event.target.dataset.direction;
    const actionsClone = [...actions];
    const actionToMove = actionsClone.splice(index, 1)[0];
    console.log(actionToMove);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    actionsClone.splice(newIndex, 0, actionToMove);
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
    <Layout>
      <Heading level={1}>Home</Heading>
      <div>Elapsed: {elapsedOncurrent}</div>
      <div>Current Action: {current}</div>
      <form>
        <SequenceTitleInput
          type="text"
          name="title"
          placeholder="seq title"
          value={title}
          onChange={handleTitleChange}
        />
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
        <Actions>
          {actions.map((action, index) => {
            const minutes = Math.floor(action.duration / 60);
            const seconds = action.duration % 60;
            const inputs = (
              <>
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
                <Button reverse onClick={handleDelete}>
                  <Close />
                </Button>
              </>
            );

            return index === current ? (
              <PlayingAction data-index={index}>{inputs}</PlayingAction>
            ) : (
              <Action data-index={index}>{inputs}</Action>
            );
          })}
        </Actions>
      </form>
    </Layout>
  );
};

export default Home;
