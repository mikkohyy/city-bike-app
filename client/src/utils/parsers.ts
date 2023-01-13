import { NextPage, StationId, XCoordinate, YCoordinate } from '../../types'
import {
  isNextPage,
  isInteger,
  isString,
  isStationId,
  isDate,
  isNumber,
  isXCoordinate,
  isYCoordinate,
} from '../utils/validators'

const parseNextPage = (nextPage: unknown): NextPage => {
  if (nextPage === undefined || !isNextPage(nextPage)) {
    throw new Error('Value is missing or is not valid NextPage data')
  }

  return nextPage
}

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

const parseStationId = (stationId: unknown): StationId => {
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

const parseXCoordinate = (number: unknown): XCoordinate => {
  if (!number || !isNumber(number) || !isXCoordinate(number)) {
    throw new Error('Value is missing or is not an x coordinate')
  }

  return Number(number)
}

const parseYCoordinate = (number: unknown): YCoordinate => {
  if (!number || !isNumber(number) || !isYCoordinate(number)) {
    throw new Error('Value is missing or is not an y coordinate')
  }

  return Number(number)
}

export {
  parseInteger,
  parseStationId,
  parseDate,
  parseString,
  parseNumber,
  parseXCoordinate,
  parseYCoordinate,
  parseNextPage,
}
