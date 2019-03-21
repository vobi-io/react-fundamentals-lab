import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap'
import axios from 'axios'
import withForm from '../hocs/with-form'

const FieldError = styled.span`
  color: red;
`

const SignUp = ({
  values,
  errors,
  setValue,
  submitted,
  submitting,
  valid,
  submit,
  successMessage,
  submissionError,
  getFirstError,
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
      <Label>First name</Label>
      <Input
        name="firstName"
        value={values.firstName}
        onChange={setValue}
      />
      {submitted && errors.firstName && (
        <FieldError>{getFirstError('firstName')}</FieldError>
      )}
    </FormGroup>
    <FormGroup>
      <Label>Last name</Label>
      <Input
        name="lastName"
        value={values.lastName}
        onChange={setValue}
      />
      {submitted && errors.lastName && (
        <FieldError>{getFirstError('lastName')}</FieldError>
      )}
    </FormGroup>
    <FormGroup>
      <Label>Email</Label>
      <Input
        name="email"
        value={values.email}
        onChange={setValue}
      />
      {submitted && errors.email && (
        <FieldError>{getFirstError('email')}</FieldError>
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
        <FieldError>{getFirstError('password')}</FieldError>
      )}
    </FormGroup>
    <FormGroup>
      <Label>Confirm password</Label>
      <Input
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={setValue}
      />
      {submitted && errors.confirmPassword && (
        <FieldError>{getFirstError('confirmPassword')}</FieldError>
      )}
    </FormGroup>

    <Button
      disabled={submitting 
        || (submitted && !valid)}
    >
      {submitting ? 'Saving...' : 'Save'}
    </Button>
  </Form>
)

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default withForm({
  initialValues,
  validations: {
    firstName: ['required'],
    lastName: ['required'],
    email: ['required', 'email'],
    password: ['required'],
    confirmPassword: ['required'],
  },
  submitHandler: async ({ values, setValues, setSubmissionError, setSubmitting, setValid, setSuccessMessage }) => {
    try {
      console.log('submitting...')
      const result = await axios.post(
        'http://localhost:8080/sign-up',
        values
      )
      console.log('result', result)
      setSuccessMessage('You registered successfully')
      setValues(initialValues)
    } catch (e) {
      const { data: { error } } = e.response
      setSubmissionError(error)
      setValues({ password: '', confirmPassword: '' })
    } finally {
      setValid(true)
      setSubmitting(false)
    }
  }
})(SignUp)
