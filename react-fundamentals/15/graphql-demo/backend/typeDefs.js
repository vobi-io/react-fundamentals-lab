const { gql } = require('apollo-server')

const typeDefs = gql`
type Product {
  _id: ID
  title: String
  description: String
  owner: User
}

type User {
  _id: ID
  firstName: String
  lastName: String
  products: [Product]
}

type Token {
  accessToken: String!
}

input SignUpInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
}

input SignInInput {
  email: String!
  password: String!
}

type Query {
  products: [Product]
  productById(id: ID!): Product
  users: [User]
}

type Mutation {
  signUp(record: SignUpInput!): Token!
  signIn(record: SignInInput!): Token!
}
`

module.exports = typeDefs
