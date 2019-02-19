import React from 'react'

const ShoppingCart = ({ items, count }) => (
  <div>
    Cart ({count})
    <ul>
      {items.map(i => (
        <li key={i.item.id}>{i.item.title} ({i.quantity})</li>
      ))}
    </ul>
  </div>
)

export default ShoppingCart
