import React from "react";

import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Paragraph from "../components/paragraph";

export default () => (
  <Layout>
    <Back to="home"></Back>
    <Heading level={1}>My Sequences</Heading>
    <Paragraph>here are my sequences</Paragraph>
  </Layout>
);
