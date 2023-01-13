import { test, expect, describe } from '@jest/globals'
import {
  isInteger,
  isString,
  isStationId,
  isDate,
  isNumber,
  isXCoordinate,
  isYCoordinate,
  isNextPage,
} from '../../utils/validators'

describe('isNextPage()', () => {
  describe('returns true', () => {
    test('when value is null', () => {
      const isANextPage = isNextPage(null)
      expect(isANextPage).toBe(true)
    })
    test('when value is an integer', () => {
      const isANextPage = isNextPage(12)
      expect(isANextPage).toBe(true)
    })
  })
  describe('returns false', () => {
    test('when value is undefined', () => {
      const isANextPage = isNextPage(undefined)
      expect(isANextPage).toBe(false)
    })
    test('when value is an array', () => {
      const isANextPage = isNextPage([12])
      expect(isANextPage).toBe(false)
    })
    test('when value is a float', () => {
      const isANextPage = isNextPage(12.1)
      expect(isANextPage).toBe(false)
    })
  })
})

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

describe('isXCoordinate()', () => {
  describe('returns true', () => {
    test('when positive and between -180 and 180', () => {
      const result = isXCoordinate(24.810688)
      expect(result).toBe(true)
    })
    test('when negative and between -180 and 180', () => {
      const result = isXCoordinate(-24.810688)
      expect(result).toBe(true)
    })
  })
  describe('returns false', () => {
    test('when value is over 180', () => {
      const result = isXCoordinate(180.810688)
      expect(result).toBe(false)
    })
    test('when value is under -180', () => {
      const result = isXCoordinate(-180.810688)
      expect(result).toBe(false)
    })
  })
})

describe('isYCoordinate()', () => {
  describe('returns true', () => {
    test('when positive and between -90 and 90', () => {
      const result = isYCoordinate(60.171551)
      expect(result).toBe(true)
    })
    test('when negativeand between -90 and 90', () => {
      const result = isYCoordinate(-60.171551)
      expect(result).toBe(true)
    })
  })
  describe('returns false', () => {
    test('when value is over 90', () => {
      const result = isYCoordinate(90.810688)
      expect(result).toBe(false)
    })
    test('when value is under -90', () => {
      const result = isYCoordinate(-90.810688)
      expect(result).toBe(false)
    })
  })
})
