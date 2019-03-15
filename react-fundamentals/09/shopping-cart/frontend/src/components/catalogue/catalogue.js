import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Search from './search'
import CatalogueList from './list'

class Catalogue extends Component {
  state = {
    products: [],
    loadingProducts: false,
    term: ''
  }
  
  delayId = null

  clearTimeoutId = (delayId) => {
    clearTimeout(delayId)
  }

  componentDidMount() {
    this.fetchProducts()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.term !== this.state.term) {
      if (this.delayId) {
        this.clearTimeoutId(this.delayId)
      }
      this.delayId = setTimeout(() => {
        this.fetchProducts()
      }, 500)
    }
  }

  componentWillUnmount() {
    if (this.delayId) {
      this.clearTimeoutId(this.delayId)
    }
  }

  fetchProducts() {
    this.setState({
      loadingProducts: true,
    })
    axios.get('http://localhost:8080/products', {
      params: {
        term: this.state.term
      }
    })
      .then(res => {
        this.setState({
          loadingProducts: false,
          products: res.data.data,
        })
      })
      .catch(err => {
        this.setState({
          loadingProducts: false,
          productsFetchingError: 'Oops! Something goes wrong : ('
        })
        console.log('err', err)
      })
  }
  
  onTermChange = e => {
    this.setState({
      term: e.target.value,
    })
  }
  
  render() {
    const { addToCart } = this.props

    return (
      <Fragment>
        <h2>Product Catalogue</h2>
        <Search
          value={this.state.term}
          onChange={this.onTermChange}
        />
        <CatalogueList
          loadingItems={this.state.loadingProducts}
          items={this.state.products}
          fetchingError={this.state.productsFetchingError}
          addToCart={addToCart}
          term={this.state.term}
        />
      </Fragment>
    )
  }
}

export default Catalogue
