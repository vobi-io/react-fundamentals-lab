import { useState, useEffect } from 'react'
import axios from 'axios'

const useProducts = () => {
  const [productsState, setProductsState] = useState({
    items: [],
    loading: false,
    error: '',
  })
  
  const [term, setTerm] = useState('')
  
  let delayId = null

  const clearTimeoutId = delayId => {
    clearTimeout(delayId)
  }

  useEffect(() => {
    if (delayId) {
      clearTimeoutId(delayId)
    }
    delayId = setTimeout(() => {
      fetchProducts()
    }, 500)

    return () => {
      if (delayId) {
        clearTimeoutId(delayId)
      }
    }
  }, [term])

  const fetchProducts = () => {
    setProductsState({
      ...productsState,
      loading: true,
    })
    axios.get('http://localhost:8080/products', {
      params: { term }
    })
      .then(res => {
        setProductsState({
          ...productsState,
          loading: false,
          items: res.data.data,
        })
      })
      .catch(err => {
        setProductsState({
          ...productsState,
          loading: false,
          error: 'Oops! Something goes wrong : ('
        })
        console.log('err', err)
      })
  }
  
  const onTermChange = e => {
    setTerm(e.target.value)
  }

  return {
    products: productsState.items,
    loading: productsState.loading,
    error: productsState.error,
    term,
    onTermChange,
  }
}

export default useProducts