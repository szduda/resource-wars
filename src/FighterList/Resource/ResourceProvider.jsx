import { useEffect } from 'react'
import { DataState } from '../../StateManager/definitions/resource.state'

export const requestUri = (resourceName, page) =>
  `https://swapi.co/api/${resourceName}/?page=${page}`

export const parseFighters = (data, attribute) => data.map(
  item => ({
    name: item.name,
    power: item[attribute]
  })
)

export const ResourceProvider = ({
  resourceName, attribute, page,
  setDataState, loadPage, setNotification, decrementPage
}) => {
  const getData = async () => {
    setDataState(DataState.LOADING)
    let response = null

    try {
      response = await fetch(requestUri(resourceName, page))
      response = await response.json()
    } catch (error) {
      setNotification('Failed to load data :(')
      decrementPage()
    }

    if (response) {
      const fighters = parseFighters(response.results, attribute)
      loadPage(fighters, response.count)
    }

    const endOfData = response
      && Math.ceil(response.count / 10) <= page
    setDataState(endOfData
      ? DataState.END_OF_DATA
      : DataState.READY_TO_LOAD
    )
  }

  useEffect(() => {
    resourceName && page && getData();
  }, [resourceName, page])

  return null
}

export default ResourceProvider