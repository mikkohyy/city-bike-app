import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Stations from './Stations'
import Journeys from './Journeys'
import Main from './Main'
import ControlBar from './ControlBar'

const StyledMainContainer = styled.div`
  ${(props) => props.theme.components.containers.mainContainer}
`

const MainContainer = () => {
  return (
    <Router>
      <StyledMainContainer>
        <ControlBar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/stations' element={<Stations />} />
          <Route path='/journeys' element={<Journeys />} />
        </Routes>
      </StyledMainContainer>
    </Router>
  )
}

export default MainContainer
