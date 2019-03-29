import React from 'react'

const MeContext = React.createContext({
  me: null,
  loading: true,
})

export default MeContext