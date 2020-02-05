import React, { useState } from 'react'
/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core'

const ErrorInfo = ({ error, close }) => error
  ? (
    <div css={css`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #ff5e00;
    display: flex;
    color: #fff;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;
  `}>
      <span>
        {error}
      </span>
      <button
        onClick={close}
        css={css`
        background: none;
        border: none;
        color: #fff;`}
      >
        x
      </button>
    </div>
  )
  : null

export default ErrorInfo