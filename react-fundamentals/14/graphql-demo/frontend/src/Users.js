import React from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const userQuery = gql`
  query users {
    users {
      id
      firstName
      lastName
    }
  }
`

const Users = ({ data: { users, loading } }) => {
  if (loading) {
    return 'Users are loading...'
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {`${user.firstName} ${user.lastName}`}
        </li>
      ))}
    </ul>
  )

}

export default graphql(userQuery)(Users)
