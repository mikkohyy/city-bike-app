import useLanguageSelector from '../../hooks/useLanguageSelector'
import { useEffect, useState } from 'react'
import { getStations } from '../../services/stations'
import { GetStationsResponseData, Language } from '../../../types'
import { toGetStationsResponseData } from '../../utils/input_proofing'
import Header from './Header'
import Body from './Body'
import Paginator from '../Generic/Paginator'
import Search from './Search'
import OrderSelector from './OrderSelector'
import styled from 'styled-components'

const ControlsContainer = styled.div`
  ${(props) => props.theme.components.containers.horizontalFlexbox};
  padding: 0.5em 1em 0.5em 1em;
`

const TableControlsContainer = styled.div`
  display: flex;
  gap: 1em;
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
  const [orderBy, setOrderBy] = useState<string>('stationId')
  const [orderDirection, setOrderDirection] = useState<string>('ascending')

  const fetchStations = async (
    page: number,
    pageSize: number,
    orderBy: string,
    orderDirection: string,
    language: Language,
    searchTerm?: string
  ) => {
    try {
      const receivedData = await getStations(
        page,
        pageSize,
        orderBy,
        orderDirection,
        language,
        searchTerm
      )
      setStationsData(toGetStationsResponseData(receivedData))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStations(0, 50, orderBy, orderDirection, selectedLanguage)
  }, [orderBy, orderDirection, selectedLanguage])

  const handlePageChange = async (pageToBeMovedTo: number) => {
    fetchStations(
      pageToBeMovedTo,
      50,
      orderBy,
      orderDirection,
      selectedLanguage,
      searchTerm
    )
  }

  const handleSearch = async () => {
    fetchStations(0, 50, orderBy, orderDirection, selectedLanguage, searchTerm)
  }

  return (
    <div>
      {stationsData ? (
        <div>
          <ControlsContainer>
            <TableControlsContainer>
              <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
              />
              <OrderSelector
                setOrderBy={setOrderBy}
                setOrderDirection={setOrderDirection}
              />
            </TableControlsContainer>
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
