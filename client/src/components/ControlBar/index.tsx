import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LanguageSelector from '../LanguageSelector'
import NavigationButton from './NavigationButton'

const ControlBarContainer = styled.div`
  ${(props) => props.theme.components.containers.controlBar.main}
`

const ButtonsContainer = styled.div`
  ${(props) => props.theme.components.containers.controlBar.buttons}
`

const ControlBar = () => {
  return (
    <ControlBarContainer>
      <ButtonsContainer>
        <NavigationButton linkTo='/' text='City bike app' />
        <NavigationButton linkTo='/stations' text='Stations' />
        <NavigationButton linkTo='/journeys' text='Journeys' />
      </ButtonsContainer>
      <LanguageSelector />
    </ControlBarContainer>
  )
}

export default ControlBar
