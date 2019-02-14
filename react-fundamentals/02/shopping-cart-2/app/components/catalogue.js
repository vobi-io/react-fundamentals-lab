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