import { Station } from '../../../types'
import styled from 'styled-components'
import Cell from '../Generic/TableElements/Cell'

const Row = styled.div<{ $evenOrOdd: 'even' | 'odd' }>`
  ${(props) => props.theme.components.tables.row};
  ${(props) => props.theme.components.tables.stationsRow};
  ${(props) =>
    props.$evenOrOdd === 'even'
      ? props.theme.components.tables.bodyRow.even
      : props.theme.components.tables.bodyRow.odd};
`

interface TableRowProps {
  data: Station
  nameKey: string
  evenOrOdd: 'even' | 'odd'
}

const TableRow = ({ data, nameKey, evenOrOdd }: TableRowProps) => {
  return (
    <Row $evenOrOdd={evenOrOdd}>
      <Cell>{data.stationId}</Cell>
      <Cell>{data[nameKey]}</Cell>
      <button>More info</button>
    </Row>
  )
}

export default TableRow
