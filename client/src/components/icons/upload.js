import React from "react";

import Upload from "../../images/icons/cloud-upload.svg";
import Icon from "../icon";

const UploadIcon = props => {
  return (
    <Icon dark={props.dark} color={props.color}>
      <Upload />
    </Icon>
  );
};

export default UploadIcon;
