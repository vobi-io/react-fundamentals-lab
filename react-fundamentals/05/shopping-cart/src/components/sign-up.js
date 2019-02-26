import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'

const FieldError = styled.span`
  color: red;
`

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const validate = values => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = 'Required'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  }

  if (values.password && values.confirmPassword 
    && values.password !== values.confirmPassword) {
    errors.password = 'Passwords did not match'
  }

  return errors
}

class SignUp extends Component {
  state = {
    errors: {},
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    submitting: false,
    submitted: false,
    valid: false,
  }

  clearForm = () => {
    this.setState({
      values: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      submitting: false,
      submitted: false,
      valid: false,
    })
  }

  setValue = event => {
    const value = event.target.value
    const name = event.target.name

    if (!value) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: 'Required',
        } 
      }))
    } else {
      let fieldError = null

      if (name === 'email') {
        if (!validateEmail(value)) {
          fieldError = 'Invalid email'
        }
      }

      if (
        (name === 'password' && this.state.values.confirmPassword
        && value !== this.state.values.confirmPassword)
        ||
        (name === 'confirmPassword' && this.state.values.password
        && value !== this.state.values.password)
      ) {
        fieldError = 'Passwords did not match'
      }

      if (fieldError) {
        this.setState(state => ({
          errors: {
            ...state.errors,
            [name]: fieldError,
          } 
        }))
      } else {
        const { [name]: removedError, ...restErrors } = this.state.errors
        this.setState({
          errors: restErrors, 
        })
      }
    }

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value,
      }
    }))

    if (Object.keys(this.state.errors).length > 0) {
      this.setState({
        valid: false,
      })
    } else {
      this.setState({
        valid: true,
      })
    }
  }

  save = event => {
    event.preventDefault()

    this.setState({ submitted: true })

    const errors = validate(this.state.values)
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
        valid: false,
      })
      return
    }

    this.setState({
      submitting: true,
      valid: true,
    })

    setTimeout(() => {
      this.clearForm()
    }, 2000)

    console.log('values', this.state.values)
  }

  render() {
    return (
      <Form onSubmit={this.save}>
        <FormGroup>
          <Label>First name</Label>
          <Input
            name="firstName"
            value={this.state.values.firstName}
            onChange={this.setValue}
          />
          {this.state.submitted && this.state.errors.firstName && (
            <FieldError>{this.state.errors.firstName}</FieldError>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Last name</Label>
          <Input
            name="lastName"
            value={this.state.values.lastName}
            onChange={this.setValue}
          />
          {this.state.submitted && this.state.errors.lastName && (
            <FieldError>{this.state.errors.lastName}</FieldError>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            name="email"
            value={this.state.values.email}
            onChange={this.setValue}
          />
          {this.state.submitted && this.state.errors.email && (
            <FieldError>{this.state.errors.email}</FieldError>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={this.state.values.password}
            onChange={this.setValue}
          />
          {this.state.submitted && this.state.errors.password && (
            <FieldError>{this.state.errors.password}</FieldError>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Confirm password</Label>
          <Input
            name="confirmPassword"
            type="password"
            value={this.state.values.confirmPassword}
            onChange={this.setValue}
          />
          {this.state.submitted && this.state.errors.confirmPassword && (
            <FieldError>{this.state.errors.confirmPassword}</FieldError>
          )}
        </FormGroup>

        <Button
          disabled={this.state.submitting 
            || (this.state.submitted && !this.state.valid)}
        >
          {this.state.submitting ? 'Saving...' : 'Save'}
        </Button>
      </Form>
    )
  }
}

export default SignUp
