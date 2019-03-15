import React from 'react'

const ChildrenTest = props => {
  console.log('props', props)

  return (
    <div>{props.children()}</div>
  )
}

export default ChildrenTest
