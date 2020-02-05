import React, { createContext, useContext, useReducer } from 'react';
import { notificationReducer, notificationDefault } from './Common/ErrorInfo/notification.reducer'
import { resourceReducer, resourceDefault } from './ResourcePicker/resource.reducer'
import { playerDefault, playerReducer } from './Common/TopBar/player.reducer'
import { listDefault, listReducer } from './FighterList/list.reducer'

export const StateContext = createContext();
export const useStateValue = () => useContext(StateContext);

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