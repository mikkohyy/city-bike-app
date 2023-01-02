import { useState } from 'react'
import axios from 'axios'
import TestComponent from './components/TestComponent'

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stationData, setStationData] = useState<any>(undefined)

  const handleClick = async () => {
    try {
      const responseData = await axios.get('/api/stations')
      setStationData(responseData.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>City bike app</div>
      <TestComponent buttonText='Press here' handleClick={handleClick} />
      {stationData !== undefined
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          stationData.map((station: any) => (
            <div key={station.stationId}>{station.nameInFinnish}</div>
          ))
        : undefined}
    </div>
  )
}

export default App
