import React from 'react'
import useForm from '../hooks/useForm'

const Profile = () => {
  const { values, setValue } = useForm({
    initialValues: {
      firstName: 'Kote'
    }
  })

  console.log('values', values)

  return (
    <div>
      Profile!

      <button onClick={() => {
        setValue({ firstName: 'Konstantine' })
      }}>Change first name!</button>
    </div>
  )
}

export default Profile
