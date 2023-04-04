const fetchJSON = async (url, options = {}) => {
  options.headers = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  if (response.status === 204) {
    return {};
  }
  return await response.json();
};

const fetchData = async (appendUrl, options) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/${appendUrl}`;
  return await fetchJSON(url, options);
};

export { fetchJSON, fetchData };
