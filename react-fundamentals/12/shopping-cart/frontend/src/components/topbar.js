import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  NavLink,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
  Collapse,
  NavbarToggler,
} from 'reactstrap'
import ShoppingCart from './shopping-cart'
import MeContext from '../services/me-context'

const Topbar = ({ cartItems, cartItemsQuantity }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const { me } = useContext(MeContext)

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Shopping Cart</NavbarBrand>
      <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/catalogue">Catalogue</NavLink>
          </NavItem>
          {!me && (
            <React.Fragment>
              <NavItem>
                <NavLink tag={Link} to="/sign-in">Sign in</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/sign-up">Sign up</NavLink>
              </NavItem>
            </React.Fragment>
          )}
          {me && (
            <NavItem>
              <NavLink tag={Link} to="/profile">
                {`${me.firstName} ${me.lastName}`}
              </NavLink>
            </NavItem>
          )}
          <ShoppingCart
            items={cartItems}
            count={cartItemsQuantity}
          />
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Topbar
