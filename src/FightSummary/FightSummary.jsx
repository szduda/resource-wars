import React, { useState } from 'react'
import {
  useStateValue,
  usePlayerActions,
  useNotificationActions
} from '../StateManager/StateManager'
import { AppWrapper, SectionHeader } from '../Common/Theme'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import TopBar from '../Common/TopBar'
import { ListItem } from '../FighterList/FighterListItem'
import { Name, Power } from '../FighterList/Fighter'
import useRandomFight, { FightResult } from './useRandomFight'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const FighterCard = ({ fighter }) => {
  const { name, power } = fighter
  return (
    <ListItem as='div'>
      <div css={css`
        display: flex;
        margin: 10px 0 10px 20px;
        padding: 10px 20px;
        flex-wrap: wrap;

        > * {
          flex-basis: 240px;
        }
        `}>
        <Name>{name}</Name>
        <Power>{power}</Power>
      </div>
    </ListItem>
  )
}

const VS = () => (
  <span css={css`
  padding: 20px;
  align-self: center;
  `}>
    vs
  </span>
)

const FightSummary = () => {
  const [{ resource, list, player }, dispatch] = useStateValue()
  const actions = {
    ...usePlayerActions(dispatch),
    ...useNotificationActions(dispatch)
  }
  const { items, attribute } = resource
  const { previewId: allyName } = list
  const { wins, fails } = player

  const [enemyCard, setEnemyCard] = useState({})
  const [allyCard, setAllyCard] = useState({})
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
      = useRandomFight(items, attribute, ally)

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
      <TopBar {...{ wins, fails }} />
      <AppWrapper>

        <SectionHeader>
          Fight summary
        </SectionHeader>

        <FighterCard fighter={allyCard} />
        <VS />
        <FighterCard fighter={enemyCard} />

        <FightResultText />

        <Button onClick={fight} variant="secondary">
          One more fight
        </Button>

      </AppWrapper>
    </>
  )
}

export default FightSummary