export const validateEmail = email =>
  /\S+@\S+\.\S+/.test(String(email).toLowerCase());

export const validatePassword = password =>
  password.length > 0 ? true : false;
