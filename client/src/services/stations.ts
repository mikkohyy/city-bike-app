import { Language } from '../../types'
import axios from 'axios'
const baseRoute = '/api/stations'

const getStations = async (
  page: number,
  pageSize: number,
  orderBy: string,
  orderDirection: string,
  language: Language,
  searchTerm?: string
) => {
  let parameterString = `
    ${baseRoute}?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderDirection=${orderDirection}&language=${language}
  `

  if (searchTerm) {
    parameterString = parameterString.concat(`&search=${searchTerm}`)
  }

  const foundStations = await axios.get(parameterString)

  return foundStations.data
}

export { getStations }
