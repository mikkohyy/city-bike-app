interface CellProps {
  children: React.ReactNode
}

const Cell = ({ children }: CellProps) => {
  return <div>{children}</div>
}

export default Cell
