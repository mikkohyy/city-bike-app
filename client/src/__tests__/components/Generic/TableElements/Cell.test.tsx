import theme from '../../../../theme'
import { ThemeProvider } from 'styled-components'
import Cell from '../../../../components/Generic/TableElements/Cell'
import { render, screen } from '@testing-library/react'

describe('<Cell>', () => {
  test('renders expected content', () => {
    const content = 'Cell content'
    render(<Cell>{content}</Cell>, {
      wrapper: ({ children }) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ),
    })

    const renderedCell = screen.getByText(/Cell content/)

    expect(renderedCell).toBeDefined()
  })
})
