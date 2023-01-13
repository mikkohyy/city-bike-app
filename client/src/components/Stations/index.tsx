import { useEffect, useState } from 'react'
import useLanguageSelector from '../../hooks/useLanguageSelector'
import { LanguageContextType } from '../../../types'
import { getStations } from '../../services/stations'
import { GetStationsResponseData } from '../../../types'
import { toGetStationsResponseData } from '../../utils/input_proofing'

const Stations = () => {
  const { stationNameKey }: LanguageContextType = useLanguageSelector()
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
      {stationsData ? (
        stationsData.data.map((station) => {
          return (
            <div key={station.stationId}>
              <h1>
                {station.stationId} {station[stationNameKey]}
              </h1>
            </div>
          )
        })
      ) : (
        <div>Loading..</div>
      )}
    </div>
  )
}

export default Stations
