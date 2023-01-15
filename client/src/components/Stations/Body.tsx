import { Station } from '../../../types'
import useLanguageSelector from '../../hooks/useLanguageSelector'
import { LanguageContextType } from '../../../types'
import BodyRow from './BodyRow'

const Body = ({ data }: { data: Station[] }) => {
  const { stationNameKey }: LanguageContextType = useLanguageSelector()

  return (
    <div>
      {data.map((station, index) => (
        <BodyRow
          key={station.nameInFinnish}
          data={station}
          nameKey={stationNameKey}
          evenOrOdd={index % 2 === 0 ? 'even' : 'odd'}
        ></BodyRow>
      ))}
    </div>
  )
}

export default Body
