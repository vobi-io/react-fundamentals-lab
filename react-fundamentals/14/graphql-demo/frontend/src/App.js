import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
// import Users from './Users'
import Product from './Product'

const productsQuery = gql`
  query products {
    products {
      id
      title
      description
    }
  }
`

const App = () => {
  const [productId, setProductId] = useState(null)

  return (
    <div>
      <h1>GraphQL DEMO</h1>

      {/* <Users /> */}

      <h1>Products List</h1>
      <Query query={productsQuery}>
        {({ data, loading }) => (
          <ul>
            {loading && <li>Loading...</li>}
            {!loading && data.products.map(product => (
              <li key={product.id}>
                <div
                  onClick={() => {
                    setProductId(product.id)
                  }}
                >
                  {product.title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Query>

      {productId && (
        <Product
          id={productId}
        />
      )}
    </div>
  )
}

export default App