import React, { useContext } from "react";

import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Paragraph from "../components/paragraph";

import UserContext from "../context/UserContext";
import useUserData from "../utils/customHooks/useUserData";

export default () => {
  const user = useContext(UserContext).user;
  // TODO use this to add auth conditionals
  const email = user ? user.email : null;

  const sequences = useUserData("/sequence/all", { email });

  return (
    <Layout>
      <Back to="home"></Back>
      <Heading level={1}>My Sequences</Heading>

      <Paragraph>here are my sequences</Paragraph>
    </Layout>
  );
};
