import React, { useState, useEffect } from 'react'

const PageButton = ({ pageNumber, setCurrentPage, currentPage }) => {
  const onClick = () => {
    setCurrentPage(pageNumber)
  }

  return (
    <button
      disabled={pageNumber === currentPage}
      onClick={onClick}
    >
      {pageNumber}
    </button>
  )
}

const generatePager = (pageCount, setCurrentPage, currentPage) => {
  const pageButtons = []
  for (let i = 1; i <= pageCount; i++) {
    pageButtons.push(
      <PageButton
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageNumber={i}
        key={i}
      />
    )
  }
  return pageButtons
}

const Table = ({
  columns,
  data,
  totalCount,
  perPage,
  onPageChange,
  initialPage = 1,
}) => {
  const rows = columns
    .filter(column => !column.hidden)
    .map(c => c.name)
  const pageCount = Math.ceil(totalCount / perPage)

  console.log('initialPage', initialPage)
  const [currentPage, setCurrentPage] = useState(Number(initialPage))
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (!rendered) {
      console.log('not rendered')
      setRendered(true)
    } else {
      console.log('rendered')
      if (onPageChange) {
        onPageChange(currentPage)
      }
    }
  }, [currentPage])
  
  return (
    <div>
      <table>
        <thead>
          <tr>
          {columns
            .filter(column => !column.hidden)
            .map(column => (
              <th key={column.name}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {rows.map(r => (
                <td key={`${item.id}-${r}`}>
                  {item[r]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {generatePager(pageCount, setCurrentPage, currentPage)}
      </div>
    </div>
  )
}

export default Table
