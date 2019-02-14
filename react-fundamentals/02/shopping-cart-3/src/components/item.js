import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background: green;
  color: white;
  font-weight: 400;
  border: 1px solid #085208;
  cursor: ${props => props.sold ? 'not-allowed' : 'pointer'};
  :hover {
    background: #588958;
  }
`

const Item = ({ addToCart, item }) => (
  <li>
    <h3>{item.title}</h3>
    <div>Price: ${item.price}</div>
    <br />
    <StyledButton
      sold
      disabled
      onClick={event => {
        event.preventDefault()
        addToCart(item)
      }}
    >
      Add to cart
    </StyledButton>
  </li>
)

export default Item
