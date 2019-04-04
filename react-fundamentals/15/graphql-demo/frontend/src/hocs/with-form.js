import React, { Component } from 'react'
import Formidable from '../components/formidable'

const withForm =
  (formSettings = {}) =>
    WrappedComponent =>
      () => (
        <Formidable
          initialValues={
            formSettings.initialValues
              ? formSettings.initialValues
              : {}
          }
          validations={
            formSettings.validations
              ? formSettings.validations
              : {}
          }
          submitHandler={
            formSettings.submitHandler
              ? formSettings.submitHandler
              : null
          }
        >
          {props => <WrappedComponent {...props} />}
        </Formidable>
      )

export default withForm
