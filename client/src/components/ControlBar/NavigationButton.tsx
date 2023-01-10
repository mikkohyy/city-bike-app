import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface LinkButtonProps {
  linkTo: string
  text: string
}

const LinkButton = styled(Link)`
  ${(props) => props.theme.components.buttons.controlBarButton.basic}
  :hover {
    ${(props) => props.theme.components.buttons.controlBarButton.hovered}
  }
`

const NavigationButton = ({ linkTo, text }: LinkButtonProps) => {
  return <LinkButton to={linkTo}>{text}</LinkButton>
}

export default NavigationButton
