import {
  isInteger,
  isString,
  isStationId,
  isDate,
  isNumber,
} from './validators'

const parseInteger = (id: unknown): number => {
  if (id === null || isNaN(Number(id)) || !isInteger(id)) {
    throw new Error('Value is missing or is not an integer')
  }

  return Number(id)
}

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Value is missing or is not a string')
  }

  return string
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

const parseNumber = (number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error('Value is missing or not a number')
  }

  return Number(number)
}

export { parseInteger, parseStationId, parseDate, parseString, parseNumber }
