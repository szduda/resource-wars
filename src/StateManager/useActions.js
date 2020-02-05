export const useActions = (dispatch, actionList) => {
  let actions = {}
  Object.keys(actionList).map(action => {
    actions = {
      ...actions,
      [action]: args => dispatch(actionList[action](args))
    }
  })
  return actions
}