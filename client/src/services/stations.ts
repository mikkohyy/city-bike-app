import axios from 'axios'
const baseRoute = '/api/stations'

const getStations = async (page: number, pageSize: number) => {
  const foundStations = await axios.get(
    `${baseRoute}?page=${page}&pageSize=${pageSize}`
  )

  return foundStations.data
}

export { getStations }
