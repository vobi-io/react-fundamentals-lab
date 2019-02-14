var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingCart = function ShoppingCart(_ref) {
  var count = _ref.count;
  return React.createElement(
    'div',
    null,
    'Cart (',
    count,
    ')'
  );
};

var Item = function Item(_ref2) {
  var addToCart = _ref2.addToCart,
      item = _ref2.item;
  return React.createElement(
    'li',
    null,
    React.createElement(
      'h3',
      null,
      item.title
    ),
    React.createElement(
      'div',
      null,
      'Price: $',
      item.price
    ),
    React.createElement('br', null),
    React.createElement(
      'button',
      {
        onClick: function onClick(event) {
          event.preventDefault();
          addToCart(item);
        }
      },
      'Add to cart'
    )
  );
};

var Catalogue = function Catalogue(_ref3) {
  var addToCart = _ref3.addToCart,
      items = _ref3.items;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'h2',
      null,
      'Product Catalogue'
    ),
    React.createElement(
      'ul',
      null,
      items.map(function (item) {
        return React.createElement(Item, {
          addToCart: addToCart,
          key: item.id,
          item: item
        });
      })
    )
  );
};

var items = [{
  id: 1,
  title: 'Item #1',
  price: 27
}, {
  id: 2,
  title: 'Item #2',
  price: 14
}, {
  id: 3,
  title: 'Item #3',
  price: 100
}, {
  id: 4,
  title: 'Item #4',
  price: 20
}];

var calculateQuantity = function calculateQuantity(cartItems) {
  return cartItems.reduce(function (qt, i) {
    return qt + i.quantity;
  }, 0);
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      cartItems: []
    };

    _this.addToCart = _this.addToCart.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'addToCart',
    value: function addToCart(item) {
      var index = this.state.cartItems.findIndex(function (i) {
        return item.id === i.item.id;
      });

      if (index > -1) {
        this.setState({
          cartItems: [].concat(_toConsumableArray(this.state.cartItems.slice(0, index)), [Object.assign({}, this.state.cartItems[index], {
            quantity: this.state.cartItems[index].quantity + 1
          })], _toConsumableArray(this.state.cartItems.slice(index + 1)))
        });
      } else {
        this.setState({
          cartItems: [].concat(_toConsumableArray(this.state.cartItems), [{
            item: item,
            quantity: 1
          }])
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Shopping Cart'
        ),
        React.createElement(ShoppingCart, { count: calculateQuantity(this.state.cartItems) }),
        React.createElement(Catalogue, {
          items: items,
          addToCart: this.addToCart
        })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));