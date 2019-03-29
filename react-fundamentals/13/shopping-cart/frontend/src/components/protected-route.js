import React, { useContext } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import MeContext from '../services/me-context'

const ProtectedRoute = ({ hasRoles, ...restProps }) => {
  const { me, loading } = useContext(MeContext)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!me) {
    return <Redirect to="/sign-in" />
  }

  // if (hasRoles) {
  //   if (!me.roles) {
  //     console.log('redirecting to sign in')
  //     return <Redirect to="/sign-in" />
  //   }

  //   let hasAccess = false

  //   hasRoles.forEach(role => {
  //     if (me.roles.includes(role)) {
  //       hasAccess = true
  //     }
  //   })

  //   if (!hasAccess) {
  //     return <Redirect to="/sign-in" />
  //   }
  // }

  return <Route {...restProps} />
}

export default withRouter(ProtectedRoute)
