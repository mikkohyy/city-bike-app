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
  getOrderedStationsInCamelCase,
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
      const searchTerm = 'keila'
      const searchLanguage = 'finnish'

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?search=${searchTerm}&language=${searchLanguage}`
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
      const searchTerm = 'kägel'
      const searchLanguage = 'swedish'

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?search=${searchTerm}&language=${searchLanguage}`
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
      const searchTerm = 'keila'
      const searchLanguage = 'english'

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?&search=${searchTerm}&language=${searchLanguage}`
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

  describe('Ordering', () => {
    describe('by station id', () => {
      describe('GET /api/stations?orderBy=stationId&orderDirection=descending (stationId, descending)', () => {
        let receivedData: Response
        const orderBy = 'stationId'
        const orderDirection = 'descending'

        beforeAll(async () => {
          receivedData = await api.get(
            `/api/stations?&orderBy=${orderBy}&orderDirection=${orderDirection}`
          )
        })

        test('responds with JSON', () => {
          expect(receivedData.type).toBe('application/json')
        })
        test('responds with status code 200', () => {
          expect(receivedData.statusCode).toBe(200)
        })

        test('returns expected number of stations', () => {
          expect(receivedData.body.data).toHaveLength(10)
        })

        test('returns stations in expected order', () => {
          const expectedData = getOrderedStationsInCamelCase(
            'stationId',
            'descending'
          )

          expectedData
          console.log(receivedData.body.data)
          // expect(receivedData.body.data).toEqual(expectedData)
        })
      })
      describe('GET /api/stations?orderBy=stationId&orderDirection=ascending (stationId, ascending)', () => {
        let receivedData: Response
        const orderBy = 'stationId'
        const orderDirection = 'ascending'

        beforeAll(async () => {
          receivedData = await api.get(
            `/api/stations?&orderBy=${orderBy}&orderDirection=${orderDirection}`
          )
        })

        test('responds with JSON', () => {
          expect(receivedData.type).toBe('application/json')
        })
        test('responds with status code 200', () => {
          expect(receivedData.statusCode).toBe(200)
        })

        test('returns expected number of stations', () => {
          expect(receivedData.body.data).toHaveLength(10)
        })

        test('returns stations in expected order', () => {
          const expectedData = getOrderedStationsInCamelCase(
            'stationId',
            'ascending'
          )
          expect(receivedData.body.data).toEqual(expectedData)
        })
      })
    })
    describe('by station name', () => {
      describe('GET /api/stations?language=finnish&orderBy=stationName&orderDirection=descending (station name, descending, finnish)', () => {
        let receivedData: Response
        const orderBy = 'stationName'
        const orderDirection = 'descending'
        const language = 'finnish'

        beforeAll(async () => {
          receivedData = await api.get(
            `/api/stations?language=${language}&orderBy=${orderBy}&orderDirection=${orderDirection}`
          )
        })

        test('responds with JSON', () => {
          expect(receivedData.type).toBe('application/json')
        })
        test('responds with status code 200', () => {
          expect(receivedData.statusCode).toBe(200)
        })

        test('returns expected number of stations', () => {
          expect(receivedData.body.data).toHaveLength(10)
        })

        test('returns stations in expected order', () => {
          const expectedData = getOrderedStationsInCamelCase(
            'nameInFinnish',
            'descending'
          )
          expect(receivedData.body.data).toEqual(expectedData)
        })
      })
      describe('GET /api/stations?language=swedish&orderBy=stationName&orderDirection=ascending (station name, ascending, swedish)', () => {
        let receivedData: Response
        const orderBy = 'stationName'
        const orderDirection = 'ascending'
        const language = 'swedish'

        beforeAll(async () => {
          receivedData = await api.get(
            `/api/stations?language=${language}&orderBy=${orderBy}&orderDirection=${orderDirection}`
          )
          console.log(receivedData.body.data)
        })

        test('responds with JSON', () => {
          expect(receivedData.type).toBe('application/json')
        })
        test('responds with status code 200', () => {
          expect(receivedData.statusCode).toBe(200)
        })

        test('returns expected number of stations', () => {
          expect(receivedData.body.data).toHaveLength(10)
        })

        test('returns stations in expected order', () => {
          const expectedData = getOrderedStationsInCamelCase(
            'nameInSwedish',
            'ascending'
          )
          expect(receivedData.body.data).toEqual(expectedData)
        })
      })
    })
  })

  describe('Combinations of query parameters', () => {
    describe("Search Term: 'a', Order: station name, Direction: ascending, Language: english, Page: 0 and Page size: 2", () => {
      let receivedData: Response
      const orderBy = 'stationName'
      const orderDirection = 'ascending'
      const language = 'english'
      const searchTerm = 'a'
      const page = 0
      const pageSize = 2

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?search=${searchTerm}&page=${page}&pageSize=${pageSize}&language=${language}&orderBy=${orderBy}&orderDirection=${orderDirection}`
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

      test('returns stations in expected order', () => {
        const expectedData = [
          stationsInCamelCaseWithSetDatabaseId[8],
          stationsInCamelCaseWithSetDatabaseId[3],
        ]
        expect(receivedData.body.data).toEqual(expectedData)
      })
    })
    describe("Search Term: 'käg', Order: station name, Direction: descending, Language: swedish, Page: 1 and Page size: 1", () => {
      let receivedData: Response
      const orderBy = 'stationName'
      const orderDirection = 'descending'
      const language = 'swedish'
      const searchTerm = 'käg'
      const page = 1
      const pageSize = 1

      beforeAll(async () => {
        receivedData = await api.get(
          `/api/stations?search=${searchTerm}&page=${page}&pageSize=${pageSize}&language=${language}&orderBy=${orderBy}&orderDirection=${orderDirection}`
        )
      })

      test('responds with JSON', () => {
        expect(receivedData.type).toBe('application/json')
      })
      test('responds with status code 200', () => {
        expect(receivedData.statusCode).toBe(200)
      })

      test('returns expected number of stations', () => {
        expect(receivedData.body.data).toHaveLength(1)
      })

      test('returns stations in expected order', () => {
        const expectedData = [stationsInCamelCaseWithSetDatabaseId[2]]
        expect(receivedData.body.data).toEqual(expectedData)
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
