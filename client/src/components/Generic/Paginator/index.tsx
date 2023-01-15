import styled from 'styled-components'
import PaginatorButton from './PaginatorButton'

interface PaginatorProps {
  page: number
  totalNOfRows: number
  pageSize: number
  nextPage: number | null
  handlePageChange(pageToBeMovedTo: number): void
}

const PaginatorContainer = styled.div`
  ${(props) => props.theme.components.containers.paginator.mainContainer}
`

const ButtonContainer = styled.div`
  ${(props) => props.theme.components.containers.paginator.buttonContainer}
`

const PageInfo = styled.span`
  font-size: 1.2em;
`

const Paginator = ({
  page,
  totalNOfRows,
  pageSize,
  nextPage,
  handlePageChange,
}: PaginatorProps) => {
  const getIndexOfFirstVisible = () => {
    return page * pageSize + 1
  }

  const getIndexOfLastVisible = () => {
    const lastIndex = nextPage === null ? totalNOfRows : (page + 1) * pageSize
    return lastIndex
  }

  const moveToNextPage = () => {
    if (nextPage !== null) {
      handlePageChange(nextPage)
    }
  }

  const moveToPreviousPage = () => {
    if (page !== 0) {
      handlePageChange(page - 1)
    }
  }

  return (
    <PaginatorContainer>
      <PageInfo>
        {getIndexOfFirstVisible()}-{getIndexOfLastVisible()} of {totalNOfRows}
      </PageInfo>
      <ButtonContainer>
        <PaginatorButton
          text={'Previous'}
          onClick={moveToPreviousPage}
          isActive={page !== 0}
        />
        <PaginatorButton
          text={'Next'}
          onClick={moveToNextPage}
          isActive={nextPage !== null}
        />
      </ButtonContainer>
    </PaginatorContainer>
  )
}

export default Paginator
