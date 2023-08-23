async function makeHTTPRequest(url, method, data = null, headers = {}) {
  try {
    const fetchOptions = {
      method: method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };

    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

export default makeHTTPRequest;
