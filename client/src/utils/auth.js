import { navigate } from "gatsby";
import { getUser } from "../utils/api";

const localStorageKeys = {
  email: "email"
};

export const isReturningUser = () =>
  localStorage.getItem(localStorageKeys.email);

export const clientLogIn = (userContext, email) => {
  localStorage.setItem(localStorageKeys.email, email);
  userContext.setUser(email);
};

export const clientLogOut = userContext => {
  localStorage.clear();
  userContext.setUser(null);
  navigate("/Login/");
};

export const checkIsLoggedInOnClient = userContext => {
  if (typeof window === "undefined") {
    return false;
  }
  const userInContext = userContext.user ? userContext.user.email : null;
  if (isReturningUser() && userInContext) {
    return true;
  }
  return false;
};

export const checkIsLoggedInOnServer = async userContext => {
  const email = isReturningUser();
  const response = await getUser(email);
  if (response) {
    return response;
  } else {
    clientLogOut(userContext);
    return false;
  }
};
