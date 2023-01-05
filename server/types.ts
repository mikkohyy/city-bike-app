export type StationId = string

export type XCoordinate = number

export type YCoordinate = number

export interface NewJourney {
  departureTime: string
  returnTime: string
  departureStationId: StationId
  returnStationId: StationId
  coveredDistanceInMeters: number
  durationInSeconds: number
}

export interface NewStation {

}

    stationId: station.ID,
    nameInFinnish: station.Name,
    nameInSwedish: station.Namn,
    nameInEnglish: station.Name,
    addressInFinnish: station.Osoite,
    addressInSwedish: station.Adress,
    addressInFinnish: station.Osoite,
    cityInFinnish: station.Kaupunki,
    cityInSwedish: station.Stad,
    operator: station.Operaattor,
    capacity: station.Kapasiteet,
    xCoordinate: station.x,
    yCoordinate: station.y,