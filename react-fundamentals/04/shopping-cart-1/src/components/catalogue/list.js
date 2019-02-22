import React from 'react'
import Item from './item'

const filterItemsByTerm =
  term => 
    item =>
      item.title
        .toLowerCase()
        .startsWith(term)

const CatalogueList = ({ items, addToCart, term }) => {
  const filterItems = filterItemsByTerm(term.trim().toLowerCase())
  
  return (
    <ul>
      {items
        .filter(filterItems)
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
