import { test, expect, describe } from '@jest/globals'
import {
  parseInteger,
  parseStationId,
  parseDate,
  parseString,
  parseNumber,
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

describe('parseInteger()', () => {
  describe('returns integer', () => {
    test("when parameter is '123'", () => {
      const parsedInteger = parseInteger('123')
      expect(parsedInteger).toBe(123)
    })
    test("when parameter is '0'", () => {
      const parsedInteger = parseInteger('0')
      expect(parsedInteger).toBe(0)
    })
  })
  describe('throws an error', () => {
    test("when parameter is 'undefined'", () => {
      expect(() => {
        parseInteger(undefined)
      }).toThrow(new Error('Value is missing or is not an integer'))
    })
    test("when data is 'null'", () => {
      expect(() => {
        parseInteger(null)
      }).toThrow(new Error('Value is missing or is not an integer'))
    })
    test("when parameter is '123.1'", () => {
      expect(() => {
        parseInteger('123.1')
      }).toThrow(new Error('Value is missing or is not an integer'))
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

describe('parseString()', () => {
  describe('returns string', () => {
    test('when valid string', () => {
      const parsedString = parseString('this is a string')
      expect(parsedString).toBe('this is a string')
    })
  })
  describe('throws an error', () => {
    test('when parameter is undefined', () => {
      expect(() => {
        parseString(undefined)
      }).toThrow(new Error('Value is missing or is not a string'))
    })
  })
})

describe('parseNumber()', () => {
  describe('returns a number', () => {
    test('when integer is represented in the string', () => {
      const parsedNumber = parseNumber('234')
      expect(parsedNumber).toBe(234)
    })
    test('when float is represented in the string', () => {
      const parsedNumber = parseNumber('234.56')
      expect(parsedNumber).toBe(234.56)
    })
  })
  describe('throws an error', () => {
    test('when parameter is undefined', () => {
      expect(() => {
        parseNumber(undefined)
      }).toThrow(new Error('Value is missing or not a number'))
    })
    test('when parameter does not represent a number', () => {
      expect(() => {
        parseNumber('2c5')
      }).toThrow(new Error('Value is missing or not a number'))
    })
  })
})
