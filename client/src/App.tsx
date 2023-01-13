import theme from './theme'
import { ThemeProvider } from 'styled-components'
import MainContainer from './components/MainContainer'
import { LanguageContextProvider } from './contexts/LanguageContext'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LanguageContextProvider>
        <MainContainer />
      </LanguageContextProvider>
    </ThemeProvider>
  )
}

export default App
