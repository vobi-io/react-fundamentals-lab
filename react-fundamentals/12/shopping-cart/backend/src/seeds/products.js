const faker = require('faker')
const ProductModel = require('../models/product')

ProductModel
  .find(null, '_id')
  .exec()
  .then(results => {
    if (results.length === 0) {
      const productsToSave = []
      for (let i = 0; i < 100; i++) {
        productsToSave.push(ProductModel.create({
          title: faker.commerce.productName(),
          price: faker.commerce.price(),
        }))
      }
      Promise
        .all(productsToSave)
        .then(() => {
          console.log('Products inserted successfully')
        })
        .catch(err => {
          console.log('Something goes wrong: ', err)
        })
    }
  })