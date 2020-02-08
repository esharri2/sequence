import React, { useContext } from "react";

import AlertMessage from "../components/alert-message";
import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Link from "../components/link";
import Paragraph from "../components/paragraph";
import SequenceList from "../components/sequence-list";
import Spinner from "../components/spinner";

import UserContext from "../context/UserContext";
import useUserData from "../utils/customHooks/useUserData";

export default () => {
  const user = useContext(UserContext).user;
  const email = user ? user.email : null;

  const parameters = email ? { email } : null;
  const { response, loading, error } = useUserData("/sequence/all", parameters);

  return (
    <Layout mobileSized={true}>
      <Back />
      <Heading level={1}>My Sequences</Heading>
      {loading && <Spinner />}
      {error && (
        <AlertMessage>
          <Paragraph>
            Sorry! Something is not working right.{" "}
            <Link to="/login/"> Try logging in again.</Link>
          </Paragraph>
        </AlertMessage>
      )}
      {response && <SequenceList sequences={response.sequences} />}
    </Layout>
  );
};
