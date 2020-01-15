import React, { useState } from "react";

import Back from "../components/back";
import Button from "../components/button";
import Delete from "../components/icons/delete";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Link from "../components/link";
import List from "../components/list";
import ListItem from "../components/list-item";
import Spinner from "../components/spinner";

import { deleteData } from "../utils/http";

export default ({ sequences: initialSequences }) => {
  console.log(initialSequences);
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
    <List>
      {sequences.map((sequence, index) => (
        <ListItem>
          <Link to="/home/" state={{ id: sequence._id }}>
            {sequence.title} | duration...
          </Link>
          <Button
            data-index={index}
            data-id={sequence._id}
            onClick={handleDelete}>
            {loading ? <Spinner /> : <Delete />}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};
