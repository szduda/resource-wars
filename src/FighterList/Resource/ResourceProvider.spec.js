import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, unmountComponentAtNode } from 'react-dom'
import { ResourceProvider, requestUri } from './ResourceProvider'
import { resourceDefault } from '../../StateManager/definitions/resource.state'
import { DataState } from '../../StateManager/definitions/resource.state'

let container, resourceName, page, actions, component, fakeResponse

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
  resourceName = resourceDefault.name
  page = resourceDefault.page

  actions = {
    setDataState: jest.fn(),
    loadPage: jest.fn(),
    setNotification: jest.fn(),
    decrementPage: jest.fn()
  }

  fakeResponse = {
    results: [...Array(10)].map((i, idx) =>
      ({ name: `fighter-${idx}`, power: idx })),
    count: 12
  }

  global.fetch = jest.fn().mockImplementation(() => {
    const fetchResponse = {
      json: () => Promise.resolve(fakeResponse)
    }
    return Promise.resolve(fetchResponse)
  })

  component = (
    <ResourceProvider
      {...{ resourceName, page, ...actions }}
    />
  )
})

afterEach(() => {
  global.fetch.mockRestore()

  unmountComponentAtNode(container)
  container.remove();
  container = null;
})

describe("ResourceProvider", () => {

  test("fetches request with provided parameters", async () => {
    await act(async () => render(component, container))
    expect(global.fetch).toBeCalledTimes(1)
    const request = requestUri(resourceName, page)
    expect(global.fetch).toHaveBeenCalledWith(request)
  })

  test("processes page", async () => {
    await act(async () => render(component, container))
    expect(actions.setDataState).toHaveBeenCalledWith(DataState.LOADING)
    expect(actions.loadPage).toHaveBeenCalledWith(
      fakeResponse.results,
      fakeResponse.count
    )
    expect(actions.setDataState).toHaveBeenCalledWith(DataState.READY_TO_LOAD)
  })

  test("processes last page", async () => {
    fakeResponse.count = 10
    await act(async () => render(component, container))
    expect(actions.loadPage).toHaveBeenCalledWith(
      fakeResponse.results,
      fakeResponse.count
    )
    expect(actions.setDataState).toHaveBeenCalledWith(DataState.END_OF_DATA)
  })

  test("sets notification on fetch reject", async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject({}))
    await act(async () => render(component, container))
    expect(actions.setNotification).toHaveBeenCalledTimes(1)
    expect(actions.setDataState).toHaveBeenCalledWith(DataState.READY_TO_LOAD)
  })

  test("sets notification on fetch exception", async () => {
    global.fetch = jest.fn().mockImplementation(() => new Exception())
    await act(async () => render(component, container))
    expect(actions.setNotification).toHaveBeenCalledTimes(1)
    expect(actions.setDataState).toHaveBeenCalledWith(DataState.READY_TO_LOAD)
  })

  test("refetches when resource name update", async () => {
    await act(async () => {
      render(component, container)
      unmountComponentAtNode(container)
      component = <ResourceProvider
        {...{ resourceName: 'people', page, ...actions }}
      />
      render(component, container)
    })
    const uri = requestUri('people', page)
    expect(actions.setDataState).toHaveBeenCalledTimes(4)
    expect(actions.loadPage).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(2, uri)
  })

  test("refetches when page update", async () => {
    await act(async () => {
      render(component, container)
      unmountComponentAtNode(container)
      component = <ResourceProvider
        {...{ resourceName, page: 2, ...actions }}
      />
      render(component, container)
    })
    const uri = requestUri(resourceName, 2)
    expect(actions.setDataState).toHaveBeenCalledTimes(4)
    expect(actions.loadPage).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(2, uri)
  })
})