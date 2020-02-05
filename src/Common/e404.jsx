import React from 'react'
import { AppWrapper } from './Theme'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

export default () => (
  <AppWrapper>
    <div css={css`
      display: flex; 
      align-items: center;
      flex-direction: column;
      justify-content: center;
      align-self: center;
      height: 100%;
      margin-top: 100px;

      > * {
        text-align: center;
        padding: 0;
        line-height: 1;
        margin: 0;
      }

      h1 {
        font-size: 90px;
        color: #6297F3;
      }

      h2 {
        font-size: 32px;
      }
      a {
        border: 1px solid #6297F3;
        color: #6297F3;
        border-radius: 8px;
        font-size: 16px;
        padding: 10px 20px;
        display: block;
        margin-top: 40px;
      }
    `}>
      <div><h1>OOPS!</h1></div>
      <div><h2>We can't find the page you're looking for.</h2></div>
      <div><a href="/">Visit homepage</a></div>
    </div>
  </AppWrapper>
)