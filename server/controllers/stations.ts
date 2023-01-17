import express from 'express'
import { Station } from '../models'
import { getIntegerParameter } from '../utils/generic'
const stationsRouter = express.Router()
import { validateRequestParameters } from '../utils/middleware'
import { getSearchParametersObject } from './stations_utils'

export const DEFAULT_PAGE = 0
export const DEFAULT_PAGE_SIZE = 50

stationsRouter.get(
  '/',
  validateRequestParameters,
  async (request, response, next) => {
    try {
      const parameters = getSearchParametersObject(request.query)

      const responseData = await Station.findAndCountAll({
        ...(parameters as object),
      })

      const page = getIntegerParameter(request.query.page) || DEFAULT_PAGE
      const pageSize =
        getIntegerParameter(request.query.pageSize) || DEFAULT_PAGE_SIZE

      const { count, rows } = responseData
      const nextPageNumber = (page + 1) * pageSize < count ? page + 1 : null
      const totalPages = Math.ceil(count / pageSize)

      response.json({
        data: rows,
        totalNOfRows: count,
        page: page,
        pageSize: pageSize,
        nextPage: nextPageNumber,
        totalPages: totalPages,
      })
    } catch (error) {
      next(error)
    }
  }
)

export default stationsRouter
