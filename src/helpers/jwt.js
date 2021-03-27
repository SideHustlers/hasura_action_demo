const jwt = require('jsonwebtoken');
const { createRefreshToken } = require('../handlers/refresh_token');


function buildHasuraClaims(user) {
  return {
    "x-hasura-allowed-roles": ["0", "100"],
    "x-hasura-default-role": "" + user.role,
    "x-hasura-user-id": user.user_id
  }
};

module.exports = {
  generateJWT: function(user) {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {...user,
        "https://hasura.io/jwt/claims": buildHasuraClaims(user)
      }
    }, process.env.JWT_SECRET);
  },
  generateRefreshToken: async function(user) {
    var obj = {};
    obj.user = user;
    obj.token = [...Array(50)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    obj.issued_at = new Date().toISOString();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    obj.expires_at = tomorrow.toISOString();
    return createRefreshToken(obj);
  }
}