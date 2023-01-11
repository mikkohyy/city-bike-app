import theme from '../../../theme'
import { ThemeProvider } from 'styled-components'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import NavigationButton from '../../../components/ControlBar/NavigationButton'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const onClickMock = jest.fn()
const buttonText = 'Test button'

describe('<NavigationButton>', () => {
  describe('general behaviour', () => {
    beforeEach(() => {
      render(
        <NavigationButton
          linkTo='/'
          text={buttonText}
          isSelected={false}
          setView={onClickMock}
        />,
        {
          wrapper: ({ children }) => (
            <ThemeProvider theme={theme}>
              <Router>
                <Routes>
                  <Route path='/' element={<div>element</div>} />
                </Routes>
                {children}
              </Router>
            </ThemeProvider>
          ),
        }
      )
    })
    test('expected text is rendered', () => {
      const link = screen.getByRole('link')
      expect(link).toHaveTextContent('Test button')
    })

    test('setView function is called with expected value', async () => {
      const link = screen.getByRole('link')
      await userEvent.click(link)
      expect(onClickMock).toHaveBeenCalledWith(buttonText)
    })
  })

  describe('when isSelected is false', () => {
    beforeEach(() => {
      render(
        <NavigationButton
          linkTo='/'
          text={buttonText}
          isSelected={false}
          setView={onClickMock}
        />,
        {
          wrapper: ({ children }) => (
            <ThemeProvider theme={theme}>
              <Router>
                <Routes>
                  <Route path='/' element={<div>element</div>} />
                </Routes>
                {children}
              </Router>
            </ThemeProvider>
          ),
        }
      )
    })

    test('has the expected background color', () => {
      const link = screen.getByRole('link')
      expect(link).toHaveStyle({ background: theme.palette.dark })
    })
  })

  describe('when isSelected is true', () => {
    beforeEach(() => {
      render(
        <NavigationButton
          linkTo='/'
          text={buttonText}
          isSelected={true}
          setView={onClickMock}
        />,
        {
          wrapper: ({ children }) => (
            <ThemeProvider theme={theme}>
              <Router>
                <Routes>
                  <Route path='/' element={<div>element</div>} />
                </Routes>
                {children}
              </Router>
            </ThemeProvider>
          ),
        }
      )
    })

    test('has the expected background color', () => {
      const link = screen.getByRole('link')
      expect(link).toHaveStyle({ background: theme.palette.selected })
    })
  })
})
