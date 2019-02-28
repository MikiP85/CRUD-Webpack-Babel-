class EasyHTTP {
  // Make an HTTP GET Request

  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  // Make HTTP POST Request

  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const resData = response.json();
    return resData;
  }

  // Make HTTP PUT request

  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const resData = response.json();
    return resData;
  }

  // Make HTTP DELETE request

  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    });
    const resData = response.json();
    return resData;
  }
}

export const http = new EasyHTTP();
