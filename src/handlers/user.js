const { adminClient } = require('./hasura');
const { generatePasswordHash } = require('../helpers/password');
const { buildCreateUserBody, buildFetchUserByUsernameBody } = require('../gql/users');

module.exports = {
  createUser: async function(body) {
    let hash = generatePasswordHash(body.password_1);
    try {
      let resp = await adminClient()({
        url: '',
        method: 'POST',
        data: { query: buildCreateUserBody(body, hash, 0)}
      });
      if ('errors' in resp.data) {
        throw JSON.stringify(resp.data.errors);
      }
      return resp.data.data.insert_users_one;
    } catch (err) {
      throw err;
    }
  },
  fetchUserByUsername: async function(body) {
    try {
      let resp = await adminClient()({
        url: '',
        method: 'POST',
        data: { query: buildFetchUserByUsernameBody(body.username)}
      });
      if ('errors' in resp.data) {
        throw JSON.stringify(resp.data.errors);
      }
      if (resp.data.data.users.length == 0) {
        throw "No user found";
      }
      return resp.data.data.users[0];
    } catch (err) {
      throw err;
    }
  }
}


