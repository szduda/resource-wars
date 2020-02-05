import React, { useState, useEffect } from 'react'
import { useStateValue } from '../StateManager'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ResourcePicker = () => {
  const [{ resource }, dispatch] = useStateValue()
  const { name: resourceName, page } = resource

  const [newResourceName, setNewResourceName] = useState(resourceName);

  const updateResourceName = () => {
    dispatch({
      type: 'setResourceName',
      payload: newResourceName
    })
  }

  const getData = async () => {
    dispatch({
      type: 'setDataState',
      payload: 'loading'
    })
    try {
      let response = await fetch(
        `https://swapi.co/api/${resourceName}/?page=${page}`
      )
      response = await response.json()
      dispatch({
        type: 'loadResourcePage',
        payload: {
          items: response.results || [],
          total: response.count || 0,
        }
      })

      const endOfData = Math.ceil(response.count / 10) <= page
      dispatch({
        type: 'setDataState',
        payload: endOfData ? 'endOfData' : 'readyToLoad'
      })
    } catch (error) {
      dispatch({
        type: 'setNotification',
        payload: 'Failed to load data :('
      })
    }
  }

  useEffect(() => {
    getData();
  }, [resourceName, page])

  return (
    <div css={css`margin-bottom: 20px;`}>
      <input
        type="text"
        value={newResourceName}
        onChange={e => setNewResourceName(e.target.value)}
        onBlur={() => {
          newResourceName !== resourceName
            && updateResourceName()
        }
        }
      />
    </div>
  )
}

export default ResourcePicker 