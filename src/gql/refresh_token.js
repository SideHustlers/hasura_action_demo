module.exports = {
  buildCreateRefreshTokenBody: function(token, user, issued_at, expires_at) {
    return `
    mutation CreateRefreshToken {
      insert_refresh_tokens_one(object: {expires_at: "${expires_at}", issued_at: "${issued_at}", refresh_token: "${token}", user: ${user.id}}) {
        refresh_token
      }
    }`
  }
};