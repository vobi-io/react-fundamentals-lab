const { Router } = require('express')
const ProductModel = require('../models/product')

const productRouter = new Router()

productRouter.get('/products', async (req, res) => {
  const { term } = req.query

  const selector = {}
  if (term) {
    selector.title = { $regex: new RegExp(term), $options: 'i' }
  }

  const products = await ProductModel.find(selector)

  res.json({
    data: products
  })
})

module.exports = productRouter