import { useEffect, useState } from 'react'
import { getStations } from '../../services/stations'
import { GetStationsResponseData } from '../../../types'
import { toGetStationsResponseData } from '../../utils/input_proofing'
import Header from './Header'
import Body from './Body'
import Paginator from '../Generic/Paginator'

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

  const handlePageChange = async (pageToBeMovedTo: number) => {
    try {
      const receivedData = await getStations(pageToBeMovedTo, 50)
      setStationsData(toGetStationsResponseData(receivedData))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {stationsData ? (
        <div>
          <Paginator
            page={stationsData.page}
            pageSize={stationsData.pageSize}
            totalNOfRows={stationsData.totalNOfRows}
            nextPage={stationsData.nextPage}
            handlePageChange={handlePageChange}
          />
          <Header />
          <Body data={stationsData.data} />
          <Paginator
            page={stationsData.page}
            pageSize={stationsData.pageSize}
            totalNOfRows={stationsData.totalNOfRows}
            nextPage={stationsData.nextPage}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  )
}

export default Stations
