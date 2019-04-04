import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import App from './App'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  headers: {
    authorization: localStorage.getItem('token')
      ? localStorage.getItem('token')
      : ''
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>
  ,
  document.getElementById('root')
)
