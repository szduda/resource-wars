import React from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import ErrorNotFound from './Common/e404';
import FighterList from './FighterList/FighterList'
import FightSummary from './FightSummary/FightSummary'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={FighterList} />
      <Route path='/fight' component={FightSummary} />
      <Route path="/error" component={ErrorNotFound} />
      <Redirect to="/error" />
    </Switch>
  </BrowserRouter>
)