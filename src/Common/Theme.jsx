import React from 'react'
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'

const Styles = () => (
  <Global styles={css`
    body {
      background: #F5F6FB;
      font-family: 'Roboto', sans-serif;
    }

    p, a {
      font-size: 16px;
      line-height: 1.4;
      font-weight: 400;
    }

    a:hover {
      color: #fff;
    }

    p {
      margin: 0 0 20px 0;

      &:last-of-type {
        margin: 0;
      }
    }

    h1 {
      font-size: 16px;
      line-height: 1.5;
      font-weight: 500;
      color: #6c757d;
      margin: 0;
    }

    h2 {
      font-size: 16px;
      line-height: 1.5;
      font-weight: 700;
      margin: 0;
    }

    h3{
      font-size: 16px;
      line-height: 1.5;
      font-weight: 500;
      color: #6c757d;
      margin: 0;
    }

    button {
      text-align: inherit;
      font: inherit;
      background: none;
      border: none;
      margin: 0;
      padding: 0;
    }

    .modal-content {
      padding: 14px;
      background: #F5F6FB;
    }

    @media (max-width: 639px) {
      .modal-content {
        padding: 4px;
        height: 100%;
        border-radius: 0;
      }

      .modal-body {
        overflow: scroll;
      }

      .modal-dialog {
        margin: 0 auto;
        height: 100%;
      }
    }
  `} />
)

export const AppWrapper = props => (
  <>
    <Styles />
    <div css={css`
      max-width: 1080px; 
      padding: 20px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `} {...props} />
  </>
)

export const Wrapper = props => (
  <div css={css`
  width: 100%;
  max-width: 1080px; 
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  `} {...props} />
)

export const SectionHeader = props => (
  <h1 css={css`margin: 0 20px 20px 0;`} {...props} />
)

export const Row = props => (
  <div css={css`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  `} {...props} />
)