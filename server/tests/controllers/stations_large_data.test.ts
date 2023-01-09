/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, describe } from '@jest/globals'
import { resetDatabase } from '../database_manipulation'
import supertest, { Response } from 'supertest'
import { Station, Journey } from '../../models'
import app from '../../app'
const api = supertest(app)
import { sequelize } from '../../utils/db'
const queryInterface = sequelize.getQueryInterface()
import { generateStationId } from '../test_helpers'

const N_OF_STATIONS = 1000

const generateStations = (nOfStations: number): object[] => {
  const stations: object[] = []
  for (let i = 0; i < nOfStations; i++) {
    const newStation = {
      id: i + 1,
      station_id: generateStationId(i),
      name_in_finnish: 'Hanasaari',
      name_in_swedish: 'Hanaholmen',
      name_in_english: 'Hanasaari',
      address_in_finnish: 'Hanasaarenranta 1',
      address_in_swedish: 'Hanaholmsstranden 1',
      city_in_finnish: 'Espoo',
      city_in_swedish: 'Esbo',
      operator: 'CityBike Finland',
      capacity: 10,
      y_coordinate: 24.840319,
      x_coordinate: 60.16582,
    }
    stations.push(newStation)
  }

  return stations
}

const prepareDatabase = async () => {
  await Station.sync()
  await Journey.sync()
  await sequelize.query(
    `ALTER SEQUENCE "stations_id_seq" RESTART WITH ${N_OF_STATIONS + 1}`
  )
  await queryInterface.bulkInsert('stations', generateStations(N_OF_STATIONS))
}

beforeAll(async () => {
  await resetDatabase(queryInterface)
  await prepareDatabase()
})

describe('Stations route with larger dataset (n = 1000)', () => {
  describe('GET /api/stations (no parameters)', () => {
    let receivedData: Response

    beforeAll(async () => {
      receivedData = await api.get('/api/stations')
    })

    test('has the expected properties and values (test excludes station data)', () => {
      const responseObject = receivedData.body

      const expectedObject: { [index: string]: unknown } = {
        totalNOfRows: N_OF_STATIONS,
        page: 0,
        pageSize: 50,
        nextPage: 1,
        totalPages: 20,
      }

      for (const key of Object.keys(responseObject)) {
        if (key !== 'data') {
          expect(responseObject[key]).toBe(expectedObject[key])
        }
      }
    })
    test('stations in data property has expected length', () => {
      expect(receivedData.body.data).toHaveLength(50)
    })
  })

  describe('GET /api/stations?page=0&size=2000', () => {
    const NEW_MAX_PAGE_SIZE = 2000

    process.env = {
      ...process.env,
      MAX_PAGE_SIZE: NEW_MAX_PAGE_SIZE.toString(),
    }

    let receivedData: Response
    beforeAll(async () => {
      receivedData = await api.get('/api/stations?page=0&size=2000')
    })

    test('has the expected properties and values (test excludes station data)', () => {
      const responseObject = receivedData.body

      const expectedObject: { [index: string]: unknown } = {
        totalNOfRows: N_OF_STATIONS,
        page: 0,
        pageSize: 2000,
        nextPage: null,
        totalPages: 1,
      }

      for (const key of Object.keys(responseObject)) {
        if (key !== 'data') {
          expect(responseObject[key]).toBe(expectedObject[key])
        }
      }
    })
    test('stations in data property has expected length', () => {
      expect(receivedData.body.data).toHaveLength(N_OF_STATIONS)
    })
  })
})

afterAll(async () => {
  void (await sequelize.close())
})
