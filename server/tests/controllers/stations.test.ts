/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, describe } from '@jest/globals'
import {
  stationsInSnakeCaseWithSetDatabaseId,
  stationsInCamelCaseWithSetDatabaseId,
  getLastIdOfStations,
  journeysInSnakeCaseWithSetDatabaseId,
  getLastIdOfJourneys,
} from '../test_data'

import { resetDatabase } from '../database_manipulation'
import supertest from 'supertest'
import { Station, Journey } from '../../models'
import app from '../../app'
const api = supertest(app)
import { sequelize } from '../../utils/db'
import { Response } from 'superagent'
const queryInterface = sequelize.getQueryInterface()

const EXPECTED_RETURN_OBJECT_KEYS = [
  'totalNOfRows',
  'page',
  'pageSize',
  'nextPage',
  'totalPages',
  'data',
]

beforeAll(async () => {
  await resetDatabase(queryInterface)
  await prepareDatabase()
})

const prepareDatabase = async () => {
  await Station.sync()
  await Journey.sync()
  await sequelize.query(
    `ALTER SEQUENCE "stations_id_seq" RESTART WITH ${getLastIdOfStations() + 1}`
  )
  await sequelize.query(
    `ALTER SEQUENCE "journeys_id_seq" RESTART WITH ${getLastIdOfJourneys() + 1}`
  )
  await queryInterface.bulkInsert(
    'stations',
    stationsInSnakeCaseWithSetDatabaseId
  )
  await queryInterface.bulkInsert(
    'journeys',
    journeysInSnakeCaseWithSetDatabaseId
  )
}

describe('Stations route', () => {
  describe('GET /api/stations (no parameters) ', () => {
    let receivedData: Response

    beforeAll(async () => {
      receivedData = await api.get('/api/stations')
    })

    describe('if successful', () => {
      test('responds with JSON', () => {
        expect(receivedData.type).toBe('application/json')
      })
      test('responds with status code 200', () => {
        expect(receivedData.statusCode).toBe(200)
      })
      describe('response object', () => {
        test('has the right number of properties', () => {
          const keysInObject = Object.keys(receivedData.body)
          expect(keysInObject).toHaveLength(EXPECTED_RETURN_OBJECT_KEYS.length)
        })
        test('has the expected properties and values (excluding station data)', () => {
          const responseObject = receivedData.body

          const expectedObject: { [index: string]: unknown } = {
            totalNOfRows: 10,
            page: 0,
            pageSize: 50,
            nextPage: null,
            totalPages: 1,
          }

          for (const key of Object.keys(responseObject)) {
            if (key !== 'data') {
              expect(responseObject[key]).toBe(expectedObject[key])
            }
          }
        })
        describe('stations in data property', () => {
          test('has the expected length', () => {
            expect(receivedData.body.data).toHaveLength(
              stationsInCamelCaseWithSetDatabaseId.length
            )
          })
          test('has expected stations', () => {
            for (const station of stationsInCamelCaseWithSetDatabaseId) {
              expect(receivedData.body.data).toContainEqual(station)
            }
          })
        })
      })
    })
  })
  describe('GET /api/stations?page=0&limit=5', () => {
    let receivedData: Response
    const page = 0
    const size = 5

    beforeAll(async () => {
      receivedData = await api.get(`/api/stations?page=${page}&size=${size}`)
    })

    describe('if successful', () => {
      test('responds with JSON', () => {
        expect(receivedData.type).toBe('application/json')
      })
      test('responds with status code 200', () => {
        expect(receivedData.statusCode).toBe(200)
      })
      describe('reponse object', () => {
        test('has the expected number of keys', () => {
          const keysInObject = Object.keys(receivedData.body)
          expect(keysInObject).toHaveLength(EXPECTED_RETURN_OBJECT_KEYS.length)
        })
        test('has the expected properties and values (excluding station data)', () => {
          const responseObject = receivedData.body

          const expectedObject: { [index: string]: unknown } = {
            totalNOfRows: 10,
            page: 0,
            pageSize: 5,
            nextPage: 1,
            totalPages: 2,
          }

          for (const key of Object.keys(responseObject)) {
            if (key !== 'data') {
              expect(responseObject[key]).toBe(expectedObject[key])
            }
          }
        })
        describe('data property', () => {
          test('has the expected length', () => {
            expect(receivedData.body.data).toHaveLength(size)
          })
          test('has expected stations', () => {
            const expectedStations = stationsInCamelCaseWithSetDatabaseId.slice(
              0,
              size
            )

            for (const station of expectedStations) {
              expect(receivedData.body.data).toContainEqual(station)
            }
          })
        })
      })
    })
  })
})

afterAll(async () => {
  void (await sequelize.close())
})
