import { ChangeEvent, KeyboardEvent } from 'react'
import styled from 'styled-components'

interface SearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  handleSearch: () => void
}

const SearchContainer = styled.div`
  ${(props) => props.theme.components.containers.horizontalFlexbox};
  gap: 0.5em;
`

const InputContainer = styled.div`
  ${(props) => props.theme.components.containers.inputContainer};
  font-size: 1.2em;
`

const StyledInput = styled.input`
  font-size: 1em;
`

const StyledButton = styled.button`
  ${(props) => props.theme.components.buttons.basic.active};
  &:hover {
    ${(props) => props.theme.components.buttons.basic.hovered}
  }
`

const Search = ({ searchTerm, setSearchTerm, handleSearch }: SearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <SearchContainer>
      <InputContainer>
        <label htmlFor={'searchField'}>Search with station name:</label>
        <StyledInput
          name='searchField'
          id='searchField'
          type='text'
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleEnterPress}
        />
      </InputContainer>
      <StyledButton onClick={() => handleSearch()}>Search</StyledButton>
    </SearchContainer>
  )
}

export default Search
