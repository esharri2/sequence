import React, { createContext, useState } from "react";

const defaultState = {
  email: null,
  home: {
    name: null,
    id: null
  }
};

const UserContext = createContext(defaultState);

const UserProvider = props => {
  const [user, setUserValue] = useState(defaultState);

  const setUser = email => {
    setUserValue({ email });
  };

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
