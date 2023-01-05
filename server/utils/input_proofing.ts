import {
  parseStationId,
  parseDate,
  parseInteger,
  parseNumber,
  parseString,
  parseXCoordinate,
  parseYCoordinate,
} from '../../shared/parsers'
import { NewJourney, NewStation } from '../types'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewStation = (object: any): NewStation => {
  const createdNewStation: NewStation = {
    stationId: parseStationId(object.ID),
    nameInFinnish: parseString(object.Name),
    nameInSwedish: parseString(object.Namn),
    nameInEnglish: parseString(object.Name),
    addressInFinnish: parseString(object.Osoite),
    addressInSwedish: parseString(object.Adress),
    cityInFinnish: parseString(object.Kaupunki),
    cityInSwedish: parseString(object.Stad),
    operator: parseString(object.Operaattor),
    capacity: parseInteger(object.Kapasiteet),
    xCoordinate: parseXCoordinate(object.x),
    yCoordinate: parseYCoordinate(object.y),
  }

  return createdNewStation
}

export { toNewJourney, toNewStation }
