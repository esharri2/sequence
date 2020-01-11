const handleErrors = response => {
  if (!response.ok) {
    const { status, statusText } = response;
    throw { error: true, status, statusText };
  }
  return response;
};

export const baseURL = process.env.GATSBY_API_URL;

export const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" }
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
    return error;
  }
};
