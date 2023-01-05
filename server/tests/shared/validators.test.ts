import { test, expect, describe } from '@jest/globals'
import {
  isInteger,
  isString,
  isStationId,
  isDate,
  isNumber,
} from '../../../shared/validators'

describe('isDate()', () => {
  describe('returns true', () => {
    test('when the string represents a date', () => {
      const result = isDate('2021-05-31T23:57:25')
      expect(result).toBe(true)
    })
  })
  describe('returns false', () => {
    test('when the string does not represent a date', () => {
      const result = isDate('not a date string')
      expect(result).toBe(false)
    })
  })
})

describe('isInteger()', () => {
  describe('returns true', () => {
    test('when the string represents an integer', () => {
      const result = isInteger('123')
      expect(result).toBe(true)
    })
  })
  describe('returns false', () => {
    test('when the string represents a float', () => {
      const result = isInteger(123.3)
      expect(result).toBe(false)
    })
  })
})

describe('isString()', () => {
  describe('returns true', () => {
    test('when string', () => {
      const result = isString('this is a string')
      expect(result).toBe(true)
    })
  })
  describe('returns false', () => {
    test('when not string', () => {
      const result = isString(['this is a string but inside an array'])
      expect(result).toBe(false)
    })
  })
})

describe('isStationId()', () => {
  describe('returns true', () => {
    test('when three numbers between 0-9', () => {
      const result = isStationId('023')
      expect(result).toBe(true)
    })
  })
  describe('returns false', () => {
    test('when two numbers between 0-9', () => {
      const result = isStationId('12')
      expect(result).toBe(false)
    })
    test('when four numbers between 0-9', () => {
      const result = isStationId('1234')
      expect(result).toBe(false)
    })
    test('when the string has a letter', () => {
      const result = isStationId('12a')
      expect(result).toBe(false)
    })
  })
})

describe('isNumber()', () => {
  describe('returns true', () => {
    test('when integer', () => {
      const result = isNumber('123')
      expect(result).toBe(true)
    })
    test('when float', () => {
      const result = isNumber('123.4')
      expect(result).toBe(true)
    })
  })
  describe('returns false', () => {
    test('when not an integer', () => {
      const result = isNumber('24a')
      expect(result).toBe(false)
    })
    test('when Infinity', () => {
      const result = isNumber(Infinity)
      expect(result).toBe(false)
    })
  })
})
