import {
  parseStationId,
  parseDate,
  parseInteger,
  parseNumber,
} from '../../shared/parsers'
import { NewJourney } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewJourney = (object: any): NewJourney => {
  const createdNewJourney: NewJourney = {
    departureTime: parseDate(object.Departure),
    returnTime: parseDate(object.Return),
    departureStationId: parseStationId(object['Departure station id']),
    returnStationId: parseStationId(object['Return station id']),
    coveredDistanceInMeters: parseNumber(object['Covered distance (m)']),
    durationInSeconds: parseInteger(object['Duration (sec.)']),
  }

  return createdNewJourney
}

export { toNewJourney }
