import React, { useState } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const ResourcePicker = ({
  availableResources,
  resourceName,
  onResourceSelect
}) => {
  if (!availableResources) return null

  return (
    <div css={css`margin-bottom: 20px;`}>
      <Select
        css={css`min-width: 230px;`}
        id="ResourcePicker"
        value={resourceName}
        onChange={e => {
          const newValue = e.target.value
          if (newValue !== resourceName)
            onResourceSelect(e.target.value)
        }}
      >
        {Object.keys(availableResources).map((resource, index) => (
          <MenuItem
            key={`resource-${index}`}
            value={resource}
          >
            {resource}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default ResourcePicker 