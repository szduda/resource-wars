export const notificationDefault = ''

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload
    case 'clearNotification':
      return ''
    default:
      return state;
  }
}

export const notificationActions = {
  setNotification: notification => ({
    type: 'setNotification',
    payload: notification
  })
}