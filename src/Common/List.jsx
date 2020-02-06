import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Button } from 'react-bootstrap'
import { DataState } from '../StateManager/definitions/resource.state'

export const ListItem = props => {
  const Tag = props.as || 'li'
  return (
    <Tag css={css`
   border-radius: 8px;
   background: #fff;
   width: 100%;
   &:not(:last-of-type) {
     margin-bottom: 10px;
   }
   `} {...props} />
  )
}

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

export const PagedList = ({
  children,
  onLoadMore,
  dataState = DataState.EMPTY
}) => {
  const isLoading = dataState === DataState.LOADING
  const isEmpty = dataState === DataState.EMPTY
  const endOfData = dataState === DataState.END_OF_DATA

  return isEmpty
    ? 'Nothing to display'
    : (
      <>
        <List>
          {children}
        </List>

        <div
          id="Pager"
          css={css`
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