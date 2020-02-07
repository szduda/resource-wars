import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, unmountComponentAtNode } from 'react-dom'
import { PagedList } from './List'
import { DataState } from '../StateManager/definitions/resource.state'

let container, component, getLoadMoreButton, getPager

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)

  getLoadMoreButton = () => document.getElementById("LoadMoreButton")
  getPager = () => document.getElementById("Pager")

})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove();
  container = null;
})

describe("PagedList", () => {
  test("signals when empty", () => {
    component = (
      <PagedList />
    )
    act(() => { render(component, container) })
    expect(container.textContent).toMatch('Nothing to display')
  })
  test("signals when loading", () => {
    component = (
      <PagedList dataState={DataState.LOADING} />
    )
    act(() => { render(component, container) })
    const button = getLoadMoreButton()
    expect(button).toBeTruthy()
    expect(button.textContent).toMatch('Loading...')
  })
  test("signals when no more data", () => {
    component = (
      <PagedList dataState={DataState.END_OF_DATA} />
    )
    act(() => { render(component, container) })
    const button = getLoadMoreButton()
    expect(button).toBeNull()
    const pager = getPager()
    expect(pager).toBeTruthy()
    expect(pager.textContent).toMatch('You have loaded all the data')
  })
  test("signals when ready to load", () => {
    component = (
      <PagedList dataState={DataState.READY_TO_LOAD} />
    )
    act(() => { render(component, container) })
    const button = getLoadMoreButton()
    expect(button).toBeTruthy()
    expect(button.textContent).toMatch('Load more')
  })

  test("calls onLoadMore", () => {
    const onLoadMore = jest.fn()
    component = (
      <PagedList
        dataState={DataState.READY_TO_LOAD}
        onLoadMore={onLoadMore}
      />
    )
    act(() => { render(component, container) })
    const button = getLoadMoreButton()
    expect(button).toBeTruthy()
    act(() => button.click())
    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })

  test("does not call onLoadMore if already loading", () => {
    const onLoadMore = jest.fn()
    component = (
      <PagedList
        dataState={DataState.LOADING}
        onLoadMore={onLoadMore}
      />
    )
    act(() => { render(component, container) })
    const button = getLoadMoreButton()
    expect(button).toBeTruthy()
    act(() => button.click())
    expect(onLoadMore).toHaveBeenCalledTimes(0)
  })

  test("renders children", () => {
    const fakeChildren = <div id="fakeChild">child</div>
    component = (
      <PagedList dataState={DataState.READY_TO_LOAD} >
        {fakeChildren}
      </PagedList>
    )
    act(() => { render(component, container) })
    const child = document.getElementById("fakeChild")
    expect(child).toBeTruthy()
  })
})