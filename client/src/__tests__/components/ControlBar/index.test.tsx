import theme from '../../../theme'
import { ThemeProvider } from 'styled-components'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import ControlBar from '../../../components/ControlBar'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageContextProvider } from '../../../contexts/LanguageContext'

describe('<ControlBar>', () => {
  beforeEach(() => {
    render(<ControlBar />, {
      wrapper: ({ children }) => (
        <ThemeProvider theme={theme}>
          <LanguageContextProvider>
            <Router>
              <Routes>
                <Route path='/' element={<div>element</div>} />
                <Route path='/journeys' element={<div>element</div>} />
                <Route path='/stations' element={<div>element</div>} />
              </Routes>
              {children}
            </Router>
          </LanguageContextProvider>
        </ThemeProvider>
      ),
    })
  })

  test('expected elements are rendered', () => {
    const cityBikeAppButton = screen.getByRole('link', {
      name: 'City bike app',
    })
    const journeysButton = screen.getByRole('link', { name: 'Journeys' })
    const stationsButton = screen.getByRole('link', { name: 'Stations' })
    const languageSelector = screen.getByLabelText('Station name language')

    expect(cityBikeAppButton).toBeDefined()
    expect(journeysButton).toBeDefined()
    expect(stationsButton).toBeDefined()
    expect(languageSelector).toBeDefined()
  })

  describe('station name language selector', () => {
    test('has expected number of options', () => {
      const languageSelectorOptions = screen.getAllByRole('option')

      expect(languageSelectorOptions).toHaveLength(3)
    })

    test('has expected options', () => {
      const finnishOption = screen.getByRole('option', { name: 'Finnish' })
      const swedishOption = screen.getByRole('option', { name: 'Swedish' })
      const englishOption = screen.getByRole('option', { name: 'English' })

      expect(finnishOption).toBeDefined()
      expect(swedishOption).toBeDefined()
      expect(englishOption).toBeDefined()
    })
  })

  describe('button behaviour', () => {
    describe('when clicked', () => {
      test('Journeys button is highlighted', async () => {
        const journeysButton = screen.getByRole('link', { name: 'Journeys' })
        expect(journeysButton).toBeDefined()

        // Button is not highlighted first
        expect(journeysButton).not.toHaveStyle({
          background: theme.palette.selected,
        })

        await userEvent.click(journeysButton)

        expect(journeysButton).toHaveStyle({
          background: theme.palette.selected,
        })
      })

      test('Stations button is highlighted', async () => {
        const stationsButton = screen.getByRole('link', { name: 'Stations' })
        expect(stationsButton).toBeDefined()

        // Button is not highlighted first
        expect(stationsButton).not.toHaveStyle({
          background: theme.palette.selected,
        })

        await userEvent.click(stationsButton)

        expect(stationsButton).toHaveStyle({
          background: theme.palette.selected,
        })
      })
      test('City bike app button is not highlighted', async () => {
        const cityBikeAppButton = screen.getByRole('link', {
          name: 'City bike app',
        })
        expect(cityBikeAppButton).toBeDefined()

        // Button is not highlighted first
        expect(cityBikeAppButton).not.toHaveStyle({
          background: theme.palette.selected,
        })

        await userEvent.click(cityBikeAppButton)

        expect(cityBikeAppButton).not.toHaveStyle({
          background: theme.palette.selected,
        })
      })
      test('highlighted Journeys becomes normal when Stations is pressed and Stations becomes highlighted', async () => {
        const journeysButton = screen.getByRole('link', {
          name: 'Journeys',
        })

        const stationsButton = screen.getByRole('link', {
          name: 'Stations',
        })

        // Make Journeys button higlighted
        await userEvent.click(journeysButton)

        await userEvent.click(stationsButton)

        expect(journeysButton).not.toHaveStyle({
          background: theme.palette.selected,
        })

        expect(stationsButton).toHaveStyle({
          background: theme.palette.selected,
        })
      })
      test('highlighted button becomes normal when City bike app is pressed and no button is highlighted', async () => {
        const cityBikeAppButton = screen.getByRole('link', {
          name: 'City bike app',
        })

        const journeysButton = screen.getByRole('link', {
          name: 'Journeys',
        })

        const stationsButton = screen.getByRole('link', {
          name: 'Stations',
        })

        // Make Journeys button higlighted
        await userEvent.click(journeysButton)

        await userEvent.click(cityBikeAppButton)

        expect(journeysButton).not.toHaveStyle({
          background: theme.palette.selected,
        })

        expect(stationsButton).not.toHaveStyle({
          background: theme.palette.selected,
        })

        expect(cityBikeAppButton).not.toHaveStyle({
          background: theme.palette.selected,
        })
      })
    })
  })
})
