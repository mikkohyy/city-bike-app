import { useEffect, useState } from 'react'
import { getStations } from '../../services/stations'
import { GetStationsResponseData } from '../../../types'
import { toGetStationsResponseData } from '../../utils/input_proofing'
import Header from './Header'
import Body from './Body'

const Stations = () => {
  const [stationsData, setStationsData] = useState<
    GetStationsResponseData | undefined
  >(undefined)

  const fetchStations = async () => {
    try {
      const receivedData = await getStations(0, 50)
      setStationsData(toGetStationsResponseData(receivedData))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStations()
  }, [])

  return (
    <div>
      <Header />
      {stationsData ? <Body data={stationsData.data} /> : <div>Loading..</div>}
    </div>
  )
}

export default Stations
