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
      describe('returned array', () => {
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

afterAll(async () => {
  void (await sequelize.close())
})
