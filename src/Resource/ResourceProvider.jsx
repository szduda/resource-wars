import { useEffect } from 'react'
import {
  useStateValue,
  useNotificationActions,
  useResourceActions
} from '../StateManager/StateManager'

export const DataState = {
  LOADING: 'loading',
  READY_TO_LOAD: 'readyToLoad',
  END_OF_DATA: 'endOfData',
  EMPTY: 'empty'
}

const requestUri = (resourceName, page) =>
  `https://swapi.co/api/${resourceName}/?page=${page}`

const ResourceProvider = () => {
  const [{ resource }, dispatch] = useStateValue()
  const actions = {
    ...useNotificationActions(dispatch),
    ...useResourceActions(dispatch)
  }
  const { name: resourceName, page } = resource

  const getData = async () => {
    actions.setDataState(DataState.LOADING)
    let response = null

    try {
      response = await fetch(requestUri(resourceName, page))
      response = await response.json()
    } catch (error) {
      actions.setNotification('Failed to load data :(')
    }

    actions.loadPage(response.results, response.count)

    const endOfData = Math.ceil(response.count / 10) <= page
    actions.setDataState(
      endOfData
        ? DataState.END_OF_DATA
        : DataState.READY_TO_LOAD
    )
  }

  useEffect(() => {
    getData();
  }, [resourceName, page])

  return null
}

export default ResourceProvider