import React, { Component } from 'react'

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const validators = {
  required: value => !value 
    ? 'Required' 
    : undefined,
  email: value => value && !validateEmail(value) 
    ? 'Invalid email'
     : undefined,
}

const validateFieldValue = (rules, value) =>
  rules.reduce((fieldError, rule) => {
    fieldError = validators[rule](value)
    return fieldError
  }, undefined)

const validateFormValues = (validations, values) => {
  const errors = {}
  Object.keys(values).forEach(name => {
    if (validations[name]) {
      const value = values[name]
      const rules = validations[name]
      const fieldError = validateFieldValue(rules, value)
      if (fieldError) {
        errors[name] = fieldError
      }
    }
  })
  return errors
}

const withForm =
  (formSettings = {}) =>
    WrappedComponent =>
      class WithForm extends Component {
        state = {
          errors: {},
          values: formSettings.initialValues
            ? formSettings.initialValues
            : {},
          submitting: false,
          submitted: false,
          valid: false,
          successMessage: '',
          submissionError: '',
        }

        setValue = event => {
          const name = event.target.name
          const value = event.target.value
          
          if (formSettings.validations && formSettings.validations[name]) {
            const rules = formSettings.validations[name]
            const fieldError = validateFieldValue(rules, value)
            if (fieldError) {
              this.setState(state => ({
                errors: {
                  ...state.errors,
                  [name]: fieldError,
                },
                valid: false,
              }))
            } else {
              const { [name]: removedError, ...restErrors } = this.state.errors
              const newState = {
                errors: restErrors, 
              }
              if (Object.keys(restErrors).length === 0) {
                newState.valid = true
              }
              this.setState(newState)
            }
          }

          this.setState(state => ({
            values: {
              ...state.values,
              [name]: value,
            }
          }))
        }

        submit = event => {
          if (event) {
            event.preventDefault()
          }

          this.setState({ submitted: true })

          if(formSettings.validations) {
            const errors = validateFormValues(formSettings.validations, this.state.values)
            if (Object.keys(errors).length > 0) {
              this.setState({
                errors,
                valid: false,
              })
              return
            }
          }

          this.setState({
            submitting: true,
            valid: true,
          })

          if (formSettings.submitHandler) {
            formSettings.submitHandler({
              values: this.state.values,
              setSuccessMessage: successMessage => {
                this.setState({ 
                  submissionError: '',
                  successMessage,
                })
              },
              setSubmissionError: submissionError => {
                this.setState({
                  submissionError,
                  successMessage: '',
                })
              },
              setSubmitting: submitting => {
                this.setState({ submitting })
              }
            })
          }

          this.setState({
            values: formSettings.initialValues
              ? formSettings.initialValues
              : {}
          })
        }

        render() {
          return (
            <WrappedComponent
              values={this.state.values}
              setValue={this.setValue}
              errors={this.state.errors}
              submitted={this.state.submitted}
              submitting={this.state.submitting}
              submit={this.submit}
              valid={this.state.valid}
              successMessage={this.state.successMessage}
              submissionError={this.state.submissionError}
              {...this.props}
            />
          )
        }
      }

export default withForm
