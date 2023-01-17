import styled from 'styled-components'
import { ChangeEvent } from 'react'

interface OrderSelectorProps {
  setOrderBy(order: string): void
  setOrderDirection(direction: string): void
}

const OrderSelectorContainer = styled.div`
  ${(props) => props.theme.components.containers.horizontalFlexbox};
  gap: 0.5em;
`

const DropDownMenu = styled.div`
  ${(props) => props.theme.components.containers.horizontalFlexbox};
  gap: 0.5em;
`

const BoldedText = styled.span`
  font-size: 1.1em;
  font-weight: 500;
`

const StyledSelect = styled.select`
  font-size: 1em;
  padding: 0.2em;
  border-radius: 0.2em;
  cursor: pointer;
`

const OrderSelector = ({
  setOrderBy,
  setOrderDirection,
}: OrderSelectorProps) => {
  const handleColumnNameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(event.target.value)
  }

  const handleDirectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrderDirection(event.target.value)
  }

  return (
    <OrderSelectorContainer>
      <DropDownMenu>
        <label htmlFor='orderingColumn'>
          <BoldedText>Order by</BoldedText>
        </label>
        <StyledSelect
          onChange={handleColumnNameChange}
          defaultValue='stationId'
          name='orderingColumn'
          id='orderingColumn'
        >
          <option value={'stationId'}>Id</option>
          <option value={'stationName'}>Name</option>
        </StyledSelect>
      </DropDownMenu>
      <DropDownMenu>
        <label htmlFor='orderingDirection'>
          <BoldedText>Direction</BoldedText>
        </label>
        <StyledSelect
          onChange={handleDirectionChange}
          defaultValue='ascending'
          name='orderingDirection'
          id='orderingDirection'
        >
          <option value={'ascending'}>Ascending</option>
          <option value={'descending'}>Descending</option>
        </StyledSelect>
      </DropDownMenu>
    </OrderSelectorContainer>
  )
}

export default OrderSelector
