import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Alert from "@reach/alert";

import { border, breakpoints, colors, shadows, spacing } from "../utils/styles";

const AlertWrapper = styled(Alert)`
  background-color: ${colors.yellow};
  padding: ${spacing.sm};
  color: ${colors.black};
  border-radius: ${border.radius};
  margin: ${spacing.sm} 0;
  position: relative;
  box-shadow: ${shadows.sm};
`;

const AlertMessage = props => {
  return (
    <AlertWrapper type="polite">
      {props.message}
      {props.children}
    </AlertWrapper>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.any.isRequired
};

export default AlertMessage;
