import React, { useState } from 'react'
import {
  useStateValue,
  usePlayerActions,
  useNotificationActions
} from '../StateManager/StateManager'
import { AppWrapper, SectionHeader } from '../Common/Theme'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TopBar from '../Common/TopBar'
import { Name, Power } from '../Common/Fighter'
import useRandomFight, { FightResult } from './useRandomFight'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FighterCard } from '../Common/Fighter'

export const VS = () => (
  <span css={css`
  padding: 20px;
  align-self: center;
  `}>
    vs
  </span>
)

export const FightSummary = () => {
  const [{ resource, list, player }, dispatch] = useStateValue()
  const actions = {
    ...usePlayerActions(dispatch),
    ...useNotificationActions(dispatch)
  }
  const { items } = resource
  const { previewId: allyName } = list
  const { wins, fails } = player

  const [enemyCard, setEnemyCard] = useState({})
  const [allyCard, setAllyCard] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [draw, setDraw] = useState(false)

  const ally = items
    .find(x => x.name === allyName)

  if (!ally)
    return <Redirect to="/" />

  const FightResultText = () => (
    <span css={css`padding: 20px 0;`}>
      {allyCard.win && 'You won!'}
      {enemyCard.win && 'You lost!'}
      {draw && 'Draw.'}
    </span>
  )

  const fight = () => {
    setDraw(false)
    const { allyCard, enemyCard, allyResult }
      = useRandomFight(items, ally)

    if (allyResult === FightResult.NO_ENEMY) {
      actions.setNotification('There is no one to fight with.')
      return
    }

    actions.registerFight(allyResult)

    setAllyCard(allyCard)
    setEnemyCard(enemyCard)
    if (allyResult === FightResult.DRAW) setDraw(true)
  }

  if (!enemyCard.name)
    fight()

  return (
    <>
      {redirect && <Redirect to='/' />}
      <TopBar wins={wins} fails={fails} onBack={() => setRedirect(true)} />
      <AppWrapper>

        <SectionHeader>
          Fight summary
        </SectionHeader>

        <FighterCard fighter={allyCard} />
        <VS />
        <FighterCard fighter={enemyCard} />

        <FightResultText />

        <Button onClick={fight} variant="contained" color="secondary">
          One more fight
        </Button>

      </AppWrapper>
    </>
  )
}

export default FightSummary