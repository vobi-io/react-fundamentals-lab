const { Router } = require('express')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const secret = 'THISISVERYVERYSECRET!!!'
const issuer = 'react-trainings'
const audience = 'react-trainings'

const generateToken =
  payload =>
    jwt.sign(payload, secret, {
      issuer,
      audience,
    })

const authRouter = new Router()

authRouter.post('/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      throw new Error('Missing required data')
    }

    const user = await UserModel.findOne({ email })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid credentials')
    }

    const token = generateToken({ id: user._id })

    res.json({
      data: token
    })
  } catch (e) {
    console.log('e', e)
    res.status(400)
    res.statusMessage = e.message
    res.send({
      error: e.message
    })

  }
})

authRouter.post('/sign-up', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new Error('Missing required data')
    }

    const existingUser = await UserModel.findOne({ email }, '_id')
    if (existingUser) {
      throw new Error('User with this email already registered')
    }

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
    })

    await user.save()

    const token = generateToken({ id: user._id })

    res.status(201)
    res.json({
      data: {
        user,
        token,
      }
    })
  } catch (e) {
    console.log('e', e)
    res.status(400)
    res.statusMessage = e.message
    res.send({
      error: e.message
    })
  }
})

module.exports = authRouter