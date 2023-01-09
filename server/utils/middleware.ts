import { CustomError } from './error'
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const unknownEndpoint = (_request: Request, response: Response) => {
  return response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error.type === 'CustomError') {
    const customError = error as CustomError
    return response
      .status(customError.statusCode)
      .json({ error: customError.message })
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

  const { pageSize } = request.query

  if (
    pageSize &&
    !isNaN(Number(pageSize)) &&
    Number(pageSize) > Number(process.env.MAX_PAGE_SIZE)
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
