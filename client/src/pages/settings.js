import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import Back from "../components/back";
import Button from "../components/button";
import ChevronRight from "../components/icons/chevron-right";
import Heading from "../components/heading";
import Paragraph from "../components/paragraph";
import Layout from "../components/layout";
import Link from "../components/link";
import SpinnerOverlay from "../components/spinner-overlay";

import { deleteAccount } from "../utils/api";
import { border, colors, spacing } from "../utils/styles";

const Section = styled.section`
  margin: ${spacing.xl} 0;
  padding-bottom: ${spacing.xl};
  border-bottom: ${border.size} ${border.style} ${colors.medium};
`;

const Subheading = styled(Heading)`
  text-align: left;
`;

const StyledButton = styled(Button)`
  margin-top: ${spacing.md};
`;

export default () => {
  const [loading, setLoading] = useState(false);

  // TODO update this use fetch hook.
  const handleDeleteClick = event => {
    setLoading(true);
    deleteAccount()
      .then(response => {
        navigate("/");
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout mobileSized={true}>
      <Back />
      {loading && <SpinnerOverlay />}
      <Heading level={1}>Settings</Heading>
      <Section>
        <Subheading level={2}>Change Password</Subheading>
        <Link to="/change-password/">
          Change your password <ChevronRight color={colors.lavender} />
        </Link>
      </Section>
      <Section>
        <Subheading level={2}>Delete Account</Subheading>
        <Paragraph>Completely delete your account from our systems.</Paragraph>
        <StyledButton onClick={handleDeleteClick}>
          Delete your account
        </StyledButton>
      </Section>
    </Layout>
  );
};
