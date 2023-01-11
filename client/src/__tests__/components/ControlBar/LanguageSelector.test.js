import theme from '../../../theme'
import LanguageSelector from '../../../components/ControlBar/LanguageSelector'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const languages = ['Finnish', 'Swedish', 'English', 'American english']
const defaultValue = 'English'

describe('<LanguageSelector>', () => {
  beforeEach(() => {
    render(
      <LanguageSelector values={languages} defaultValue={defaultValue} />,
      {
        wrapper: ({ children }) => (
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ),
      }
    )
  })
  test('has expected number of options', () => {
    const languageSelectorOptions = screen.getAllByRole('option')

    expect(languageSelectorOptions).toHaveLength(languages.length)
  })

  test('has expected options', () => {
    const finnishOption = screen.getByRole('option', { name: 'Finnish' })
    const swedishOption = screen.getByRole('option', { name: 'Swedish' })
    const englishOption = screen.getByRole('option', { name: 'English' })
    const americanEnglishOption = screen.getByRole('option', {
      name: 'American english',
    })

    expect(finnishOption).toBeDefined()
    expect(swedishOption).toBeDefined()
    expect(englishOption).toBeDefined()
    expect(americanEnglishOption).toBeDefined()
  })

  test('has expected default value', () => {
    const defaultOption = screen.getByRole('option', { name: defaultValue })
    expect(defaultOption.selected).toBe(true)
  })
})
