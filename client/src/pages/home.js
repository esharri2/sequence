import React, { useContext, useRef } from "react";

import Heading from "../components/heading";
import Layout from "../components/layout";
import Sequence from "../components/sequence";
import Spinner from "../components/spinner";

import UserContext from "../context/UserContext";
import useUserData from "../utils/customHooks/useUserData";

const Home = ({ location = {} }) => {
  const user = useContext(UserContext).user;
  const email = user ? user.email : null;

  const id = location.state ? location.state.id : null;

  // Use for Sequence key when there is no id.
  // This ensures\ a fresh component when use hits "Create new."
  const key = useRef(1);
  key.current++;

  const parameters = id ? { _id: id } : null;
  const { response, loading, error } = useUserData("/sequence", parameters);

  const placeholder = {
    title: "",
    actions: [
      { title: "", duration: 30, _id: "1" },
      { title: "", duration: 30, _id: "2" },
      { title: "", duration: 30, _id: "3" }
    ]
  };

  return (
    <Layout authenticated={email}>
      {!id && (
        <Sequence
          key={key.current}
          authenticated={email}
          title={placeholder.title}
          actions={placeholder.actions}
        />
      )}
      {id && loading && <Spinner />}
      {id && response && (
        <Sequence
          key={id}
          authenticated={email}
          id={id}
          title={response.title}
          actions={response.actions}
        />
      )}
      {error && <p>ERROR ! {error}</p>}
    </Layout>
  );
};

export default Home;
