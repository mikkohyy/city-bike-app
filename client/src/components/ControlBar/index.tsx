import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ControlBarContainer = styled.div`
  ${(props) => props.theme.components.containers.controlBar}
`

const ControlBar = () => {
  return (
    <ControlBarContainer>
      <Link to='/'>City bike app</Link>
      <Link to='/stations'>Stations</Link>
      <Link to='/journeys'>Journeys</Link>
      <div>Language selector</div>
    </ControlBarContainer>
  )
}

export default ControlBar
