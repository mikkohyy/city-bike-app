/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { validateRequestParameters } from '../../utils/middleware'
import { MockRequest } from '../mocks'
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

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
})
