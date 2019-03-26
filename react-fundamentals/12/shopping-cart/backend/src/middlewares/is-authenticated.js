const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const secret = 'THISISVERYVERYSECRET!!!'
const issuer = 'react-trainings'
const audience = 'react-trainings'

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    let payload = null
    try {
      payload = jwt.verify(token, secret, {
        issuer,
        audience,
      })
      console.log('payload', payload)
    } catch (e) {
      console.log('e', e.message)
      throw new Error('User is not authorized')
    }

    const user = await UserModel.findOne({ _id: payload.id })
    if (!user) {
      throw new Error('User is not authorized')
    }

    req.user = user

    next()
  } catch (e) {
    res.status(500)
    res.json({
      error: e.message,
    })
  }
}

module.exports = isAuthenticated
