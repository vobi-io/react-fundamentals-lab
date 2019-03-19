import React, { Fragment } from 'react'
import Search from './search'
import CatalogueList from './list'
import useProducts from './useProducts'

const Catalogue = ({ addToCart }) => {
  const {
    products,
    loading,
    error,
    term,
    onTermChange,
  } = useProducts()

  return (
    <Fragment>
      <h2>Product Catalogue</h2>
      <Search
        value={term}
        onChange={onTermChange}
      />
      <CatalogueList
        loadingItems={loading}
        items={products}
        fetchingError={error}
        addToCart={addToCart}
        term={term}
      />
    </Fragment>
  )
}

export default Catalogue
