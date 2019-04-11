import React from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
import Table from './table/Table'

const columns = [
  {
    name: 'firstName',
    label: 'First name',
  },
  { 
    name: 'lastName',
    label: 'Last name',
    hidden: true,
  },
  { 
    name: 'email',
    label: 'Email',
  },
]

const data = [
  {
    id: 1,
    lastName: 'Kokaia',
    firstName: 'Koka',
    email: 'kokakokaia@test.com'
  },
  {
    email: 'tornikaishvili@test.com',
    id: 2,
    firstName: 'Tornike',
    lastName: 'Tornikaishvili',
  },
]

const totalCount = 13
const perPage = 4
// const initialPage = 2

const getInitialPage = (location) => {
  const search = location.search.replace('?', '')
  const params = qs.parse(search)
  console.log('params', params)
  return params.page || 1
}

const App = ({ location, history }) => {
  const onPageChange = currentPage => {
    const query = qs.stringify({ page: currentPage })
    const url = `${location.pathname}?${query}`
    history.push(url)
  }

  // useEffect(() => {
  //   console.log('location', location)
  //   apiService.get('asddsa', {
  //     page: getInitialPage(location)
  //   })
  // }, [location])

  return (
    <div>
      <h2>Tabledable Component!</h2>

      <Table
        columns={columns}
        data={data}
        totalCount={totalCount}
        perPage={perPage}
        initialPage={getInitialPage(location)}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default withRouter(App)