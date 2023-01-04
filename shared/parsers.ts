import { isInteger, isString, isStationId, isDate } from './validators'

const parseIntegerId = (id: unknown): number => {
  if (id === null || isNaN(Number(id)) || !isInteger(id)) {
    throw new Error('Id is missing or invalid')
  }

  return Number(id)
}

const parseStationId = (stationId: unknown): string => {
  if (!stationId || !isString(stationId) || !isStationId(stationId)) {
    throw new Error('Station id is missing or invalid')
  }

  return stationId
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Date is missing or invalid')
  }
  return date
}

export { parseIntegerId, parseStationId, parseDate }
