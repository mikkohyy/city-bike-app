/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { validateRequestParameters, errorHandler } from '../../utils/middleware'
import { MockRequest, MockResponse } from '../mocks'
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import { CustomError } from '../../utils/error'
dotenv.config()

interface TestResponse extends Response {
  statusValue: unknown
  jsonValue: unknown
}

describe('validateRequestParameters()', () => {
  const NEW_MAX_PAGE_SIZE = 1000

  process.env = {
    ...process.env,
    MAX_PAGE_SIZE: NEW_MAX_PAGE_SIZE.toString(),
  }

  describe('when validating GET /api/station requests', () => {
    test('when valid parameters (?page=0&size=5)', () => {
      const mockNext = jest.fn()

      const parameters = { page: 0, size: 5 }
      const request = new MockRequest(undefined, parameters)

      validateRequestParameters(
        request as Request,
        {} as Response,
        mockNext as NextFunction
      )

      expect(mockNext).toHaveBeenCalledTimes(1)
    })
    test(`when invalid parameters (?page=0&size=${
      NEW_MAX_PAGE_SIZE + 1
    })`, () => {
      const mockNext = jest.fn()

      const parameters = { page: 0, size: NEW_MAX_PAGE_SIZE + 1 }
      const request = new MockRequest(undefined, parameters)

      expect(() => {
        validateRequestParameters(
          request as Request,
          {} as Response,
          mockNext as NextFunction
        )
      }).toThrow(
        new Error(
          `Page size should be smaller than or equal to ${NEW_MAX_PAGE_SIZE}.`
        )
      )
    })
  })

  describe('errorHandler', () => {
    describe('when CustomError with status code 400', () => {
      let receivedData: Response
      let error

      beforeAll(() => {
        const mockResponse = new MockResponse()

        error = new CustomError('Something went wrong.', 'CustomError', 400)

        receivedData = errorHandler(
          error,
          {} as Request,
          mockResponse as unknown as Response
        )
      })

      test('responds with expected status code', () => {
        expect((receivedData as TestResponse).statusValue).toBe(400)
      })

      test('responds with expected message', () => {
        expect((receivedData as TestResponse).jsonValue).toEqual({
          error: 'Something went wrong.',
        })
      })
    })

    describe('when unknown error', () => {
      let receivedData: Response
      let error

      beforeAll(() => {
        const mockResponse = new MockResponse()

        error = new CustomError('Something went wrong.', 'Error', 500)

        receivedData = errorHandler(
          error,
          {} as Request,
          mockResponse as unknown as Response
        )
      })

      test('responds with status code 500', () => {
        expect((receivedData as TestResponse).statusValue).toBe(500)
      })
    })
  })
})
