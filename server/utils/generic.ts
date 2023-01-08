import { parseInteger } from '../../shared/parsers'

const getIntegerParameter = (maybeInteger: unknown): number | null => {
  let value
  try {
    value = parseInteger(maybeInteger)
  } catch (error) {
    value = null
  }

  return value
}

export { getIntegerParameter }
