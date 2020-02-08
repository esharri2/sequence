import React from "react";

import Back from "../components/back";
import ContactForm from "../components/contact-form";
import Heading from "../components/heading";
import Layout from "../components/layout";

const Contact = () => {
  return (
    <Layout mobileSized={true}>
      <Back />
      <Heading center={true} level={1}>
        Contact
      </Heading>
      <ContactForm />
    </Layout>
  );
};

export default Contact;
