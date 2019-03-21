const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const faker = require('faker')

mongoose.connect(
  'mongodb://localhost:27017/react-trainings-shopping-cart',
  {
    useNewUrlParser: true
  }
)

const UserModel = mongoose.model('User', {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const ProductModel = mongoose.model('Product', {
  title: { type: String, required: true },
  price: { type: Number, required: true }
})

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


const port = 8080
const app = express()

app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello! I am API')
})

app.get('/products', async (req, res) => {
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

app.post('/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      throw new Error('Missing required data')
    }

    const user = await UserModel.findOne({
      email,
      password,
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }
    
    res.json({
      data: 'token-this-is-not-safe'
    })

    // const index = users.findIndex(
    //   u => 
    //     u.email === email && u.password === password
    // )
    // if (index > -1) {
    //   res.json({
    //     data: 'token-this-is-not-safe'
    //   })
    // } else {
    //   throw new Error('Invalid credentials')
    // }
  } catch (e) {
    console.log('e', e)
    res.status(400)
    res.statusMessage = e.message
    res.send({
      error: e.message
    })

  }
})

app.post('/sign-up', async (req, res) => {
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
      password,
    })

    await user.save()

    res.status(201)
    res.json({
      data: user
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

app.listen(port, () => {
  console.log('app is running on http://localhost:' + port)
})