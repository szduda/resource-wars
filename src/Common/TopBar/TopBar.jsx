import React from 'react'
/** @jsx jsx */
import { jsx, css, } from '@emotion/core'
import { Wrapper } from '../Theme'

const ResultNumber = ({ number, suffix }) => (
  <span css={css`margin-right: 10px;`}>
    <span css={css`font-weight: 500;`}>
      {number}
    </span>
    <span css={css`
    font-size: 14px; 
    margin-left: 5px;`
    }>
      {suffix}
    </span>
  </span>
)

const TopBarWrapper = props => (
  <div css={css`
  position: sticky;
  top: 0;
  width: 100%;
  background: #6c757d;
  color: #fff;
  height: 100%;
  align-items: center;
`}>
    <Wrapper {...props} />
  </div>
)

const TopBar = ({ wins, fails }) => (
  <TopBarWrapper>
    <ResultNumber number={wins} suffix="wins" />
    <ResultNumber number={fails} suffix="fails" />
  </TopBarWrapper >
)

export default TopBar