import React, { Component } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background: green;
  color: white;
  font-weight: 400;
  border: 1px solid #085208;
  cursor: pointer;
  :hover {
    background: #588958;
  }
`

class Item extends Component {
  // componentDidMount() {
    // const { item } = this.props

    // this.intervalId = setInterval(() => {
    //   console.log(`I am ${item.title}`)
    // }, 2000)
  // }

  // componentWillUnmount() {
    // const { item } = this.props

    // clearInterval(this.intervalId)
    // console.log(`${item.title} is going away...`)
  // }

  render () {
    const { addToCart, item } = this.props

    return (
      <li>
        <h3>{item.title}</h3>
        <div>Price: ${item.price}</div>
        <br />
        <StyledButton
          onClick={event => {
            event.preventDefault()
            addToCart(item)
          }}
        >
          Add to cart
        </StyledButton>
      </li>
    )
  }
}

export default Item
