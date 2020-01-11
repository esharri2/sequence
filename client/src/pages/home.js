import React from "react";

import Heading from "../components/heading";
import Layout from "../components/layout";
import Sequence from "../components/sequence";

const Home = () => {
  return (
    <Layout>
      <Heading level={1}>Home</Heading>
      <Sequence />
    </Layout>
  );
};

export default Home;
