import React from 'react'
import StateManager from './StateManager'
import Router from './Router'
import ResourceProvider from './Resource/ResourceProvider'


export default () => (
  <StateManager>
    <ResourceProvider />
    <Router />
  </StateManager>
)