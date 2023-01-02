/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { connectToDatabase } from './db'
import { Station } from '../models'
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import path from 'path'

const csvFilePath = path.resolve(__dirname, '../dev_data/stations.csv')
const headers = [
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

const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' })

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const stationData = parse(fileContent, {
  delimiter: ',',
  columns: headers,
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

const addToDatabase = async () => {
  await connectToDatabase()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await Station.bulkCreate(formattedStationData, { validate: true })
}

void addToDatabase()

export {}
