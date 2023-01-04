import { test, expect, describe } from '@jest/globals'
import {
  parseIntegerId,
  parseStationId,
  parseDate,
} from '../../../shared/parsers'

describe('parseDate()', () => {
  describe('returns expected string that represents a date', () => {
    test("when parameter is '2021-05-31T23:57:25'", () => {
      const parsedDate = parseDate('2021-05-31T23:57:25')
      expect(parsedDate).toBe('2021-05-31T23:57:25')
    })
  })
  describe('throws an expection', () => {
    test('when parameter is not a valid date representation', () => {
      expect(() => {
        parseDate('not a date representation')
      }).toThrow(new Error('Date is missing or invalid'))
    })
  })
})

describe('parseIntegerId()', () => {
  describe('returns integer', () => {
    test("when parameter is '123'", () => {
      const parsedInteger = parseIntegerId('123')
      expect(parsedInteger).toBe(123)
    })
    test("when parameter is '0'", () => {
      const parsedInteger = parseIntegerId('0')
      expect(parsedInteger).toBe(0)
    })
  })
  describe('throws an error', () => {
    test("when parameter is 'undefined'", () => {
      expect(() => {
        parseIntegerId(undefined)
      }).toThrow(new Error('Id is missing or invalid'))
    })
    test("when data is 'null'", () => {
      expect(() => {
        parseIntegerId(null)
      }).toThrow(new Error('Id is missing or invalid'))
    })
    test("when parameter is '123.1'", () => {
      expect(() => {
        parseIntegerId('123.1')
      }).toThrow(new Error('Id is missing or invalid'))
    })
  })
})

describe('parseStationId()', () => {
  describe('returns station id', () => {
    test('when parameter is three numbers', () => {
      const parsedStationId = parseStationId('123')
      expect(parsedStationId).toBe('123')
    })
  })
  describe('throws an error', () => {
    test('when parameter is two numbers', () => {
      expect(() => {
        parseStationId('12')
      }).toThrow(new Error('Station id is missing or invalid'))
    })
  })
})
