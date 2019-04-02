const { ApolloServer, gql } = require('apollo-server')

const products = [
  {
    id: 1,
    title: 'Title 1',
    description: 'Desc 1',
    ownerId: 1,
  },
  {
    id: 2,
    title: 'Title 2',
    description: 'Desc 2',
    ownerId: 1,
  },
  {
    id: 3,
    title: 'Title 3',
    description: 'Desc 3',
    ownerId: 2,
  }
]

const users = [
  {
    id: 1,
    firstName: 'first name 1',
    lastName: 'last name 2',
  },
  {
    id: 2,
    firstName: 'first name 2',
    lastName: 'last name 2',
  }
]

const typeDefs = gql`
  type Product {
    id: Int
    title: String!
    description: String
    owner: User
  }

  type User {
    id: Int
    firstName: String
    lastName: String
    products: [Product]
  }

  type Query {
    products(price: Float): [Product]
    productById(id: Int!): Product
    users: [User]
  }
`

const resolvers = {
  Query: {
    products: () => {
      return products.map(product => {
        return {
          ...product,
          owner: users.find(user => user.id === product.ownerId)
        }
      })
    },
    productById: (parent, args) => {
      try {
        return products.find(p => ps.id === args.id)
      } catch (e) {
        console.log('e', e)
        return Promise.reject(e)
      }
    },
    users: () => {
      return users.map(user => {
        return {
          ...user,
          products: products.filter(product => product.ownerId === user.id)
        }
      })
    }
  }
}

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
})

gqlServer
  .listen()
  .then(({ url }) => {
    console.log(`GraphQL Server is running at ${url}`)
  })