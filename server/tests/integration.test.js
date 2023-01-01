const {
  getLastIdOfStations,
  stationsInSnakeCaseWithSetDatabaseId,
} = require('./test_data')
const { resetDatabase } = require('./database_manipulation')
const supertest = require('supertest')
const { Station } = require('../models')
const app = require('../app')
const api = supertest(app)

const { sequelize } = require('../utils/db')
const queryInterface = sequelize.getQueryInterface()

// Logging SQL commands while testing is set off, to enable set this to true
sequelize.options.logging = false

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
  sequelize.close()
})

test('test', async () => {
  const response = await api.get('/api/test')
  const responseData = response.body
  const expectedData = { data: 'response' }
  expect(responseData).toEqual(expectedData)
})
