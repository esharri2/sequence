import React from "react";

import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Paragraph from "../components/paragraph";

export default () => (
  <Layout mobileSized={true}>
    <Back />
    <Heading level={1}>About</Heading>
    <Paragraph>
      Vois is a talking timer for yoga and exercise. Build a series of actions,
      set a duration for each action, and then listen to the timer guide you
      from one action to the next.
    </Paragraph>
    <Paragraph>
      Vois was created by{" "}
      <a href="https://www.evan-harrison.com">Evan Harrison</a>.
    </Paragraph>
  </Layout>
);
