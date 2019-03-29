const mongoose = require('../db')

const schema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

schema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  delete obj.__v
  return obj
}

const UserModel = mongoose.model('User', schema)

module.exports = UserModel
