import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap'
import Home from './home'
import Catalogue from './catalogue/catalogue'
import GlobalStyles from '../global-styles'
import Topbar from './topbar'
import FourOFour from './four-o-four'
import SignIn from './sign-in'
import SignUp from './sign-up'

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

        <Container>
          <Row>
            <Col>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  path="/catalogue"
                  render={() => (
                    <Catalogue
                      addToCart={this.addToCart}
                    />
                  )}
                />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route component={FourOFour} />
              </Switch>
            </Col>
          </Row>
        </Container>
    
      </div>
    )
  }
}

export default App
