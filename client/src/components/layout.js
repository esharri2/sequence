import React, { useContext } from "react";

import Footer from "./footer";
import GlobalStyle from "./global-style";
import Header from "./header";
import Main from "./main";

import UserContext from "../context/UserContext";

const Layout = props => {
  const user = useContext(UserContext).user;
  const email = user ? user.email : null;
  return (
    <>
      <GlobalStyle />
      {props.hideNav ? (
        <Header hideNav={props.hideNav} />
      ) : (
        <Header authenticated={email} />
      )}
      <Main mobileSized={props.mobileSized}>{props.children}</Main>
      {props.hideFooter ? null : <Footer authenticated={email} />}
    </>
  );
};

export default Layout;
