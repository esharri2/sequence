const handleErrors = (response) => {
  if (!response.ok) {
    const { status, statusText } = response;
    const error = new Error(statusText);
    error.code = status;
    throw error;
  }
  return response;
};

export const baseURL = process.env.GATSBY_API_URL;

export const defaultOptions = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Cache: "no-cache",
  },
};

export const getData = async (route, params) => {
  try {
    const options = {
      method: "GET",
      ...defaultOptions,
    };

    const urlString = baseURL + route;
    const searchParams = new URLSearchParams(params);

    const url = searchParams
      ? new URL(urlString + "?" + searchParams.toString())
      : new URL(urlString);

    const response = await fetch(url, options);
    handleErrors(response);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (route, body) => {
  try {
    const options = {
      body: JSON.stringify(body),
      method: "POST",
      ...defaultOptions,
    };
    const response = await fetch(baseURL + route, options);
    handleErrors(response);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const putData = async (route, body) => {
  try {
    const options = {
      body: JSON.stringify(body),
      method: "PUT",
      ...defaultOptions,
    };
    const response = await fetch(baseURL + route, options);
    handleErrors(response);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (route, body) => {
  try {
    const options = {
      body: JSON.stringify(body),
      method: "DELETE",
      ...defaultOptions,
    };
    const response = await fetch(baseURL + route, options);
    handleErrors(response);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};
