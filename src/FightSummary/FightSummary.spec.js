import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { render, unmountComponentAtNode } from 'react-dom'
import StateManager from '../StateManager/StateManager';
import FightSummary from '../FightSummary/FightSummary'
import { act } from 'react-dom/test-utils'
import { FightResult } from './useRandomFight';


let component, container, reducerMock, getButton
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)

  reducerMock = jest.fn()
    .mockImplementation((state, action) => state)

  getButton = () => document.getElementById("OneMoreFightButton")
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe("FightSummary", () => {

  test("renders component", () => {
    renderComponent()
    const wrapper = document.getElementById("FightSummary")
    expect(wrapper).toBeTruthy()
  })

  test("calls registerFight", () => {
    const state = renderComponent()
    const action = { type: 'registerFight', payload: FightResult.FAIL }
    expect(reducerMock).toHaveBeenCalledTimes(1)
    expect(reducerMock).toHaveBeenCalledWith(state, action)
  })

  test("calls registerFight on one more fight button click", () => {
    const state = renderComponent()
    const action = { type: 'registerFight', payload: FightResult.FAIL }
    const button = getButton()
    expect(button).toBeTruthy()
    act(() => button.click())
    expect(reducerMock).toHaveBeenCalledTimes(2)
    expect(reducerMock).toHaveBeenCalledWith(state, action)
  })
})

const defaultState = {
  resource: {
    items: [
      { name: 'hero-1', power: 1 },
      { name: 'hero-2', power: 2 }
    ]
  },
  list: { previewId: 'hero-1' },
  player: { wins: 0, fails: 0 }
}

const renderComponent = stateMutation => {
  const state = { ...defaultState, ...stateMutation }
  component = (
    <StateManager initialState={state} reducer={reducerMock}>
      <BrowserRouter>
        <FightSummary />
      </BrowserRouter>
    </StateManager>
  )
  act(() => { render(component, container) })
  return state
}