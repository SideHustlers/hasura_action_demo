const { adminClient } = require('./hasura');
const { buildCreateRefreshTokenBody } = require('../gql/refresh_token');

module.exports = {
  createRefreshToken: async function(tokenObj) {
    try {
      let resp = await adminClient()({
        url: '',
        method: 'POST',
        data: { query: buildCreateRefreshTokenBody(
          tokenObj.token,
          tokenObj.user,
          tokenObj.issued_at,
          tokenObj.expires_at
        )}
      });

      if ('errors' in resp.data) {
        throw JSON.stringify(resp.data.errors);
      }
      return resp.data.data.insert_refresh_tokens_one.refresh_token;
    } catch (err) {
      throw err;
    }
  }
}