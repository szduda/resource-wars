export const resourceDefault = ({
  name: 'starships',
  attribute: 'crew',
  items: [],
  page: 1,
  total: 0,
  dataState: 'readyToLoad',
  available: {
    'starships': 'crew',
    'people': 'mass',
  }
})

export const resourceReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case 'loadResourcePage':
      return {
        ...state,
        total: payload.total,
        items: [
          ...state.items,
          ...payload.items
        ]
      }
    case 'setNextPage':
      return {
        ...state,
        page: state.page + 1
      }
    case 'setDataState':
      return {
        ...state,
        dataState: payload
      }
    case 'setResourceName':
      return {
        ...state,
        name: payload,
        attribute: state.available[payload],

        dataState: resourceDefault.dataState,
        items: resourceDefault.items,
        page: resourceDefault.page,
        total: resourceDefault.total,
      }

    default:
      return state;
  }
}

export const resourceActions = {
  setDataState: dataState => ({
    type: 'setDataState',
    payload: dataState
  }),
  loadPage: (items, count) => ({
    type: 'loadResourcePage',
    payload: {
      items: items || [],
      total: count || 0,
    }
  }),
  updateResourceName: newResourceName => ({
    type: 'setResourceName',
    payload: newResourceName
  }),
  setNextPage: () => ({
    type: 'setNextPage'
  })
}