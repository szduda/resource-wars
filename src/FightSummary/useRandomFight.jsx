export const FightResult = {
  DRAW: 'draw',
  FAIL: 'fail',
  WIN: 'win',
  NO_ENEMY: 'noEnemy'
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

const findEnemy = (items, allyName) => {
  let enemy = items
    .sort(randomSort)
    .find(x => x.name !== allyName)

  if (!enemy) return null
  else return { ...enemy, win: false }
}

const useRandomFight = (items, ally) => {
  const allyCard = { ...ally, win: false }
  const enemyCard = findEnemy(items, ally.name)

  if (!enemyCard)
    return { allyCard, enemyCard, allyResult: null }

  const allyResult = enemyCard
    ? getFightResult(
      Number(allyCard.power),
      Number(enemyCard.power))
    : FightResult.NO_ENEMY

  if (allyResult === FightResult.WIN)
    allyCard.win = true
  if (allyResult === FightResult.FAIL)
    enemyCard.win = true

  return { allyCard, enemyCard, allyResult }
}

export default useRandomFight