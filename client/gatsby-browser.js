import React from "react";
import { UserProvider } from "./src/context/UserContext";
// require("typeface-alata");
// import "typeface-alata";

export const wrapRootElement = ({ element }) => (
  <UserProvider>{element}</UserProvider>
);
