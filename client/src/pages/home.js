import React, { useContext } from "react";

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

  // console.log("i")

  console.log("id is ", id);

  const parameters = id ? { _id: id } : null;
  const { response, loading, error } = useUserData("/sequence", parameters);

  const placeholder = {
    title: "",
    actions: [
      { title: "", duration: 30 },
      { title: "", duration: 30 },
      { title: "", duration: 30 }
    ]
  };

  console.log(placeholder.title);

  return (
    <Layout authenticated={email}>
      {!id && (
        <Sequence
          authenticated={email}
          title={placeholder.title}
          actions={placeholder.actions}
        />
      )}
      {id && loading && <Spinner />}
      {id && response && (
        <Sequence
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
