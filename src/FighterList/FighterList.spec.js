import React from "react";
import { act } from "react-dom/test-utils";
import HeroesList from './HeroesList'
import { render, unmountComponentAtNode } from "react-dom";

let container, setPage, addHero, deleteHero, addButton, loadMoreButton, listItems
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  setPage = jest.fn()
  addHero = jest.fn()
  deleteHero = jest.fn()
  act(() => {
    render(
      <HeroesList
        {...{
          addHero, deleteHero, heroes: mockPayload(10),
          setPage, page: 0
        }}
      />, container)
  })

  addButton = document.getElementById("AddHeroButton")
  listItems = container.getElementsByTagName("li")
  loadMoreButton = document.getElementById("LoadMoreButton")
})
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

const mockHero = seed => ({
  id: seed,
  name: seed,
  avatarUrl: seed,
  description: seed,
  type: {
    id: seed,
    name: seed
  }
})

const mockPayload = length =>
  [...Array(length)].map((x, idx) => mockHero(`h${idx}`))

const openPreview = () => act(() => {
  listItems[0].getElementsByTagName('button')[0].click()
})

describe("HeroList", () => {

  test("display action buttons", () => {
    expect(addButton).toBeDefined()
    expect(loadMoreButton).toBeDefined()
  })

  test("display heroes", () => {
    expect(listItems.length).toEqual(10)
  })

  test("can add hero", () => {
    act(() => {
      addButton.click()
    })
    expect(addHero).toBeCalled()
  })

  test("can open preview", () => {
    openPreview()
    const modal = document.getElementById('HeroPreviewModal')
    expect(modal).toBeDefined()
  })

  test("can call delete hero", async () => {
    openPreview()
    const deleteButton = document.getElementById('DeleteHeroButton')
    expect(deleteButton).toBeDefined()
    await act(async () => {
      await deleteButton.click()
    })
    expect(deleteHero).toBeCalled()
  })

  test("can increment page", () => {
    act(() => {
      loadMoreButton.click()
    })
    expect(setPage).toBeCalled()
  })
})