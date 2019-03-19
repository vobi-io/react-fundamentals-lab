import React, { useState } from 'react'
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

const App = () => {
  const [cartItems, setCartItems] = useState([])
  
  const addToCart = item => {
    const index = cartItems.findIndex(i => item.id === i.item.id)
  
    if (index > -1) {
      setCartItems([
        ...cartItems.slice(0, index),
        {
          ...cartItems[index],
          quantity: cartItems[index].quantity + 1
        },
        ...cartItems.slice(index + 1),
      ])
    } else {
      setCartItems([
        ...cartItems, 
        {
          item,
          quantity: 1,
        }
      ])
    }
  }

  return (
    <div>
      <GlobalStyles />
      <Topbar
        cartItems={cartItems}
        cartItemsQuantity={calculateQuantity(cartItems)}
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
                    addToCart={addToCart}
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

export default App
