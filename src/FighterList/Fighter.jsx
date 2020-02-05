import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const Label = props => (
  <label css={css`
  margin: 0;
  display: flex;
  flex-direction: column;
  `} {...props} />
)

export const Name = props => (
  <h2 css={css`margin: 0 0 20px; 0`} {...props} />
)

export const Power = props => (
  <Label>
    <h3>Power</h3>
    <span {...props} />
  </Label>
)