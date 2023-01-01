import styled from 'styled-components'
import { ChangeEvent, useState } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TestComponent = ({
  buttonText,
  handleClick,
}: {
  buttonText: string
  handleClick: () => void
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <Container>
      <Container>
        <label htmlFor='testInput'>A text field</label>
        <input
          value={inputValue}
          type='text'
          name='testInput'
          id='testInput'
          onChange={handleInputChange}
        />
      </Container>
      <div>
        <button disabled={inputValue === ''} onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </Container>
  )
}

export default TestComponent
