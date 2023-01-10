import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`

const LanguageSelector = () => {
  return (
    <Container>
      <label htmlFor='languages'>Station name language</label>
      <select name='languages' id='langauges'>
        <option value='finnish'>Finnish</option>
        <option value='swedish'>Swedish</option>
        <option value='english'>English</option>
      </select>
    </Container>
  )
}

export default LanguageSelector
