import React, { useContext } from "react";

import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import SequenceList from "../components/sequence-list";
import Spinner from "../components/spinner";

import UserContext from "../context/UserContext";
import useUserData from "../utils/customHooks/useUserData";

export default () => {
  const user = useContext(UserContext).user;
  const email = user ? user.email : null;

  const parameters = email ? { email } : null;
  const { response, loading, error } = useUserData("/sequence/all", parameters);

  console.log(response);

  return (
    <Layout>
      <Back />
      <Heading level={1}>My Sequences</Heading>
      {loading && <Spinner />}
      {error && "error"}
      {response && <SequenceList sequences={response.sequences} />}
    </Layout>
  );
};
