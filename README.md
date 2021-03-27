# Hasura Actions Demo

## Requirements:
- NPM
- Hasura instance local / cloud ([Quickstart with Docker /| Hasura GraphQL Docs](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple.html))
## Installation:
```
git clone git@github.com:SideHustlers/hasura_action_demo.git
cd hasura_action_demo
npm install
```
## Configuration:
##### This configuartion requires two varialbes in a `.env` file in root directory. 
```
HASURA_API_ENDPOINT={YOUR_INSTANCE_URL}
HASURA_API_ADMIN_SECRET={YOUR_ADMIN_SECRET}
JWT_SECRET={HS256 secret passphrase}
```
## Run Server:
```
npm start
```
