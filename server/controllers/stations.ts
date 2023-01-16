import express from 'express'
import { Station } from '../models'
import { getIntegerParameter, getStringParameter } from '../utils/generic'
const stationsRouter = express.Router()
import { validateRequestParameters } from '../utils/middleware'
import { Op } from 'sequelize'
import { ParsedQs } from 'qs'

interface WhereObjectTypes {
  nameInFinnish?: Record<symbol, string>
}

interface FindAllObjectTypes {
  offset?: number
  limit?: number
  where?: WhereObjectTypes
}

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 50

stationsRouter.get(
  '/',
  validateRequestParameters,
  async (request, response, next) => {
    const searchParametersObject = constructObjectForFindAll(request.query)

    const page = getIntegerParameter(request.query.page) || DEFAULT_PAGE
    const pageSize =
      getIntegerParameter(request.query.pageSize) || DEFAULT_PAGE_SIZE

    try {
      const responseData = await Station.findAndCountAll({
        ...(searchParametersObject as object),
      })

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

const constructObjectForFindAll = (query: ParsedQs): FindAllObjectTypes => {
  let findAllObject: FindAllObjectTypes = {
    offset: getOffset(query),
    limit: getIntegerParameter(query.pageSize) || DEFAULT_PAGE_SIZE,
  }

  const searchTerm = getStringParameter(query.search)
  const language = getStringParameter(query.language)

  if (searchTerm && language) {
    const nameKey = getLanguageKeyForStationName(language)
    const whereObject: WhereObjectTypes = {
      [nameKey]: { [Op.iLike]: `${searchTerm}%` },
    }

    findAllObject = { ...findAllObject, where: { ...whereObject } }
  }

  return findAllObject
}

const getOffset = (query: ParsedQs): number => {
  const page: number | null = getIntegerParameter(query.page)
  const pageSize: number | null = getIntegerParameter(query.pageSize)
  const offset =
    page !== null && pageSize !== null
      ? page * pageSize
      : DEFAULT_PAGE * DEFAULT_PAGE_SIZE

  return offset
}

const getLanguageKeyForStationName = (language: string): string => {
  const keys: Record<string, string> = {
    finnish: 'nameInFinnish',
    swedish: 'nameInSwedish',
    english: 'nameInEnglish',
  }

  return keys[language]
}

export default stationsRouter
