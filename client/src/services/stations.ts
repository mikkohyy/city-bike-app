import { Language } from '../../types'
import axios from 'axios'
const baseRoute = '/api/stations'

const getStations = async (
  page: number,
  pageSize: number,
  searchTerm?: string,
  language?: Language
) => {
  let parameterString = `${baseRoute}?page=${page}&pageSize=${pageSize}`

  if (searchTerm && language) {
    parameterString = parameterString.concat(
      `&search=${searchTerm}&language=${language.toLowerCase()}`
    )
  }

  const foundStations = await axios.get(parameterString)

  return foundStations.data
}

export { getStations }
