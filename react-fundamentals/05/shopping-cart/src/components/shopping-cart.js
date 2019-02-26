import React, { Component } from 'react'

const ShoppingCartItems = ({ items }) => (
  <ul>
    {items.map(i => (
      <li key={i.item.id}>{i.item.title} ({i.quantity})</li>
    ))}
  </ul>
)

class ShoppingCart extends Component {
  state = {
    show: false
  }

  render() {
    const { items, count } = this.props

    return (
      <div>
        Cart ({count})
        <br />
        <label>
          <input
            onChange={event => {
              this.setState({
                show: event.target.checked
              })
            }}
            type="checkbox"
          /> show items
        </label>
        {this.state.show && (
          <ShoppingCartItems items={items}/>
        )}
      </div>
    )
  }
}

export default ShoppingCart
