import React, { useContext } from "react";

import Footer from "./footer";
import Header from "./header";
import LinkButton from "./link-button";
import Main from "./main";
import StickyNotification from "./sticky-notification";

import UserContext from "../context/UserContext";
import { checkIfDemoEmail } from "../utils/strings";

const Layout = props => {
  const user = useContext(UserContext).user;
  const isDemo = user ? checkIfDemoEmail(user.email) : false;

  return (
    <>
      {props.hideNav ? <Header hideNav={props.hideNav} /> : <Header />}
      <Main mobileSized={props.mobileSized}>{props.children}</Main>
      {isDemo && (
        <StickyNotification>
          Enjoy the app? {"  "}
          <LinkButton to="/SignUp/" state={{ isDemo: true }}>
            Sign up
          </LinkButton>
        </StickyNotification>
      )}
      {props.hideFooter ? null : <Footer />}
    </>
  );
};

export default Layout;
