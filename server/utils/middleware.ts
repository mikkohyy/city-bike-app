import { Request, Response } from 'express'

const unknownEndpoint = (_request: Request, response: Response) => {
  return response.status(404).send({ error: 'Unknown endpoint' })
}

export { unknownEndpoint }
