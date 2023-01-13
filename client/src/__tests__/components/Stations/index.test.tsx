import theme from '../../../theme'
import { ThemeProvider } from 'styled-components'
import '@testing-library/jest-dom/extend-expect'
import Stations from '../../../components/Stations'
import { render, screen } from '@testing-library/react'
import { LanguageContextProvider } from '../../../contexts/LanguageContext'
import { getStations } from '../../../services/stations'

jest.mock('../../../services/stations', () => {
  return {
    getStations: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          stationId: '501',
          nameInFinnish: 'Hanasaari',
          nameInSwedish: 'Hanaholmen',
          nameInEnglish: 'Hanasaari',
          addressInFinnish: 'Hanasaarenranta 1',
          addressInSwedish: 'Hanaholmsstranden 1',
          cityInFinnish: 'Espoo',
          cityInSwedish: 'Esbo',
          operator: 'CityBike Finland',
          capacity: 10,
          yCoordinate: 24.840319,
          xCoordinate: 60.16582,
        },
        {
          id: 2,
          stationId: '529',
          nameInFinnish: 'Keilaniemi (M)',
          nameInSwedish: 'Kägeludden (M)',
          nameInEnglish: 'Keilaniemi (M)',
          addressInFinnish: 'Keilaniementie 4',
          addressInSwedish: 'Kägeluddsvägen 4',
          cityInFinnish: 'Espoo',
          cityInSwedish: 'Esbo',
          operator: 'CityBike Finland',
          capacity: 40,
          xCoordinate: 24.82895,
          yCoordinate: 60.175233,
        },
      ],
      page: 0,
      pageSize: 50,
      totalNOfRows: 2,
      totalPages: 1,
      nextPage: null,
    }),
  }
})

describe('<Stations>', () => {
  test('on first render', async () => {
    render(<Stations />, {
      wrapper: ({ children }) => (
        <ThemeProvider theme={theme}>
          <LanguageContextProvider>{children}</LanguageContextProvider>
        </ThemeProvider>
      ),
    })

    // renders loading component before data is loaded
    expect(await screen.findByText('Loading..')).toBeDefined()

    // getStations function is called
    expect(getStations).toHaveBeenCalledTimes(1)

    // expected station names are rendered
    expect(await screen.findByText(/Hanasaari/)).toBeDefined()
    expect(screen.getByText(/Keilaniemi \(M\)/)).toBeDefined()
  })
})
