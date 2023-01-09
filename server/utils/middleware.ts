import { CustomError } from './error'
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const unknownEndpoint = (_request: Request, response: Response) => {
  return response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (
  error: CustomError,
  _request: Request,
  response: Response
) => {
  if (error.type === 'CustomError') {
    return response.status(error.statusCode).json({ error: error.message })
  } else {
    return response.status(500).end()
  }
}

const validateRequestParameters = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const errors: string[] = []

  const { size } = request.query

  if (
    size &&
    !isNaN(Number(size)) &&
    Number(size) > Number(process.env.MAX_PAGE_SIZE)
  ) {
    errors.push(
      `Page size should be smaller than or equal to ${process.env.MAX_PAGE_SIZE}.`
    )
  }

  if (errors.length > 0) {
    const errorString = errors.join(' ')
    throw new CustomError(errorString, 'CustomError', 400)
  } else {
    next()
  }
}

export { unknownEndpoint, validateRequestParameters, errorHandler }
