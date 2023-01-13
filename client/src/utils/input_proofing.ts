import {
  parseInteger,
  parseStationId,
  parseString,
  parseXCoordinate,
  parseYCoordinate,
} from './parsers'
import { Station, GetStationsResponseData } from '../../types'
import { parseNextPage } from './parsers'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toStation = (object: any): Station => {
  try {
    const proofedStation: Station = {
      id: parseInteger(object.id),
      stationId: parseStationId(object.stationId),
      nameInFinnish: parseString(object.nameInFinnish),
      nameInSwedish: parseString(object.nameInSwedish),
      nameInEnglish: parseString(object.nameInEnglish),
      addressInFinnish: parseString(object.addressInFinnish),
      addressInSwedish: parseString(object.addressInSwedish),
      cityInFinnish: parseString(object.cityInFinnish),
      cityInSwedish: parseString(object.cityInSwedish),
      operator: parseString(object.operator),
      capacity: parseInteger(object.capacity),
      xCoordinate: parseXCoordinate(object.xCoordinate),
      yCoordinate: parseYCoordinate(object.yCoordinate),
    }

    return proofedStation
  } catch (error) {
    throw new Error('Data is not valid Station data')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toGetStationsResponseData = (object: any): GetStationsResponseData => {
  try {
    const proofedGetStationsReponseData: GetStationsResponseData = {
      data: object.data.map((maybeStation: unknown) => toStation(maybeStation)),
      page: parseInteger(object.page),
      pageSize: parseInteger(object.pageSize),
      totalNOfRows: parseInteger(object.totalNOfRows),
      totalPages: parseInteger(object.totalPages),
      nextPage: parseNextPage(object.nextPage),
    }

    return proofedGetStationsReponseData
  } catch (error) {
    throw new Error('Data is not valid GetStationsResponse data')
  }
}

export { toStation, toGetStationsResponseData }
