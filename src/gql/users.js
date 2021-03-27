module.exports = {
  buildCreateUserBody: function(body, passwordHash, role) {
    return `
    mutation MyMutation {
      insert_users_one(object: {email: "${body.email}", username: "${body.username}", first_name: "${body.first_name}", last_name: "${body.last_name}", password: "${passwordHash}", role: ${role}}) {
        id
        user_id
        email
        first_name
        last_name
        phone
        status
        role
      }
    }
    `;
  },
  buildFetchUserByUsernameBody: function(username) {{
    return `
    query {
      users(where: {username: {_eq: "${username}"}}) {
        id
        user_id
        email
        first_name
        last_name
        password
        phone
        status
        role
      }
    }
    `
  }}
};