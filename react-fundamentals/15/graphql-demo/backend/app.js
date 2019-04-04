const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const UserModel = require('./models/user')

require('./seeds/products')

const secret = 'THISISVERYVERYSECRET!!!'
const issuer = 'react-trainings'
const audience = 'react-trainings'

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization
    console.log('token', token)

    if (token) {
      let payload = null
      try {
        payload = jwt.verify(token, secret, {
          issuer,
          audience,
        })
        console.log('payload', payload)

        const user = await UserModel.findOne({ _id: payload.id })
        if (user) {
          return { user }
        }
      } catch (e) {
        console.log('e', e.message)
      }
    }

  }
})

gqlServer
  .listen()
  .then(({ url }) => {
    console.log(`GraphQL Server is running at ${url}`)
  })