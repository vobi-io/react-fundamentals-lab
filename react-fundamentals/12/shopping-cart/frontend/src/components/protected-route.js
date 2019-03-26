import React, { useContext } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import MeContext from '../services/me-context'

const ProtectedRoute = props => {
  const { me, loading } = useContext(MeContext)

  console.log('loading', loading)
  console.log('me', me)
  // console.log('props.meContext', props.meContext)
  if (loading) {
    return <div>Loading...</div>
  }

  // if (!me) {
  //   props.history.push('/sign-in')
  //   return null
  // }

  return me 
    ? <Route {...props} />
    : <Redirect to="/sign-in" />
}

export default withRouter(ProtectedRoute)
