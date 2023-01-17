import express from 'express'
import { Station } from '../models'
import { getIntegerParameter, getStringParameter } from '../utils/generic'
const stationsRouter = express.Router()
import { validateRequestParameters } from '../utils/middleware'
import { Op } from 'sequelize'
import { ParsedQs } from 'qs'

// TÄSSÄ EI OLE JÄRKEÄ
interface WhereObjectTypes {
  nameInFinnish?: Record<symbol, string>
}

interface QueryObject {
  page: number | undefined
  pageSize: number | undefined
  search: string | undefined
  language: string | undefined
  orderBy: string | undefined
  orderDirection: string | undefined
}

interface FindAllObjectTypes {
  offset?: number
  limit?: number
  order?: string[][]
  where?: WhereObjectTypes
}

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 50

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

const getSearchParametersObject = (query: ParsedQs): FindAllObjectTypes => {
  const queryParameters = getQueryObject(query)

  let parameters: FindAllObjectTypes = {
    offset: getOffset(queryParameters.page, queryParameters.pageSize),
    limit: getLimit(queryParameters.pageSize),
  }

  parameters = addOrderingParametersIfNeeded(parameters, queryParameters)

  const searchTerm = getStringParameter(query.search)
  const language = getStringParameter(query.language)

  if (searchTerm && language) {
    const nameKey = getLanguageKeyForStationName(language)
    const whereObject: WhereObjectTypes = {
      [nameKey]: { [Op.iLike]: `${searchTerm}%` },
    }

    parameters = { ...parameters, where: { ...whereObject } }
  }

  return parameters
}

const addOrderingParametersIfNeeded = (
  parameters: FindAllObjectTypes,
  queryParameters: QueryObject
): FindAllObjectTypes => {
  const { orderBy, orderDirection, language } = queryParameters

  if (
    orderBy &&
    orderDirection &&
    language &&
    hasNecessaryOrderingParameters(orderBy, language)
  ) {
    const orderingArray = getOrderParameters(orderBy, orderDirection, language)
    parameters = { ...parameters, order: orderingArray }
  }

  return parameters
}

const getOffset = (
  page: number | undefined,
  pageSize: number | undefined
): number => {
  const offset =
    page !== undefined && pageSize !== undefined
      ? page * pageSize
      : DEFAULT_PAGE * DEFAULT_PAGE_SIZE

  return offset
}

const getLimit = (pageSize: number | undefined): number => {
  return pageSize !== undefined ? pageSize : DEFAULT_PAGE_SIZE
}

const getOrderParameters = (
  orderBy: string,
  orderDirection: string,
  language: string
): string[][] => {
  const byColumn = getOrderingColumnName(orderBy, language)
  const direction = orderDirection === 'ascending' ? 'ASC' : 'DESC'

  const orderParameters = [[byColumn, direction]]

  return orderParameters
}

const getQueryObject = (query: ParsedQs): QueryObject => {
  const queryObject = {
    page: getIntegerParameter(query.page),
    pageSize: getIntegerParameter(query.pageSize),
    search: getStringParameter(query.search),
    language: getStringParameter(query.language),
    orderBy: getStringParameter(query.orderBy),
    orderDirection: getStringParameter(query.orderDirection),
  }

  return queryObject
}

const getOrderingColumnName = (orderBy: string, language: string): string => {
  const columnChoices: { [key: string]: string } = {
    stationId: 'stationId',
  }

  const column =
    orderBy !== 'stationName'
      ? columnChoices[orderBy]
      : getLanguageKeyForStationName(language)

  return column
}

const hasNecessaryOrderingParameters = (
  orderBy: string | undefined,
  language: string | undefined
) => {
  let shouldAdd = false

  if (orderBy === 'stationId') {
    shouldAdd = true
  } else if (orderBy === 'stationName' && language) {
    shouldAdd = true
  }

  return shouldAdd
}

const getLanguageKeyForStationName = (language: string): string => {
  const languageInLowCase = language.toLowerCase()

  const keys: Record<string, string> = {
    finnish: 'nameInFinnish',
    swedish: 'nameInSwedish',
    english: 'nameInEnglish',
  }

  return keys[languageInLowCase]
}

export default stationsRouter
