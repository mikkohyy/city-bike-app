import express from 'express'
import { Station } from '../models'

const stationsRouter = express.Router()

stationsRouter.get('/', async (_request, response, _next) => {
  try {
    const responseData = await Station.findAll()
    response.json({ data: responseData })
  } catch (error) {
    console.log(error)
    response.status(400).end()
  }
})

export default stationsRouter
