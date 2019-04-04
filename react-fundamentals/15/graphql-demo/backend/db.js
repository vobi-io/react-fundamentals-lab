const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost:27017/react-trainings-graphql-demo',
  {
    useNewUrlParser: true
  }
)

module.exports = mongoose