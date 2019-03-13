import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap'
import axios from 'axios'
import withForm from '../hocs/with-form'

// const dataArr = [
//   {
//     title: 'Title 1',
//     desc: 'Desc 1',
//   },
//   {
//     title: 'Title 2',
//     desc: 'Desc 2',
//   },
// ]
// const dataArr2 = [
//   {
//     title: 'Ragaca',
//     desc: 'Ragaca Desc',
//     price: 100
//   },
//   {
//     title: 'Ragaca',
//     desc: 'Ragaca Desc',
//     price: 100
//   },
//   {
//     title: 'Title 17',
//     desc: 'Desc 17',
//     price: 100
//   },
// ]
// const findBy =
//   property => 
//     value =>
//       data =>
//         data.filter(i => i[property] === value)

// function findBy(property) {
//   return function (value) {
//     return function (data) {
//       return data.filter(i => i[property] === value)
//     }
//   }
// }
// const findByTitle = findBy('title')
// const findByDesc = findBy('desc')
// const findByPrice = findBy('price')
// const findByPrice100 = findByPrice(100)

// const res = findByPrice100(dataArr2)
// console.log('res', res)

// const validate = values => {
//   const errors = {}

//   if (!values.firstName) {
//     errors.firstName = 'Required'
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required'
//   }

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!validateEmail(values.email)) {
//     errors.email = 'Invalid email'
//   }

//   if (!values.password) {
//     errors.password = 'Required'
//   }

//   if (!values.confirmPassword) {
//     errors.confirmPassword = 'Required'
//   }

//   if (values.password && values.confirmPassword 
//     && values.password !== values.confirmPassword) {
//     errors.password = 'Passwords did not match'
//   }

//   return errors
// }

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
        <FieldError>{errors.firstName}</FieldError>
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
        <FieldError>{errors.lastName}</FieldError>
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
    <FormGroup>
      <Label>Confirm password</Label>
      <Input
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={setValue}
      />
      {submitted && errors.confirmPassword && (
        <FieldError>{errors.confirmPassword}</FieldError>
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

export default withForm({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  validations: {
    firstName: ['required'],
    lastName: ['required'],
    email: ['required', 'email'],
    password: ['required'],
    confirmPassword: ['required'],
  },
  submitHandler: async ({ values, setSubmissionError, setSubmitting, setSuccessMessage }) => {
    try {
      const result = await axios.post(
        'http://localhost:8080/sign-up',
        values
      )
      setSuccessMessage('You registered successfully')
    } catch (e) {
      const { data: { error } } = e.response
      setSubmissionError(error)
    } finally {
      setSubmitting(false)
    }
  }
})(SignUp)
