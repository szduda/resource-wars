export const FightResult = {
  DRAW: 'draw',
  FAIL: 'fail',
  WIN: 'win'
}

const randomSort = () => Math.round(Math.random()) * 2 - 1

const getFightResult = (allyPower, enemyPower) => {
  let result = FightResult.FAIL
  if (allyPower === enemyPower)
    result = FightResult.DRAW

  if (allyPower > enemyPower)
    result = FightResult.WIN

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
    return null
  } else return {
    name: enemy.name,
    power: enemy[attribute],
    win: false
  }
}

const useRandomFight = (items, attribute, ally) => {

  const allyCard = {
    name: ally.name,
    power: ally[attribute],
    win: false
  }

  const enemyCard = findEnemy(
    items,
    ally.name,
    attribute)

  const allyResult = enemyCard
    ? getFightResult(
      Number(allyCard.power),
      Number(enemyCard.power))
    : 'noEnemy'

  return { allyCard, enemyCard, allyResult }
}

export default useRandomFight