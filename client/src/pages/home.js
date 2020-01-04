import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Button from "../components/button";
import Heading from "../components/heading";
import Layout from "../components/layout";

import speech from "../utils/speech";
import { getHomes } from "../utils/api";

const Action = styled.div`
  background-color: green;
`;

const PlayingAction = styled(Action)`
  background-color: cyan;
`;

const Home = () => {
  const [hasChanged, setHasChanged] = useState(false);

  const [title, setTitle] = useState("my cool sequence");
  const handleTitleChange = event => {
    setHasChanged(true);
    setTitle(event.target.value);
  };

  const [actions, setActions] = useState([
    { title: "hi", duration: 4 },
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
    const duration = current !== undefined ? actions[current].duration : null;
    if (elapsedOncurrent === duration + 1) {
      const newcurrent = current + 1;
      clearInterval(timerRef.current);
      setCurrent(newcurrent);
    }
  }, [elapsedOncurrent]);

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
    console.log("pause efect!");
    console.log(paused);
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
      console.log();
    }, 1000);
    timerRef.current = timerId;
  };

  // CONTROLS
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

  const handleActionChange = event => {
    const { name, value } = event.target;
    const index = event.target.closest("[data-index]").dataset.index;
    const actionsClone = [...actions];
    if (name === "title") {
      actionsClone[index].title = value;
    }
    if (name === "minutes") {
      // do this
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
        <input
          type="text"
          name="title"
          placeholder="seq title"
          value={title}
          onChange={handleTitleChange}
        />
        <div>
          {playing && !paused ? (
            <button onClick={handlePause}>Pause</button>
          ) : (
            <button onClick={handlePlay}>Play</button>
          )}
          <button disabled={!playing} onClick={handleStop}>
            Stop
          </button>
          <button disabled={!hasChanged}>Save</button>
        </div>
        <div>
          {actions.map((action, index) => {
            const minutes = Math.floor(action.duration / 60);
            const seconds = action.duration % 60;
            const inputs = (
              <>
                <div>{index + 1}</div>
                <input
                  onChange={handleActionChange}
                  type="text"
                  name="title"
                  value={action.title}
                  placeholder="action title"></input>
                <input
                  onChange={handleActionChange}
                  name="minutes"
                  type="number"
                  value={minutes}
                  placeholder="M"></input>
                <input
                  onChange={handleActionChange}
                  type="number"
                  name="seconds"
                  value={seconds}
                  placeholder="S"></input>
              </>
            );

            return index === current ? (
              <PlayingAction>{inputs}</PlayingAction>
            ) : (
              <Action>{inputs}</Action>
            );
          })}
        </div>
      </form>
    </Layout>
  );
};

export default Home;
