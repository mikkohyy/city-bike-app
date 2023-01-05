import { StationId, YCoordinate, XCoordinate } from '../shared/types'

export interface NewJourney {
  departureTime: string
  returnTime: string
  departureStationId: StationId
  returnStationId: StationId
  coveredDistanceInMeters: number
  durationInSeconds: number
}

export interface NewStation {
  stationId: StationId
  nameInFinnish: string
  nameInSwedish: string
  nameInEnglish: string
  addressInFinnish: string
  addressInSwedish: string
  cityInFinnish: string
  cityInSwedish: string
  operator: string
  capacity: number
  yCoordinate: YCoordinate
  xCoordinate: XCoordinate
}
