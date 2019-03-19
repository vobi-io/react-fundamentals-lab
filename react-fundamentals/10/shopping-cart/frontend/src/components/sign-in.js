import React from 'react'
import styled from 'styled-components'
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap'
import axios from 'axios'
// import withForm from '../hocs/with-form'
import Formidable from './formidable'
// import useForm from '../hooks/useForm'

const FieldError = styled.span`
  color: red;
`
const SignIn = () => {
  // const {
  //   values,
  //   errors,
  //   setValue,
  //   submitted,
  //   submitting,
  //   valid,
  //   submit,
  //   successMessage,
  //   submissionError,
  // } = useForm({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validations: {
  //     email: ['required', 'email'],
  //     password: ['required'],
  //   },
  //   submitHandler: async ({ values, setSubmissionError, setSubmitting, setSuccessMessage }) => {
  //     try {
  //       const result = await axios.post(
  //         'http://localhost:8080/sign-in',
  //         values
  //       )
  //       setSuccessMessage('You have logged in')
  //     } catch (e) {
  //       const { data: { error } } = e.response
  //       setSubmissionError(error)
  //     } finally {
  //       setSubmitting(false)
  //     }
  //   }
  // })

  return (
    <Formidable
      initialValues={{
        email: '',
        password: '',
      }}

      validations={{
        email: ['required', 'email'],
        password: ['required'],
      }}

      submitHandler={async ({ values, setSubmissionError, setSubmitting, setSuccessMessage }) => {
        try {
          const result = await axios.post(
            'http://localhost:8080/sign-in',
            values
          )
          setSuccessMessage('You have logged in')
        } catch (e) {
          const { data: { error } } = e.response
          setSubmissionError(error)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({
        values,
        errors,
        setValue,
        submitted,
        submitting,
        valid,
        submit,
        successMessage,
        submissionError,
      }) => (
        <Form onSubmit={submit}>
          {successMessage && (
            <Alert color="success">
              {successMessage}
            </Alert>
          )}
          {submissionError && (
            <Alert color="danger">
              {submissionError}
            </Alert>
          )}
          <FormGroup>
            <Label>Email</Label>
            <Input
              name="email"
              value={values.email}
              onChange={setValue}
            />
            {submitted && errors.email && (
              <FieldError>{errors.email}</FieldError>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={setValue}
            />
            {submitted && errors.password && (
              <FieldError>{errors.password}</FieldError>
            )}
          </FormGroup>

          <Button
            disabled={submitting 
              || (submitted && !valid)}
          >
            {submitting ? 'Logging...' : 'Log in'}
          </Button>
        </Form>
      )}
    </Formidable>
  )
}

export default SignIn
