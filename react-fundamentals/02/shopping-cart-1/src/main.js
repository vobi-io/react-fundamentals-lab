const ShoppingCart = ({ count }) => (
  <div>
    Cart ({count})
  </div>
)

const Item = ({ addToCart, item }) => (
  <li>
    <h3>{item.title}</h3>
    <div>Price: ${item.price}</div>
    <br />
    <button
      onClick={event => {
        event.preventDefault()
        addToCart(item)
      }}
    >
      Add to cart
    </button>
  </li>
)

const Catalogue = ({ addToCart, items }) => (
  <React.Fragment>
    <h2>Product Catalogue</h2>
    <ul>
      {items.map(item => (
        <Item
          addToCart={addToCart}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  </React.Fragment>
)

const items = [
  {
    id: 1,
    title: 'Item #1',
    price: 27
  },
  {
    id: 2,
    title: 'Item #2',
    price: 14
  },
  {
    id: 3,
    title: 'Item #3',
    price: 100
  },
  {
    id: 4,
    title: 'Item #4',
    price: 20
  },
]

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

ReactDOM.render(
  <App />,
  document.getElementById('root')
)