import { useReducer } from 'react'

export const NEW_VALUE = 'newValue'

const formReducer = (state, action) => {
  switch (action.type) {
    case NEW_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        }
      }
    default:
      return state
  }
}

const useForm = ({ initialValues }) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues
      ? initialValues
      : {}
  })

  const setValue = payload => {
    dispatch({
      type: NEW_VALUE,
      payload,
    })
  }

  return {
    setValue,
    values: state.values,
  }
}

export default useForm
