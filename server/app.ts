import cors from 'cors'
import express from 'express'
const app = express()
import { connectToDatabase } from './utils/db'
import { Station } from './models'

void connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/api/stations', async (_request, response) => {
  try {
    const responseData = await Station.findAll({ limit: 20 })
    response.json(responseData)
  } catch (error) {
    console.log(error)
    response.status(400).end()
  }
})

app.get('/api/test', (_request, response) => {
  const responseData = {
    data: 'response',
  }
  response.json(responseData)
})

export default app
