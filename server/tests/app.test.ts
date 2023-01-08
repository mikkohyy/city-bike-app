/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { resetDatabase } from './database_manipulation'
import { expect, describe } from '@jest/globals'
import supertest, { Response } from 'supertest'
import app from '../app'
const api = supertest(app)
import { sequelize } from '../utils/db'
const queryInterface = sequelize.getQueryInterface()
import { Station, Journey } from '../models'

const prepareDatabase = async () => {
  await Station.sync()
  await Journey.sync()
}

beforeAll(async () => {
  await resetDatabase(queryInterface)
  await prepareDatabase()
})

describe('When unknown endpoint', () => {
  let receivedData: Response
  beforeAll(async () => (receivedData = await api.get('/not_existing')))

  test('responds with 404', () => {
    expect(receivedData.statusCode).toBe(404)
  })

  test('to have expected error message', () => {
    const expectedObject = { error: 'Unknown endpoint' }
    const responseObject = receivedData.body

    expect(responseObject).toEqual(expectedObject)
  })
})

afterAll(async () => {
  void (await sequelize.close())
})
