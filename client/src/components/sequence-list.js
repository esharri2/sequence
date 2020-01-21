import React, { useState } from "react";
import styled from "styled-components";

import Button from "../components/button";
import Delete from "../components/icons/delete";
import Link from "../components/link";
import List from "../components/list";
import ListItem from "../components/list-item";
import Spinner from "../components/spinner";

import { deleteData } from "../utils/http";
import { breakpoints, colors, spacing } from "../utils/styles";

const GridList = styled(List)`
  display: grid;
  grid-row-gap: ${spacing.lg};
`;

const GridRow = styled(ListItem)`
  display: grid;
  grid-template-columns: 350px 100px 200px;
  border-bottom: 1px solid ${colors.lavender};

  @media screen and (max-width: ${breakpoints.md}) {
    grid-template-columns: 100%;
  }
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: none;
    color: ${colors.brightlavender};
  }
`;

export default ({ sequences: initialSequences }) => {
  const [sequences, setSequences] = useState(initialSequences);
  const [loading, setLoading] = useState(false);

  const handleDelete = async event => {
    console.log(event.target);
    const { id, index } = event.target.dataset;
    setLoading(true);
    const response = await deleteData("/sequence", {
      _id: id
    });
    if (response.error) {
      alert(
        "Woops! There was a problem deleting that sequence. Try closing the site and logging in again."
      );
      setLoading(false);
    } else {
      const sequencesClone = [...sequences];
      sequencesClone.splice(index, 1);
      setLoading(false);
      setSequences(sequencesClone);
    }
  };

  return (
    <GridList>
      {sequences.map((sequence, index) => {
        const { title, actions = [], _id } = sequence;
        const durations = actions.map(action => action.duration);
        const totalTime = durations.reduce((a, b) => a + b, 0);
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        return (
          <GridRow>
            <StyledLink to="/home/" state={{ id: _id }}>
              {title}
            </StyledLink>
            <Duration>
              {minutes}:{seconds}
            </Duration>
            <Button
              reverse
              aria-label={`Delete your sequence titled ${title}`}
              data-index={index}
              data-id={_id}
              onClick={handleDelete}>
              {loading ? <Spinner /> : <Delete />}
            </Button>
          </GridRow>
        );
      })}
    </GridList>
  );
};
