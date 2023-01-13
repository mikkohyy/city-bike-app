export type StationId = string

export type XCoordinate = number

export type YCoordinate = number

export type LanguageContextType = {
  languageChoices: Language[]
  selectedLanguage: Language
  stationNameKey: string
  stationAddressKeyName: string
  cityNameKey: string
  setLanguage(language: Language): void
  defaultLanguage: Language
}

export type Language = 'Finnish' | 'Swedish' | 'English'

export interface Station {
  [key: string]: StationId | string | number | YCoordinate | XCoordinate
  id: number
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

export type NewStation = Omit<Station, 'id'>

export type NextPage = number | null

export interface GetStationsResponseData {
  data: Station[]
  page: number
  pageSize: number
  totalNOfRows: number
  totalPages: number
  nextPage: NextPage
}
