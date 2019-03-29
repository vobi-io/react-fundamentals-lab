import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap'
import Home from './home'
import Catalogue from './catalogue/catalogue'
import GlobalStyles from '../global-styles'
import Topbar from './topbar'
import FourOFour from './four-o-four'
import SignIn from './sign-in'
import SignUp from './sign-up'
import Profile from './profile'
import axios from '../services/http-service'
import MeContext from '../services/me-context'
import ProtectedRoute from './protected-route'

const calculateQuantity = cartItems =>
  cartItems.reduce((qt, i) => qt + i.quantity, 0)

const redirectIfAuthorized = (component, meState) => () => {
  if (meState.loading) {
    return null
  }
  if (meState.me) {
    return <Redirect to="/profile" />
  }
  return component
}

const App = () => {
  const [cartItems, setCartItems] = useState([])
  const [meState, setMeState] = useState({
    me: null,
    loading: true,
  })
  
  useEffect(() => {
    setMeState({
      ...meState,
      loading: true,
    })
    axios.get('/me')
      .then(result => {
        setMeState({
          me: result.data.me,
          loading: false,
        })
      })
      .catch(err => {
        setMeState({
          me: null,
          loading: false,
        })
        console.log('err', err)
      })
  }, [])

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
      <MeContext.Provider value={meState}>
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
                <ProtectedRoute
                  // hasRoles={['customer', 'agent']}
                  path="/profile"
                  component={Profile}
                />
                <Route
                  path="/sign-in"
                  render={redirectIfAuthorized(<SignIn />, meState)}
                />
                <Route
                  path="/sign-up"
                  render={redirectIfAuthorized(<SignUp />, meState)}
                />
                <Route component={FourOFour} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </MeContext.Provider>
    </div>
  )
}

export default App
