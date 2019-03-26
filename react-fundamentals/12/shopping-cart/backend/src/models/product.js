const mongoose = require('../db')

const ProductModel = mongoose.model('Product', {
  title: { type: String, required: true },
  price: { type: Number, required: true }
})

module.exports = ProductModel
