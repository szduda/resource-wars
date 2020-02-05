import React, { useState } from 'react'
import { useStateValue } from '../StateManager'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ResourcePicker = () => {
  const [{ resource }, dispatch] = useStateValue()
  const { name: resourceName } = resource
  const [newResourceName, setNewResourceName] = useState(resourceName);

  const updateResourceName = () => {
    dispatch({
      type: 'setResourceName',
      payload: newResourceName
    })
  }

  return (
    <div css={css`margin-bottom: 20px;`}>
      <input
        type="text"
        value={newResourceName}
        onChange={e => setNewResourceName(e.target.value)}
        onBlur={() => newResourceName !== resourceName && updateResourceName()}
      />
    </div>
  )
}

export default ResourcePicker 