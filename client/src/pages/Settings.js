import React, { useContext, useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import Button from "../components/button";
import ChevronRight from "../components/icons/chevron-right";
import Heading from "../components/heading";
import Paragraph from "../components/paragraph";
import Layout from "../components/layout";
import Link from "../components/link";
import SpinnerOverlay from "../components/spinner-overlay";

import UserContext from "../context/UserContext";
import { deleteAccount, getExport } from "../utils/api";
import { border, colors, spacing } from "../utils/styles";

const Section = styled.section`
  margin: ${spacing.xl} 0;
  padding-bottom: ${spacing.xl};
  border-bottom: ${border.size} ${border.style} ${colors.medium};
`;

const ButtonContainer = styled.div`
  display: flex;
  button {
    margin-right: ${spacing.md};
  }
`;

export default () => {
  const user = useContext(UserContext).user;
  const id = user ? (user.home ? user.home.id : null) : null;

  const [loading, setLoading] = useState(false);

  const handleClick = event => {
    setLoading(true);
    const fileType = event.target.dataset.type;
    getExport({ id, fileType })
      .then(response => {
        console.log(response.data);
        const fileName = fileType === "pdf" ? "export.pdf" : "export.json";
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
    <Layout>
      {loading && <SpinnerOverlay />}
      <Heading level={1}>Settings</Heading>
      <Section>
        <Heading level={2}>Manage homes</Heading>
        <Link to="/Homes/">
          Add new homes, edit existing home details, or change your default home
          <ChevronRight dark={true} />
        </Link>
      </Section>
      <Section>
        <Heading level={2}>Export home data</Heading>
        <Paragraph>Export all of the details about your.</Paragraph>
        <ButtonContainer>
          <Button onClick={handleClick} data-type="pdf">
            Save as PDF
          </Button>
          <Button onClick={handleClick} data-type="json">
            Export raw data
          </Button>
        </ButtonContainer>
      </Section>
      <Section>
        <Heading level={2}>Change Password</Heading>
        <Link to="/ChangePassword/">
          Change your password <ChevronRight dark={true} />
        </Link>
      </Section>
      <Section>
        <Heading level={2}>Delete Account</Heading>
        <Paragraph>Completely delete your account from our systems.</Paragraph>
        <Button onClick={handleDeleteClick}>Delete your account</Button>
      </Section>
    </Layout>
  );
};
