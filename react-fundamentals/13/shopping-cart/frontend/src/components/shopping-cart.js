import React, { useState } from 'react'

const ShoppingCartItems = ({ items }) => (
  <ul>
    {items.map(i => (
      <li key={i.item.id}>{i.item.title} ({i.quantity})</li>
    ))}
  </ul>
)

const ShoppingCart = ({ items, count }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      Cart ({count})
      <br />
      <label>
        <input
          onChange={event => {
            setShow(event.target.checked)
          }}
          type="checkbox"
        /> show items
      </label>
      {show && (
        <ShoppingCartItems items={items}/>
      )}
    </div>
  )
}

export default ShoppingCart
