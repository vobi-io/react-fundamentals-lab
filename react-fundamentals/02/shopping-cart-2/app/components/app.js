
const calculateQuantity = cartItems =>
  cartItems.reduce((qt, i) => qt + i.quantity, 0)

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      cartItems: []
    }

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(item) {
    const index = this.state.cartItems.findIndex(i => item.id === i.item.id)
  
    if (index > -1) {
      this.setState({
        cartItems: [
          ...this.state.cartItems.slice(0, index),
          {
            ...this.state.cartItems[index],
            quantity: this.state.cartItems[index].quantity + 1
          },
          ...this.state.cartItems.slice(index + 1),
        ]
      })
    } else {
      this.setState({
        cartItems: [
          ...this.state.cartItems, 
          {
            item,
            quantity: 1,
          }
        ],
      })
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