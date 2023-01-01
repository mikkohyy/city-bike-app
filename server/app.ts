const cors = require('cors')
import express from 'express'
const app = express()
const { connectToDatabase } = require('./utils/db')
const { Station } = require('./models')

connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/api/stations', async (_request, response) => {
  console.log('hello')
  try {
    const responseData = await Station.findAll({ limit: 20 })
    response.json(responseData)
  } catch (error) {
    console.log(error)
    response.status(400).end()
  }
})

module.exports = app
