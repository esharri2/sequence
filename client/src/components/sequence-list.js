import React, { useState } from "react";
import styled from "styled-components";

import Add from "../components/icons/add";
import Button from "../components/button";
import Delete from "../components/icons/delete";
import Link from "../components/link";
import LinkButton from "../components/link-button";
import List from "../components/list";
import ListItem from "../components/list-item";
import Spinner from "../components/spinner";

import { deleteData } from "../utils/http";
import { breakpoints, colors, spacing } from "../utils/styles";

const StyledLinkButton = styled(LinkButton)`
  margin-top: 1rem;

  button {
    padding-left: 0;
  }
`;

const ButtonText = styled.span`
  margin-left: ${spacing.sm};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridList = styled(List)`
  display: grid;
  grid-row-gap: ${spacing.lg};
`;

const GridRow = styled(ListItem)`
  display: grid;
  grid-template-columns: 10fr 1fr;

  @media screen and (max-width: ${breakpoints.md}) {
    grid-template-columns: 7fr 1fr;
  }
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  padding-left: ${spacing.sm};
  border-bottom: 1px solid ${colors.lavender};

  &:hover,
  &:focus {
    text-decoration: none;
    background-color: ${colors.plumppurple};
  }
`;

const Title = styled.div`
  width: 75%;
`;

export default ({ sequences: initialSequences }) => {
  const [sequences, setSequences] = useState(initialSequences);
  const [loading, setLoading] = useState(false);

  const handleDelete = async event => {
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
    <Wrapper>
      <GridList>
        {sequences.map((sequence, index) => {
          const { title, actions = [], _id } = sequence;
          const durations = actions.map(action => action.duration);
          const totalTime = durations.reduce((a, b) => a + b, 0);
          const minutes = Math.floor(totalTime / 60);
          const seconds = ("0" + (totalTime % 60)).slice(-2);

          return (
            <GridRow key={_id}>
              <StyledLink to="/home/" state={{ id: _id }}>
                <Title>{title}</Title>
                <Duration>
                  {minutes}:{seconds}
                </Duration>
              </StyledLink>
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
      <StyledLinkButton reverse to="/home/" state={{ id: null }}>
        <Add />
        <ButtonText>Create new sequence</ButtonText>
      </StyledLinkButton>
    </Wrapper>
  );
};
