const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost:27017/react-trainings-shopping-cart',
  {
    useNewUrlParser: true
  }
)

module.exports = mongoose