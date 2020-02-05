import React, { useState } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ResourcePicker = ({ resourceName, onResourceSelect }) => {
  const [newResourceName, setNewResourceName] = useState(resourceName);

  return (
    <div css={css`margin-bottom: 20px;`}>
      <input
        type="text"
        value={newResourceName}
        onChange={e => setNewResourceName(e.target.value)}
        onBlur={() => newResourceName !== resourceName && onResourceSelect(newResourceName)}
      />
    </div>
  )
}

export default ResourcePicker 