const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();

const { createUser, fetchUserByUsername } = require('./handlers/user');
const { generateJWT, generateRefreshToken } = require('./helpers/jwt');
const { returnSuccessResponse, returnFailResponse } = require('./helpers/response');
const { compare } = require('./helpers/password');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    let registerBody = req.body.input.user;
    let user = await createUser(registerBody);
    let accessToken = generateJWT(user);
    let refreshToken = await generateRefreshToken(user);
    return returnSuccessResponse(res, {accessToken: accessToken, refreshToken: refreshToken});
  } catch (err) {
    console.log(err);
    return returnFailResponse(res, err);
  }
});

app.post('/login', async (req, res) => {
  try {
    let authBody = req.body.input.auth;
    let user = await fetchUserByUsername(authBody);
    console.log(user);
    if (compare(authBody.password, user.password)) {
      let accessToken = generateJWT(user);
      let refreshToken = await generateRefreshToken(user);
      return returnSuccessResponse(res, {accessToken: accessToken, refreshToken: refreshToken});
    } else {
      return returnFailResponse(res, "Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    return returnFailResponse(res, err);
  }
})

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});