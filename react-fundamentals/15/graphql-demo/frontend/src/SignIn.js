import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo-hooks'
import Formidable from './components/formidable'

const signInMutation = gql`
  mutation signIn($record: SignInInput!) {
    signIn(record: $record) {
      accessToken
    }
  }
`

const SignIn = () => {
  const signIn = useMutation(signInMutation)

  return (
    <Formidable
      initialValues={{
        email: '',
        password: '',
      }}

      validations={{
        email: ['required'],
        password: ['required'],
      }}

      submitHandler={async ({ values }) => {
        try {
          console.log('values', values)

          const { data } = await signIn({ variables: { record: values } })

          console.log('result', data)

          localStorage.setItem('token', data.signIn.accessToken)
        } catch (e) {
          console.log('error: ', e)
        }
      }}
    >
      {({
        values,
        setValue,
        submit,
      }) => (
        <form onSubmit={submit}>
          <input
            name="email"
            value={values.email}
            onChange={setValue}
          />
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={setValue}
          />

          <button type="submit">Sign in</button>
        </form>
      )}
    </Formidable>
  )
}

export default SignIn
