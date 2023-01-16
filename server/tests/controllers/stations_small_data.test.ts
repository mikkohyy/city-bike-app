/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import supertest, { Response } from 'supertest'
import { Station, Journey } from '../../models'
import app from '../../app'
const api = supertest(app)
import { sequelize } from '../../utils/db'
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

describe('Stations route with small dataset', () => {
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
        test('has the expected properties and values (test excludes station data)', () => {
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
  describe('Paging', () => {
    describe('GET /api/stations?page=0&pageSize=5', () => {
      let receivedData: Response
      const page = 0
      const pageSize = 5

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?page=${page}&pageSize=${pageSize}`
        )
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
            expect(keysInObject).toHaveLength(
              EXPECTED_RETURN_OBJECT_KEYS.length
            )
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
              expect(receivedData.body.data).toHaveLength(pageSize)
            })
            test('has expected stations', () => {
              const expectedStations =
                stationsInCamelCaseWithSetDatabaseId.slice(0, pageSize)

              for (const station of expectedStations) {
                expect(receivedData.body.data).toContainEqual(station)
              }
            })
          })
        })
      })
    })

    describe('GET /api/stations?page=2&pageSize=3', () => {
      let receivedData: Response
      const page = 2
      const pageSize = 3

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?page=${page}&pageSize=${pageSize}`
        )
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
            expect(keysInObject).toHaveLength(
              EXPECTED_RETURN_OBJECT_KEYS.length
            )
          })
          test('has the expected properties and values (excluding station data)', () => {
            const responseObject = receivedData.body

            const expectedObject: { [index: string]: unknown } = {
              totalNOfRows: 10,
              page: 2,
              pageSize: 3,
              nextPage: 3,
              totalPages: 4,
            }

            for (const key of Object.keys(responseObject)) {
              if (key !== 'data') {
                expect(responseObject[key]).toBe(expectedObject[key])
              }
            }
          })
          describe('data property', () => {
            test('has the expected length', () => {
              expect(receivedData.body.data).toHaveLength(pageSize)
            })
            test('has expected stations', () => {
              const expectedStations =
                stationsInCamelCaseWithSetDatabaseId.slice(6, 9)

              for (const station of expectedStations) {
                expect(receivedData.body.data).toContainEqual(station)
              }
            })
          })
        })
      })
    })
  })
  describe('Searching', () => {
    describe('GET /api/stations?search=keila&language=finnish (when the language is finnish)', () => {
      let receivedData: Response
      const page = 0
      const pageSize = 50
      const searchTerm = 'keila'
      const searchLanguage = 'finnish'

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?page=${page}&pageSize=${pageSize}&search=${searchTerm}&language=${searchLanguage}`
        )
      })

      test('responds with JSON', () => {
        expect(receivedData.type).toBe('application/json')
      })
      test('responds with status code 200', () => {
        expect(receivedData.statusCode).toBe(200)
      })

      test('returns expected number of stations', () => {
        expect(receivedData.body.data).toHaveLength(2)
      })

      test('expected stations are returned', () => {
        const expectedStationNames = ['Keilaniemi (M)', 'Keilaranta']
        const receivedStationNames = receivedData.body.data.map(
          (station: any) => {
            return station.nameInFinnish
          }
        )
        for (const station of expectedStationNames) {
          console.log(station)
          expect(receivedStationNames).toContain(station)
        }
      })
    })
    describe('GET /api/stations?search=kägel&language=swedish (when the language is swedish)', () => {
      let receivedData: Response
      const page = 0
      const pageSize = 50
      const searchTerm = 'kägel'
      const searchLanguage = 'swedish'

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?page=${page}&pageSize=${pageSize}&search=${searchTerm}&language=${searchLanguage}`
        )
      })

      test('responds with JSON', () => {
        expect(receivedData.type).toBe('application/json')
      })
      test('responds with status code 200', () => {
        expect(receivedData.statusCode).toBe(200)
      })

      test('has the expected length', () => {
        expect(receivedData.body.data).toHaveLength(2)
      })

      test('returns expected number of stations', () => {
        const expectedStationNames = ['Kägeludden (M)', 'Kägelstranden']
        const receivedStationNames = receivedData.body.data.map(
          (station: any) => {
            return station.nameInSwedish
          }
        )
        for (const station of expectedStationNames) {
          expect(receivedStationNames).toContain(station)
        }
      })
    })
    describe('GET /api/stations?search=keila&language=english (when the language is english)', () => {
      let receivedData: Response
      const page = 0
      const pageSize = 50
      const searchTerm = 'keila'
      const searchLanguage = 'english'

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?page=${page}&pageSize=${pageSize}&search=${searchTerm}&language=${searchLanguage}`
        )
      })

      test('responds with JSON', () => {
        expect(receivedData.type).toBe('application/json')
      })
      test('responds with status code 200', () => {
        expect(receivedData.statusCode).toBe(200)
      })

      test('returns expected number of stations', () => {
        expect(receivedData.body.data).toHaveLength(2)
      })

      test('expected stations are returned', () => {
        const expectedStationNames = ['Keilaniemi (M)', 'Keilaranta']
        const receivedStationNames = receivedData.body.data.map(
          (station: any) => {
            return station.nameInEnglish
          }
        )
        for (const station of expectedStationNames) {
          expect(receivedStationNames).toContain(station)
        }
      })
    })
  })

  describe('When user asks for too many resources at once', () => {
    let receivedData: Response
    const page = 0
    const pageSize = 10000
    const NEW_MAX_PAGE_SIZE = 1000

    beforeAll(async () => {
      process.env = {
        ...process.env,
        MAX_PAGE_SIZE: NEW_MAX_PAGE_SIZE.toString(),
      }

      receivedData = await api.get(
        `/api/stations?page=${page}&pageSize=${pageSize}`
      )
    })

    test('responds with 400', () => {
      expect(receivedData.statusCode).toBe(400)
    })
    test('responds with expected error', () => {
      const expectedObject = {
        error: `Page size should be smaller than or equal to ${NEW_MAX_PAGE_SIZE}.`,
      }
      const receivedObject = receivedData.body

      expect(receivedObject).toEqual(expectedObject)
    })
  })
})

afterAll(async () => {
  void (await sequelize.close())
})
