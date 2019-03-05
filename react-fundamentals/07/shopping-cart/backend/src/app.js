const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const users = []

const port = 8080
const app = express()

app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello! I am API')
})

app.get('/users', (req, res) => {
  res.json({ data: users })
})

app.post('/sign-in', (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      throw new Error('Missing required data')
    }

    const index = users.findIndex(
      u => 
        u.email === email && u.password === password
    )
    if (index > -1) {
      res.json({
        data: 'token-this-is-not-safe'
      })
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (e) {
    console.log('e', e)
    res.status(400)
    res.statusMessage = e.message
    res.send({
      error: e.message
    })

  }
})

app.post('/sign-up', (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new Error('Missing required data')
    }

    const index = users.findIndex(u => u.email === email)
    if (index > -1) {
      throw new Error('User with this email already registered')
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }
    
    users.push(user)

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