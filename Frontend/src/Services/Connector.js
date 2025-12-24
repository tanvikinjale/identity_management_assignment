import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  console.log("apicon : ", bodyData);

  const accountData = JSON.parse(localStorage.getItem('account'));
  console.log("url" + url);
  let token;

  if (accountData) {
    token = accountData.token;
  }

  headers = headers || {}; // Initialize headers as an empty object if not provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log("in");
  }

  return axiosInstance({
    method: method,
    url: url,
    data: bodyData || null,
    headers: headers,
    params: params || null,
  });
};
