import React, { useContext } from "react";

import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Link from "../components/link";
import List from "../components/list";
import ListItem from "../components/list-item";

import UserContext from "../context/UserContext";
import useUserData from "../utils/customHooks/useUserData";

export default () => {
  const user = useContext(UserContext).user;
  // TODO use this to add auth conditionals
  const email = user ? user.email : null;

  const { response, loading, error } = useUserData("/sequence/all", {
    email
  });

  const sequences = response ? response.sequences : null;

  return (
    <Layout>
      <Back to="home"></Back>
      <Heading level={1}>My Sequences</Heading>
      <List>
        {sequences &&
          sequences.map(item => {
            console.log(item);
            return (
              <ListItem>
                <Link to="/home/" state={{ id: item._id }}>
                  {item.title}
                </Link>
              </ListItem>
            );
          })}
      </List>
    </Layout>
  );
};
