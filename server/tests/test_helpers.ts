/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
type CamelCaseObject = { [key: string]: any }

const transformSnakeCaseObjectToCamelCase = (object: any) => {
  const newObject: CamelCaseObject = {}

  for (const [key, value] of Object.entries(object)) {
    const keyInCamelCase = fromSnakeCaseToCamelCase(key)
    newObject[keyInCamelCase] = value
  }

  return newObject
}

const fromSnakeCaseToCamelCase = (text: string): string => {
  const splittedString = text.split('_')
  const formattedArray = splittedString.map((word, index) => {
    return index === 0 ? word : capitalizeFirstLetter(word)
  })
  const asString = formattedArray.join('')

  return asString
}

const capitalizeFirstLetter = (word: string): string => {
  const firstLetter = word[0].toUpperCase()
  const rest = word.slice(1).toLowerCase()
  const capitalizedWord = firstLetter.concat(rest)

  return capitalizedWord
}

const generateStationId = (n: number) => {
  let nAsString = n.toString()
  const howManyZeroes = 3 - nAsString.length

  for (let i = 0; i < howManyZeroes; i++) {
    nAsString = '0'.concat(nAsString)
  }

  return nAsString
}

export { transformSnakeCaseObjectToCamelCase, generateStationId }
