import React from "react";

import Back from "../components/back";
import Heading from "../components/heading";
import Layout from "../components/layout";
import Link from "../components/link";
import Paragraph from "../components/paragraph";

export default () => (
  <Layout mobileSized={true}>
    <Back />
    <Heading level={1}>About Vois</Heading>
    <Paragraph>
      Vois is a talking timer for yoga and exercise. Build a series of actions,
      set a duration for each action, and then listen to the timer guide you
      from one action to the next.
    </Paragraph>
    <Heading level={2}>Get in touch</Heading>
    <Paragraph>
      Have a question, idea, or feedback?{" "}
      <Link to="/contact/">Get in touch here.</Link>
    </Paragraph>
    <Heading level={2}>Support Vois</Heading>
    <Paragraph>
      To support the maintenance of this app and future improvements, buy me a
      coffee:
    </Paragraph>

    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="B8FCDF6XVDX8N" />
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
        border="0"
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button"
      />
      <img
        alt=""
        border="0"
        src="https://www.paypal.com/en_US/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
    <Heading level={2}>About the creator</Heading>
    <Paragraph>
      Vois was created by{" "}
      <a href="https://www.evan-harrison.com">Evan Harrison</a>.
    </Paragraph>
  </Layout>
);
