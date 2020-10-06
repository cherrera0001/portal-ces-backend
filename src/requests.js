const axios = require('axios');

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': process.env.API_KEY_PORTAL,
};

const get = async (url) => {
  return axios.get(url, { headers });
};

const post = async (url, body) => {
  return axios.post(url, body, { headers });
};

const deleteMethod = async (url, body) => {
  return axios.delete(url, body, { headers });
};

module.exports = { get, post, deleteMethod };
