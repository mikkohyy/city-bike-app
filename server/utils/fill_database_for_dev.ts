import { Station, Journey } from '../models'
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import { connectToDatabase } from './db'
import path from 'path'
import { toNewStation, toNewJourney } from './input_proofing'
import { NewStation, NewJourney } from '../types'

const CHUNK_SIZE = 10000
const MIN_LENGTH = 10
const MIN_TIME = 10

const stationHeaders = [
  'FID',
  'ID',
  'Nimi',
  'Namn',
  'Name',
  'Osoite',
  'Adress',
  'Kaupunki',
  'Stad',
  'Operaattor',
  'Kapasiteet',
  'x',
  'y',
]

const journeyHeaders = [
  'Departure',
  'Return',
  'Departure station id',
  'Departure station name',
  'Return station id',
  'Return station name',
  'Covered distance (m)',
  'Duration (sec.)',
]

const getHeaders: { [key: string]: () => string[] } = {
  stations: () => {
    return stationHeaders
  },
  journeys: () => {
    return journeyHeaders
  },
}

const printErrorMessage = () => {
  console.log('Error: Missing arguments')
  console.log(
    'When adding stations: npm run dev:fill_database stations <path to source csv file>'
  )
  console.log(
    'When adding journeys: npm run dev:fill_database journeys <source csv file> <csv file of stations>'
  )
}

if (process.argv.length < 4) {
  printErrorMessage()
  process.exit(1)
}

const dataType = process.argv[2]

if (dataType === 'journeys' && process.argv.length < 5) {
  printErrorMessage()
  process.exit(1)
}

const fileName = process.argv[3]
const headers = getHeaders[dataType]()
const filePath = path.resolve(__dirname, fileName)

const fileContent = fs.readFileSync(filePath, {
  encoding: 'utf-8',
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const data = parse(fileContent, {
  delimiter: ',',
  columns: headers,
  from_line: 2,
})

if (dataType === 'stations') {
  const parsedStationData: NewStation[] = []

  for (const row of data) {
    try {
      const parsedStation = toNewStation(row)
      parsedStationData.push(parsedStation)
    } catch (error) {
      console.log(error)
    }
  }

  const addStationsToDatabase = async () => {
    await connectToDatabase()
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = parsedStationData.slice(i, i + CHUNK_SIZE)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await Station.bulkCreate(chunk as any[], { validate: true })
    }
  }

  void addStationsToDatabase()
} else if (dataType === 'journeys') {
  const stationsFileName = process.argv[4]
  const stationsHeaders = getHeaders['stations']()
  const stationsFilePath = path.resolve(__dirname, stationsFileName)

  const stationsFileContent = fs.readFileSync(stationsFilePath, {
    encoding: 'utf-8',
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const stationsData = parse(stationsFileContent, {
    delimiter: ',',
    columns: stationsHeaders,
    from_line: 2,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const stationIds: string[] = stationsData.map(
    (station: { ID: string }) => station.ID
  )

  const parsedJourneyData: NewJourney[] = []

  for (const row of data) {
    try {
      const parsedJourney = toNewJourney(row)
      if (
        stationIds.includes(parsedJourney.departureStationId) &&
        stationIds.includes(parsedJourney.returnStationId) &&
        parsedJourney.coveredDistanceInMeters >= MIN_LENGTH &&
        parsedJourney.durationInSeconds >= MIN_TIME
      ) {
        parsedJourneyData.push(parsedJourney)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addJourneysToDatabase = async () => {
    await connectToDatabase()
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = parsedJourneyData.slice(i, i + CHUNK_SIZE)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await Journey.bulkCreate(chunk as any[], { validate: true })
    }
  }

  void addJourneysToDatabase()
}

export {}
