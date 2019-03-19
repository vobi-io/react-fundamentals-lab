import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
`

const CatalogueSearch = ({ value, onChange }) => (
  <StyledInput
    value={value}
    onChange={onChange}
  />
)

export default CatalogueSearch
