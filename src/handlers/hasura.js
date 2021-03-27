const axios = require('axios');
let url = process.env.HASURA_API_ENDPOINT;
let secret = process.env.HASURA_API_ADMIN_SECRET;

const options = {};
options.baseURL = url;
options.headers = {};

module.exports = {
  adminClient: () => {
    options.headers['x-hasura-admin-secret'] = secret;
    return axios.create(options);
  },
  client: (accessToken) => {
    if (accessToken) {
      options.headers.Authorization = accessToken;
    }
    return axios.create(options);
  }
};