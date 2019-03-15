import React from 'react'
import Item from './item'

const CatalogueList = ({ items, loadingItems, fetchingError, addToCart }) => {
  if (loadingItems) {
    return <div>Loading...</div>
  }

  if (fetchingError) {
    return <div>{fetchingError}</div>
  }

  return (
    <ul>
      {items
        .map(item => (
          <Item
            addToCart={addToCart}
            key={item.id}
            item={item}
          />
        ))}
    </ul>
  )
}

export default CatalogueList
