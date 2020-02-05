export const playerDefault = ({
  wins: 0,
  fails: 0
})

export const playerReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case 'registerFight':
      const winsModifier = payload === 'win' && 1 || 0
      const failsModifier = payload === 'fail' && 1 || 0
      return {
        wins: state.wins + winsModifier,
        fails: state.fails + failsModifier
      }
    default:
      return state;
  }
}

export const playerActions = {
  registerFight: allyResult => ({
    type: 'registerFight',
    payload: allyResult
  })
}