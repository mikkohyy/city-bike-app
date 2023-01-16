import useLanguageSelector from '../../hooks/useLanguageSelector'
import { useEffect, useState } from 'react'
import { getStations } from '../../services/stations'
import { GetStationsResponseData, Language } from '../../../types'
import { toGetStationsResponseData } from '../../utils/input_proofing'
import Header from './Header'
import Body from './Body'
import Paginator from '../Generic/Paginator'
import Search from './Search'
import styled from 'styled-components'

const ControlsContainer = styled.div`
  ${(props) => props.theme.components.containers.horizontalFlexbox};
  padding: 0.5em 1em 0.5em 1em;
`

const SearchFooter = styled.div`
  ${(props) => props.theme.components.containers.horizontalFlexbox};
  padding: 0.5em 1em 0.5em 1em;
  justify-content: flex-end;
`

const Stations = () => {
  const { selectedLanguage } = useLanguageSelector()
  const [stationsData, setStationsData] = useState<
    GetStationsResponseData | undefined
  >(undefined)

  const [searchTerm, setSearchTerm] = useState<string>('')

  const fetchStations = async (
    page: number,
    pageSize: number,
    searchTerm?: string,
    language?: Language
  ) => {
    try {
      const receivedData = await getStations(
        page,
        pageSize,
        searchTerm,
        language
      )
      setStationsData(toGetStationsResponseData(receivedData))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStations(0, 50)
  }, [])

  const handlePageChange = async (pageToBeMovedTo: number) => {
    fetchStations(pageToBeMovedTo, 50, searchTerm, selectedLanguage)
  }

  const handleSearch = async () => {
    fetchStations(0, 50, searchTerm, selectedLanguage)
  }

  return (
    <div>
      {stationsData ? (
        <div>
          <ControlsContainer>
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
            <Paginator
              page={stationsData.page}
              pageSize={stationsData.pageSize}
              totalNOfRows={stationsData.totalNOfRows}
              nextPage={stationsData.nextPage}
              handlePageChange={handlePageChange}
            />
          </ControlsContainer>
          <Header />
          <Body data={stationsData.data} />
          <SearchFooter>
            <Paginator
              page={stationsData.page}
              pageSize={stationsData.pageSize}
              totalNOfRows={stationsData.totalNOfRows}
              nextPage={stationsData.nextPage}
              handlePageChange={handlePageChange}
            />
          </SearchFooter>
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  )
}

export default Stations
