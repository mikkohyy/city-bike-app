import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from './stations'
import { getIntegerParameter, getStringParameter } from '../utils/generic'
import { ParsedQs } from 'qs'
import { Op } from 'sequelize'

interface QueryObject {
  page: number | undefined
  pageSize: number | undefined
  searchTerm: string | undefined
  language: string | undefined
  orderBy: string | undefined
  orderDirection: string | undefined
}

interface FindAllObject {
  offset?: number
  limit?: number
  order?: string[][]
  where?: object
}

const getSearchParametersObject = (query: ParsedQs): FindAllObject => {
  const queryParameters = getQueryObject(query)

  let parameters: FindAllObject = {
    offset: getOffset(queryParameters),
    limit: getLimit(queryParameters),
  }

  parameters = addOrderingParametersIfNeeded(parameters, queryParameters)
  parameters = addSearchParametersIfNeeded(parameters, queryParameters)

  return parameters
}

const addOrderingParametersIfNeeded = (
  parameters: FindAllObject,
  queryParameters: QueryObject
): FindAllObject => {
  const { orderBy, orderDirection, language } = queryParameters

  if (orderBy && orderDirection) {
    const orderingArray = getOrderParameters(orderBy, orderDirection, language)
    parameters = { ...parameters, order: orderingArray }
  }

  return parameters
}

const addSearchParametersIfNeeded = (
  parameters: FindAllObject,
  queryParameters: QueryObject
): FindAllObject => {
  const { searchTerm, language } = queryParameters

  if (searchTerm && language) {
    const nameKey = getLanguageKeyForStationName(language)
    const whereObject = {
      [nameKey]: { [Op.iLike]: `${searchTerm}%` },
    }

    parameters = { ...parameters, where: { ...whereObject } }
  }

  return parameters
}

const getOffset = (queryParameters: QueryObject): number => {
  const { page, pageSize } = queryParameters
  const offset =
    page !== undefined && pageSize !== undefined
      ? page * pageSize
      : DEFAULT_PAGE * DEFAULT_PAGE_SIZE

  return offset
}

const getLimit = (queryParameters: QueryObject): number => {
  const { pageSize } = queryParameters
  return pageSize !== undefined ? pageSize : DEFAULT_PAGE_SIZE
}

const getOrderParameters = (
  orderBy: string,
  orderDirection: string,
  language: string | undefined
): string[][] => {
  if (orderBy === 'stationName' && language === undefined) {
    throw new Error(
      'When ordering by station name, language must also be provided."'
    )
  }

  const byColumn = getOrderingColumnName(orderBy, language)
  const direction = orderDirection === 'ascending' ? 'ASC' : 'DESC'

  const orderParameters = [[byColumn, direction]]

  return orderParameters
}

const getOrderingColumnName = (
  orderBy: string,
  language: string | undefined
): string => {
  const columnChoices: { [key: string]: string } = {
    stationId: 'stationId',
  }

  const column =
    orderBy === 'stationName'
      ? getLanguageKeyForStationName(language)
      : columnChoices[orderBy]

  return column
}

const getLanguageKeyForStationName = (language: string | undefined): string => {
  if (language === undefined) {
    throw new Error(
      'When ordering by column name, language parameter is needed'
    )
  }
  const languageInLowCase = language.toLowerCase()

  const keys: Record<string, string> = {
    finnish: 'nameInFinnish',
    swedish: 'nameInSwedish',
    english: 'nameInEnglish',
  }

  return keys[languageInLowCase]
}

const getQueryObject = (query: ParsedQs): QueryObject => {
  const queryObject = {
    page: getIntegerParameter(query.page),
    pageSize: getIntegerParameter(query.pageSize),
    searchTerm: getStringParameter(query.search),
    language: getStringParameter(query.language),
    orderBy: getStringParameter(query.orderBy),
    orderDirection: getStringParameter(query.orderDirection),
  }

  return queryObject
}

export { getSearchParametersObject }
