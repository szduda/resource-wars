import React, { useState } from 'react'
import { useStateValue } from '../StateManager'
import { AppWrapper, SectionHeader } from '../Common/Theme'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import TopBar from '../Common/TopBar'
import { ListItem } from '../FighterList/FighterListItem'
import { Name, Power } from '../FighterList/Fighter'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

///////////////// controller

const randomSort = () => Math.round(Math.random()) * 2 - 1

const getFightResult = (allyPower, enemyPower) => {
  let result = 'fail'
  if (allyPower === enemyPower)
    result = 'draw'

  if (allyPower > enemyPower)
    result = 'win'

  return result
}

const findEnemy = (items, allyName, attribute) => {
  const enemy = items
    .sort(randomSort)
    .find(x => x.name !== allyName)

  if (!enemy) {
    dispatch({
      type: 'setNotification',
      payload: 'There is no one to fight with.'
    })
    return <Redirect to="/" />
  } else return {
    name: enemy.name,
    power: enemy[attribute],
    win: false
  }
}

////////////////////////

const FighterListItem = ({ fighter }) => {
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
    ///////////////// 
    // const {allyCard, enemyCard, allyResult} 
    // = useRandomFight(items, attribute, ally)
    /////////////////
    const allyCard = {
      name: ally.name,
      power: ally[attribute],
      win: false
    }
    const enemyCard = findEnemy(items, allyName, attribute)
    const allyResult = getFightResult(
      Number(allyCard.power),
      Number(enemyCard.power)
    )
    ////////////

    dispatch({
      type: 'registerFight',
      payload: allyResult
    })

    setAllyCard({ ...allyCard, win: allyResult === 'win' })
    setEnemyCard({ ...enemyCard, win: allyResult === 'fail' })
    if (allyResult === 'draw') setDraw(true)
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

        <FighterListItem fighter={allyCard} />
        <VS />
        <FighterListItem fighter={enemyCard} />

        <FightResultText />

        <Button onClick={fight} variant="secondary">
          One more fight
        </Button>

      </AppWrapper>
    </>
  )
}

export default FightSummary