import React from "react";

import Heading from "../components/heading";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Heading level={1}>NOT FOUND</Heading>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
);

export default NotFoundPage;
