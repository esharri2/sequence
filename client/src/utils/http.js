const handleErrors = response => {
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
  headers: { "Content-Type": "application/json" }
};

export const getData = async route => {
  try {
    const options = {
      method: "GET",
      ...defaultOptions
    };
    const response = await fetch(baseURL + route, options);
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
      ...defaultOptions
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
      ...defaultOptions
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
      ...defaultOptions
    };
    const response = await fetch(baseURL + route, options);
    handleErrors(response);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};
