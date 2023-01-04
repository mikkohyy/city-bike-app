import { StationId } from './types'

const isInteger = (number: unknown): number is number => {
  const evaluatedNumber = Number(number)
  return Number.isInteger(evaluatedNumber)
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

export { isInteger, isString, isStationId, isDate }
