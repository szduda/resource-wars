import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();
export const useStateValue = () => useContext(StateContext);

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

const initialState = {
  notification: '',
  player: {
    wins: 0,
    fails: 0
  },
  resource: {
    name: 'starships',
    attribute: 'crew',
    items: [],
    page: 1,
    total: 0,
    dataState: 'readyToLoad',
    available: {
      'starships': 'crew',
      'people': 'mass',
    }
  },
  list: {
    previewId: null,
  }
}

const reducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case 'setNotification':
      return {
        ...state,
        notification: payload
      }
    case 'loadResourcePage':
      return {
        ...state,
        resource: {
          ...state.resource,
          items: [
            ...state.resource.items,
            ...payload.items
          ],
          total: payload.total
        }
      }
    case 'setNextPage':
      return {
        ...state,
        resource: {
          ...state.resource,
          page: state.resource.page + 1
        }
      }
    case 'setPreview':
      return {
        ...state,
        list: {
          ...state.list,
          previewId: payload
        }
      }
    case 'setDataState':
      return {
        ...state,
        resource: {
          ...state.resource,
          dataState: payload
        }
      }
    case 'setResourceName':
      return {
        ...state,
        resource: {
          ...state.resource,

          name: payload,
          attribute: state.resource.available[payload],

          dataState: initialState.resource.dataState,
          items: initialState.resource.items,
          page: initialState.resource.page,
          total: initialState.resource.total,
        }
      }
    case 'registerFight':
      const winsModifier = payload === 'win' && 1 || 0
      const failsModifier = payload === 'fail' && 1 || 0
      return {
        ...state,
        player: {
          wins: state.player.wins + winsModifier,
          fails: state.player.fails + failsModifier
        }
      }
    default:
      return state;
  }
}

export default props => (
  <StateProvider  {...{ initialState, reducer, ...props }} />
)