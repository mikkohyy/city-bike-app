import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LanguageSelector from '../LanguageSelector'

const ControlBarContainer = styled.div`
  ${(props) => props.theme.components.containers.controlBar.main}
`

const ButtonsContainer = styled.div`
  ${(props) => props.theme.components.containers.controlBar.buttons}
`

const LinkButton = styled(Link)`
  ${(props) => props.theme.components.buttons.controlBarButton.basic}
  :hover {
    ${(props) => props.theme.components.buttons.controlBarButton.hovered}
  }
`

const ControlBar = () => {
  return (
    <ControlBarContainer>
      <ButtonsContainer>
        <LinkButton to='/'>City bike app</LinkButton>
        <LinkButton to='/stations'>Stations</LinkButton>
        <LinkButton to='/journeys'>Journeys</LinkButton>
      </ButtonsContainer>
      <LanguageSelector />
    </ControlBarContainer>
  )
}

export default ControlBar
