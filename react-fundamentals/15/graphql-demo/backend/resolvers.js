const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const UserModel = require('./models/user')
const ProductModel = require('./models/product')

const secret = 'THISISVERYVERYSECRET!!!'
const issuer = 'react-trainings'
const audience = 'react-trainings'

const generateToken =
  payload =>
    jwt.sign(payload, secret, {
      issuer,
      audience,
    })

const resolvers = {
  Query: {
    products: async (_,args,context) => {
      console.log('context', context)
      const products = await ProductModel.find().exec()

      const p = products.map(async product => {
        return {
          ...product.toObject(),
          owner: await UserModel.findById(product.ownerId)
        }
      })

      const result = await Promise.all(p)

      return result
    },
    productById: async (_, args) => {
      try {
        return await ProductModel.findById(args.id)
      } catch (e) {
        console.log('e', e)
        return Promise.reject(e)
      }
    },
    users: async () => {
      const users = await UserModel.find()

      return users.map(async user => {
        return {
          ...user,
          products: await ProductModel.find({ ownerId: user._id }).exec()
        }
      })
    }
  },
  Mutation: {
    signUp: async (_, { record: { firstName, lastName, email, password } }) => {
      const existingUser = await UserModel.findOne({ email }, '_id')
      if (existingUser) {
        throw new Error('User with this email already registered')
      }

      console.log({ firstName, lastName, email, password })

      const user = new UserModel({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
      })

      await user.save()

      const token = generateToken({ id: user._id })

      return {
        accessToken: token
      }
    },
    signIn: async (_, { record: { email, password } }) => {
      const user = await UserModel.findOne({ email })
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid credentials')
      }
  
      const token = generateToken({ id: user._id })

      return {
        accessToken: token
      }
    }
  }
}

module.exports = resolvers