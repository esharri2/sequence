import React from "react";

import Heading from "../components/heading";
import Layout from "../components/layout";
import Sequence from "../components/sequence";
import Spinner from "../components/spinner";

import useUserData from "../utils/customHooks/useUserData";

const Home = ({ location = {} }) => {
  const id = location.state ? location.state.id : null;
  const parameters = id ? { _id: id } : null;
  const { response, loading, error } = useUserData("/sequence", parameters);
  const placeholderData = {
    title: "",
    actions: [
      { title: "", duration: 30 },
      { title: "", duration: 30 },
      { title: "", duration: 30 }
    ]
  };

  return (
    <Layout>
      <Heading level={1}>Home</Heading>
      {!id && (
        <Sequence
          title={placeholderData.title}
          actions={placeholderData.actions}
        />
      )}
      {id && loading && <Spinner />}
      {id && response && (
        <Sequence id={id} title={response.title} actions={response.actions} />
      )}
      {error && <p>there is an error</p>}
    </Layout>
  );
};

export default Home;
