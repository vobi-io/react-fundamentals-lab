import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const productQuery = gql`
  query productById($id: ID!) {
    product: productById(id: $id) {
      _id
      title
      description
      owner {
        _id
        firstName
        lastName
      }
    }
  }
`

const Product = ({ id }) => {
  const { data: { product }, loading, error } = useQuery(productQuery, {
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network'
  })

  if (error) {
    return <div>Something goes wrong while fetching product</div>
  }

  if (loading) {
    return 'Loading single product...'
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <div>{product.description}</div>
    </div>
  )
}

export default Product
