import { parseInteger, parseString } from '../../shared/parsers'

const getIntegerParameter = (maybeInteger: unknown): number | undefined => {
  let value
  try {
    value = parseInteger(maybeInteger)
  } catch (error) {
    value = undefined
  }

  return value
}

const getStringParameter = (maybeString: unknown): string | undefined => {
  let value
  try {
    value = parseString(maybeString)
  } catch (error) {
    value = undefined
  }

  return value
}

export { getIntegerParameter, getStringParameter }
