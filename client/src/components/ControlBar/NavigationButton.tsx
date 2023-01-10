import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface LinkButtonProps {
  linkTo: string
  text: string
  setView(viewName: string): void
  isSelected: boolean
}

const LinkButton = styled(Link)<{ $isSelected: boolean }>`
  ${(props) => props.theme.components.buttons.controlBarButton.basic}
  background: ${(props) =>
    props.$isSelected
      ? props.theme.palette.selected
      : props.theme.palette.dark};
  :hover {
    ${(props) => props.theme.components.buttons.controlBarButton.hovered}
  }
`

const NavigationButton = ({
  linkTo,
  text,
  isSelected,
  setView,
}: LinkButtonProps) => {
  const clickHandler = () => {
    setView(text)
  }

  return (
    <LinkButton to={linkTo} $isSelected={isSelected} onClick={clickHandler}>
      {text}
    </LinkButton>
  )
}

export default NavigationButton
