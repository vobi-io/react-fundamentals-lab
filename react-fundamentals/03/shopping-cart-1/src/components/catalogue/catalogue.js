import React, { Component, Fragment } from 'react'
import Search from './search'
import CatalogueList from './list'

class Catalogue extends Component {
  state = {
    term: ''
  }

  onTermChange = e => {
    this.setState({
      term: e.target.value,
    })
  }

  // componentDidMount() {
    // getData().then(result => {
    //   this.setState({ items: result.items })
    // })
    // console.log('Catalogue have mounted')
  // }

  // shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps)
    // console.log(nextState)

    // return true
  // }
  
  render() {
    const { addToCart, items } = this.props

    return (
      <Fragment>
        <h2>Product Catalogue</h2>
        <Search
          value={this.state.term}
          onChange={this.onTermChange}
        />
        <CatalogueList
          items={items}
          addToCart={addToCart}
          term={this.state.term}
        />
      </Fragment>
    )
  }
}

export default Catalogue
