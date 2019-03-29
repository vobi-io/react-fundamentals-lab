const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')

require('./seeds/products')

const port = 8080
const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use(authRouter)
app.use(productRouter)
app.use(userRouter)

app.get('/', (req, res) => {
  res.send('Hello! I am API')
})

app.listen(port, () => {
  console.log('app is running on http://localhost:' + port)
})