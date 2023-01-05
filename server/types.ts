export type StationId = string

export interface NewJourney {
  departureTime: string
  returnTime: string
  departureStationId: string
  returnStationId: StationId
  coveredDistanceInMeters: number
  durationInSeconds: number
}
