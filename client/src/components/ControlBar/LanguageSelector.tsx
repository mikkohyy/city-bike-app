import styled from 'styled-components'
import { Language } from '../../../types'

interface LanguageSelectorProps {
  values: Language[]
  defaultValue: Language
}

const Container = styled.div`
  ${(props) => props.theme.components.containers.languageSelector}
`

const LanguageSelector = ({ values, defaultValue }: LanguageSelectorProps) => {
  return (
    <Container>
      <label htmlFor='languages'>Station name language</label>
      <select name='languages' id='languages' defaultValue={defaultValue}>
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
