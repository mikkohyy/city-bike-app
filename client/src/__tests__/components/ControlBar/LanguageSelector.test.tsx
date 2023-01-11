import theme from '../../../theme'
import LanguageSelector from '../../../components/ControlBar/LanguageSelector'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Language } from '../../../../types'

const languages: Language[] = ['Finnish', 'Swedish', 'English']
const defaultValue: Language = 'English'
const mockSetLanguage = jest.fn()

describe('<LanguageSelector>', () => {
  beforeEach(() => {
    render(
      <LanguageSelector
        values={languages}
        defaultValue={defaultValue}
        setLanguage={mockSetLanguage}
      />,
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

    expect(finnishOption).toBeDefined()
    expect(swedishOption).toBeDefined()
    expect(englishOption).toBeDefined()
  })

  test('has expected default value', () => {
    const defaultOption = screen.getByRole('option', {
      name: defaultValue,
    }) as HTMLOptionElement
    expect(defaultOption.selected).toBe(true)
  })
})
