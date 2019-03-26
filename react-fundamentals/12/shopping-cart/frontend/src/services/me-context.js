import React from 'react'

const MeContext = React.createContext( {
  me: null,
  loading: false,
})

export default MeContext