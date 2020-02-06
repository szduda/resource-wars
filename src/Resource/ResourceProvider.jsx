import { useEffect } from 'react'

export const DataState = {
  LOADING: 'loading',
  READY_TO_LOAD: 'readyToLoad',
  END_OF_DATA: 'endOfData',
  EMPTY: 'empty'
}

export const requestUri = (resourceName, page) =>
  `https://swapi.co/api/${resourceName}/?page=${page}`

export const ResourceProvider = ({
  resourceName, page,
  setDataState, loadPage, setNotification
}) => {
  const getData = async () => {
    setDataState(DataState.LOADING)
    let response = null

    try {
      response = await fetch(requestUri(resourceName, page))
      response = await response.json()
    } catch (error) {
      setNotification('Failed to load data :(')
    }

    if (response)
      loadPage(response.results, response.count)

    const endOfData = response
      && Math.ceil(response.count / 10) <= page
    setDataState(endOfData
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