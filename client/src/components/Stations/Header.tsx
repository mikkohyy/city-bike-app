import styled from 'styled-components'
import Cell from '../Generic/TableElements/Cell'

const Row = styled.div`
  ${(props) => props.theme.components.tables.row};
  ${(props) => props.theme.components.tables.headerRow};
  ${(props) => props.theme.components.tables.stationsRow}:
`

const Header = () => {
  return (
    <Row>
      <Cell>Station id</Cell>
      <Cell>Station name</Cell>
      <Cell>More info</Cell>
    </Row>
  )
}

export default Header
