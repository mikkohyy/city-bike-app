import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { Language } from '../../../types'

interface LanguageSelectorProps {
  values: Language[]
  defaultValue: Language
  setLanguage(language: Language): void
}

const Container = styled.div`
  ${(props) => props.theme.components.containers.languageSelector}
`

const LanguageSelector = ({
  values,
  defaultValue,
  setLanguage,
}: LanguageSelectorProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as Language)
  }

  return (
    <Container>
      <label htmlFor='languages'>Station name language</label>
      <select
        onChange={handleChange}
        name='languages'
        id='languages'
        defaultValue={defaultValue}
      >
        {values.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          )
        })}
      </select>
    </Container>
  )
}

export default LanguageSelector
