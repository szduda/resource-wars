export const listDefault = ({
  previewId: null
})

export const listReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case 'setPreview':
      return {
        ...state,
        previewId: payload
      }
    default:
      return state;
  }
}

export const listActions = {
  setPreview: id => ({
    type: 'setPreview',
    payload: id
  })
}