/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@jest/globals'

import {
  getLastIdOfStations,
  stationsInSnakeCaseWithSetDatabaseId,
} from './test_data'
import { resetDatabase } from './database_manipulation'
import supertest from 'supertest'
import { Station } from '../models'
import app from '../app'
const api = supertest(app)
import { sequelize } from '../utils/db'
const queryInterface = sequelize.getQueryInterface()

beforeAll(async () => {
  await resetDatabase(queryInterface)
})

beforeEach(async () => {
  await Station.sync()
  await sequelize.query(
    `ALTER SEQUENCE "stations_id_seq" RESTART WITH ${getLastIdOfStations() + 1}`
  )
  await queryInterface.bulkInsert(
    'stations',
    stationsInSnakeCaseWithSetDatabaseId
  )
})

afterAll(async () => {
  void (await sequelize.close())
})

test('test', async () => {
  const response = await api.get('/api/test')
  const responseData = response.body
  const expectedData = { data: 'response' }
  expect(responseData).toEqual(expectedData)
})
