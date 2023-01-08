import cors from 'cors'
import express from 'express'
const app = express()
import { connectToDatabase } from './utils/db'
import { unknownEndpoint } from './utils/middleware'

import stationRouter from './controllers/stations'

void connectToDatabase()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/stations', stationRouter)

app.get('/api/test', (_request, response) => {
  const responseData = {
    data: 'response',
  }
  response.json(responseData)
})

app.use(unknownEndpoint)

export default app
