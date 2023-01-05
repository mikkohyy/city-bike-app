/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { connectToDatabase } from './db'
import { Station, Journey } from '../models'
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import path from 'path'
import { toNewJourney } from './input_proofing'
import { NewJourney } from '../types'

const how = process.argv[2]

const stationCsvFilePath = path.resolve(__dirname, '../dev_data/stations.csv')
const mayJourneysFilePath = path.resolve(__dirname, '../dev_data/2021-05.csv')
// const juneJourneysFilePath = path.resolve(__dirname, '../dev_data/2021-06.csv')
// const julyJourneysFilePath = path.resolve(__dirname, '../dev_data/2021-05.csv')

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

const stationsFileContent = fs.readFileSync(stationCsvFilePath, {
  encoding: 'utf-8',
})

const mayJourneysFileContent = fs.readFileSync(mayJourneysFilePath, {
  encoding: 'utf-8',
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const stationData = parse(stationsFileContent, {
  delimiter: ',',
  columns: stationHeaders,
  from_line: 2,
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
const formattedStationData = stationData.map((station: any) => {
  return {
    stationId: station.ID,
    nameInFinnish: station.Name,
    nameInSwedish: station.Namn,
    nameInEnglish: station.Name,
    addressInFinnish: station.Osoite,
    addressInSwedish: station.Adress,
    cityInFinnish: station.Osoite,
    cityInSwedish: station.Stad,
    operator: station.Operaattor,
    capacity: station.Kapasiteet,
    xCoordinate: station.x,
    yCoordinate: station.y,
  }
})

const getFormattedJourneyData = (fileContent: string): NewJourney[] => {
  const journeyDataNow: NewJourney[] = []
  const journeysData: [] = parse(fileContent, {
    delimiter: ',',
    columns: journeyHeaders,
    from_line: 2,
  })

  for (const journey of journeysData) {
    try {
      const formattedJourney = toNewJourney(journey)
      journeyDataNow.push(formattedJourney)
    } catch (error) {
      console.log(error)
    }
  }

  return journeyDataNow
}

const formattedMayJourneysData = getFormattedJourneyData(mayJourneysFileContent)

const addStationsToDatabase = async () => {
  await connectToDatabase()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await Station.bulkCreate(formattedStationData, { validate: true })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addJourneysToDatabase = async (data: any) => {
  await connectToDatabase()
  const chunkSize = 100
  for (let i = 0; i < data.length; i += chunkSize) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const chunk = data.slice(i, i + chunkSize)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await Journey.bulkCreate(chunk, { validate: true })
  }
}

if (how !== 'journeys-o') {
  void addStationsToDatabase()
}

if (how !== 'stations') {
  void addJourneysToDatabase(formattedMayJourneysData)
}

export {}
