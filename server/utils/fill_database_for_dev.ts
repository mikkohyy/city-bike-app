const { connectToDatabase } = require('./db')
const { Station } = require('../models')

const fs = require('fs')
const { parse } = require('csv-parse/sync')
const path = require('path')

/*
type Stations = {
  FID: number
  ID: number
  Nimi: string
  Namn: string
  Name: string
  Osoite: string
  Adress: string
  Kaupunki: string
  Stad: string
  Operaattor: string
  Kapasiteet: string
  x: number
  y: number
}
*/

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

const stationData = parse(fileContent, {
  delimiter: ',',
  columns: headers,
  from_line: 2,
})

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
  await Station.bulkCreate(formattedStationData, { validate: true })
}

addToDatabase()

export {}
