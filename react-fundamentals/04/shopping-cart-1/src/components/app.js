import React from 'react'
import { Route } from 'react-router-dom'
import Home from './home'
import Catalogue from './catalogue/catalogue'
import { items } from '../data/items'
import GlobalStyles from '../global-styles'
import Topbar from './topbar'

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
        <Topbar
          cartItems={this.state.cartItems}
          cartItemsQuantity={calculateQuantity(this.state.cartItems)}
        />

        <Route path="/" component={Home} />
        <Route
          path="/catalogue"
          render={() => (
            <Catalogue
              items={items}
              addToCart={this.addToCart}
            />
          )}
        />
    
      </div>
    )
  }
}

export default App
