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
