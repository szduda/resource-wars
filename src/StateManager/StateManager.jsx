import React, { createContext, useContext, useReducer } from 'react';
import { useActions } from "./useActions";
import {
  notificationReducer,
  notificationDefault,
  notificationActions
} from './notification.state'
import {
  resourceReducer,
  resourceDefault,
  resourceActions
} from './resource.state'
import {
  playerDefault,
  playerReducer,
  playerActions
} from './player.state'
import {
  listDefault,
  listReducer,
  listActions
} from './list.state'

export const StateContext = createContext();
export const useStateValue = () => useContext(StateContext);

export const useNotificationActions = dispatch =>
  useActions(dispatch, notificationActions)
export const useResourceActions = dispatch =>
  useActions(dispatch, resourceActions)
export const useListActions = dispatch =>
  useActions(dispatch, listActions)
export const usePlayerActions = dispatch =>
  useActions(dispatch, playerActions)

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

const initialState = {
  notification: notificationDefault,
  player: playerDefault,
  resource: resourceDefault,
  list: listDefault,
}

const reducer = ({ player, resource, list, notification }, action) => ({
  player: playerReducer(player, action),
  resource: resourceReducer(resource, action),
  list: listReducer(list, action),
  notification: notificationReducer(notification, action),
})

export default props => (
  <StateProvider  {...{ initialState, reducer, ...props }} />
)