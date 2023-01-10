import theme from './theme'
import { ThemeProvider } from 'styled-components'
import MainContainer from './components/MainContainer'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer />
    </ThemeProvider>
  )
}

export default App
