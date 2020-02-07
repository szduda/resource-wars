import React, { useState } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';

const ResourcePicker = ({
  availableResources,
  resourceName,
  onResourceSelect,
  loading
}) => {
  if (!availableResources) return null

  return (
    <FormControl disabled={loading}>
      <Select
        css={css`min-width: 230px; margin-bottom: 20px;`}
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
    </FormControl>
  )
}

export default ResourcePicker 