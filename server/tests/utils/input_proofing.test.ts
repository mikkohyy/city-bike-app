import { test, describe, expect } from '@jest/globals'
import { toNewJourney } from '../../utils/input_proofing'
import { NewJourney } from '../../types'

describe('toNewJourney()', () => {
  test('returns expected object when data is valid', () => {
    const rawData = {
      Departure: '2021-05-31T23:57:25',
      Return: '2021-06-01T00:05:46',
      'Departure station id': '094',
      'Departure station name': 'Laajalahden aukio',
      'Return station id': '100',
      'Return station name': 'Teljäntie',
      'Covered distance (m)': '2043.45',
      'Duration (sec.)': '500',
    }

    const expectedObject: NewJourney = {
      departureTime: '2021-05-31T23:57:25',
      returnTime: '2021-06-01T00:05:46',
      departureStationId: '094',
      returnStationId: '100',
      coveredDistanceInMeters: 2043,
      durationInSeconds: 500,
    }

    const returnedObject: NewJourney = toNewJourney(rawData)

    expect(returnedObject).toEqual(expectedObject)
  })
  test('throws an error when data is invalid', () => {
    const rawData = {
      Departure: '2021-05-31T23:57:k',
      Return: '2021-06-01T00:05:46',
      'Departure station id': '094',
      'Departure station name': 'Laajalahden aukio',
      'Return station id': '100',
      'Return station name': 'Teljäntie',
      'Covered distance (m)': '2043',
      'Duration (sec.)': '500',
    }

    expect(() => {
      toNewJourney(rawData)
    }).toThrow()
  })
})
