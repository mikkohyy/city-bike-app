import { NextPage, StationId, XCoordinate, YCoordinate } from '../../types'

const isNextPage = (nextPage: unknown): nextPage is NextPage => {
  let isNextPage = false

  if (nextPage === null) {
    isNextPage = true
  } else if (typeof nextPage === 'number' && isInteger(nextPage)) {
    isNextPage = true
  }

  return isNextPage
}

const isInteger = (integer: unknown): integer is number => {
  const evaluatedInteger = Number(integer)
  return Number.isInteger(evaluatedInteger)
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isStationId = (stationId: string): stationId is StationId => {
  const stationIdPattern = /^\d{3}$/
  return stationIdPattern.test(stationId)
}

const isDate = (date: string): boolean => {
  if (isNaN(Date.parse(date))) {
    return false
  } else {
    return true
  }
}

const isNumber = (number: unknown): number is number => {
  const evaluatedNumber = Number(number)

  if (isNaN(evaluatedNumber) || !Number.isFinite(evaluatedNumber)) {
    return false
  } else {
    return true
  }
}

const isXCoordinate = (number: number): number is XCoordinate => {
  if (number >= -180 && number <= 180) {
    return true
  } else {
    return false
  }
}

const isYCoordinate = (number: number): number is YCoordinate => {
  if (number >= -90 && number <= 90) {
    return true
  } else {
    return false
  }
}

export {
  isInteger,
  isString,
  isStationId,
  isDate,
  isNumber,
  isXCoordinate,
  isYCoordinate,
  isNextPage,
}
