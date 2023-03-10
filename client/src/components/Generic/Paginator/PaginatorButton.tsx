import styled from 'styled-components'

interface PaginatorButtonTypes {
  text: string
  isActive: boolean
  onClick: () => void
}

const StyledButton = styled.button<{ $isActive: boolean }>`
  ${(props) =>
    props.$isActive
      ? props.theme.components.buttons.basic.active
      : props.theme.components.buttons.basic.passive}
  ${(props) =>
    props.$isActive === true
      ? { ':hover': props.theme.components.buttons.basic.hovered }
      : undefined}
`

const PaginatorButton = ({ text, onClick, isActive }: PaginatorButtonTypes) => {
  return (
    <StyledButton $isActive={isActive} onClick={onClick}>
      {text}
    </StyledButton>
  )
}

export default PaginatorButton
