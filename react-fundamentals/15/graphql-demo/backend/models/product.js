const mongoose = require('../db')

const ProductModel = mongoose.model('Product', {
  title: { type: String, required: true },
  description: { type: String, required: true },
  ownerId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
})

module.exports = ProductModel
