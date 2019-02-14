import React from 'react'
import ShoppingCart from './shopping-cart'
import Catalogue from './catalogue'
import { items } from '../data/items'

const calculateQuantity = cartItems =>
  cartItems.reduce((qt, i) => qt + i.quantity, 0)

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cartItems: []
    }

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(item) {
    const index = this.state.cartItems.findIndex(i => item.id === i.item.id)
  
    if (index > -1) {
      this.setState(state => ({
        cartItems: [
          ...state.cartItems.slice(0, index),
          {
            ...state.cartItems[index],
            quantity: state.cartItems[index].quantity + 1
          },
          ...state.cartItems.slice(index + 1),
        ]
      }))
    } else {
      this.setState(state => ({
        cartItems: [
          ...state.cartItems, 
          {
            item,
            quantity: 1,
          }
        ],
      }))
    }
  }

  render() {
    return (
      <div>
        <h1>Shopping Cart</h1>
    
        <ShoppingCart count={calculateQuantity(this.state.cartItems)} />
    
        <Catalogue
          items={items}
          addToCart={this.addToCart}
        />
      </div>
    )
  }
}

export default App
