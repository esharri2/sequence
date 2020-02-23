import { navigate } from "gatsby";
import { getData } from "./http";

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
  navigate("/login/");
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
  try {
    const url = new URL("/user");
    url.searchParams.append("email", email);
    const response = await getData(url);
    return response;
  } catch (error) {
    clientLogOut(userContext);
    return false;
  }
};
