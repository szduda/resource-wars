import React from 'react'
/** @jsx jsx */
import { jsx, css, } from '@emotion/core'
import { Wrapper } from './Theme'
import { ArrowLeft } from './assets'

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
  background: #6c757d;
  color: #fff;
  z-index: 1;
`}>
    <Wrapper {...props} />
  </div>
)

const ButtonWrapper = props => (
  <div css={css`
  width: 24px;
  height: 24px;
  `} {...props}
  />
)

const BackButton = ({ onClick }) => onClick
  ? (
    <ButtonWrapper>
      <button
        id="BackButton"
        onClick={onClick}>
        <img src={ArrowLeft} alt='back' />
      </button>
    </ButtonWrapper>
  ) : <ButtonWrapper />

const TopBar = ({ wins, fails, onBack }) => (
  <TopBarWrapper>
    <BackButton onClick={onBack} />
    <div>
      <ResultNumber
        number={wins}
        suffix={`win${wins !== 1 ? 's' : ''}`}
      />
      <ResultNumber
        number={fails}
        suffix={`fail${fails !== 1 ? 's' : ''}`}
      />
    </div>
  </TopBarWrapper >
)

export default TopBar