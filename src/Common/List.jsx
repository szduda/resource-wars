import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Button } from 'react-bootstrap'

export const List = props => (
  <ul css={css`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    `}
    {...props} />
)

export const PagedList = ({ children, onLoadMore, dataState = 'empty' }) => {
  const isLoading = dataState === 'loading'
  const isEmpty = dataState === 'empty'
  const endOfData = dataState === 'endOfData'

  return isEmpty
    ? 'Nothing to display'
    : (
      <>
        <List>
          {children}
        </List>

        <div css={css`
        align-self: center;
        margin-top: 20px;`}
        >
          {endOfData
            ? 'You have loaded all the data'
            : (
              <Button
                id="LoadMoreButton"
                onClick={() => !isLoading && onLoadMore()}
              >
                {isLoading ? 'Loading...' : 'Load more'}
              </Button>
            )
          }
        </div>
      </>
    )
}