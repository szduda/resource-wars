import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Card from '@material-ui/core/Card'

export const Name = props => (
  <h2 css={css`margin: 0 0 20px; 0`} {...props} />
)

export const Power = props => (
  <Label>
    <h3>Power</h3>
    <span {...props} />
  </Label>
)

export const FighterCard = ({ fighter }) => {
  const { name, power } = fighter
  return (
    <FighterWrapper>
      <Name css={css`flex-grow: 0.7;`}>{name}</Name>
      <Power>{power}</Power>
    </FighterWrapper>
  )
}

const FighterWrapper = props => (
  <Card css={css`
  padding: 20px 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > * {
    flex-basis: 180px;
  }
  `} {...props} />
)

const Label = props => (
  <label css={css`
  margin: 0;
  display: flex;
  flex-direction: column;
  `} {...props} />
)