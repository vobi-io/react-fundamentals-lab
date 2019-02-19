import React from 'react'
import ShoppingCart from './shopping-cart'
import Catalogue from './catalogue/catalogue'
import { items } from '../data/items'
import GlobalStyles from '../global-styles'

const calculateQuantity = cartItems =>
  cartItems.reduce((qt, i) => qt + i.quantity, 0)

class App extends React.Component {
  state = {
    cartItems: []
  }

  addToCart = item => {
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
        <GlobalStyles />
        <h1>Shopping Cart</h1>
    
        <ShoppingCart
          items={this.state.cartItems}
          count={calculateQuantity(this.state.cartItems)}
        />
    
        <Catalogue
          items={items}
          addToCart={this.addToCart}
        />
      </div>
    )
  }
}

export default App
