const axios = require('axios');

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': process.env.API_KEY_PORTAL,
};

const get = async (url, body) => {
  return axios.get(url, body, { headers });
};

const post = async (url, body) => {
  return axios.post(url, body, { headers });
};

module.exports = { get, post };
