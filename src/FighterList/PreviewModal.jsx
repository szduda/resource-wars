import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Name, Power } from './Fighter'
import { Modal, Button } from 'react-bootstrap'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

export const FighterCard = ({ name, power }) => {
  return (
    <div
      id={`fighter-card-${name}`}
      css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
      <div
        css={css`
        margin: 20px 0;
        display: flex;
        flex-direction: column;
      `}>
        <Name>{name}</Name>
        <Power>{power}</Power>
      </div>
    </div>
  )
}

export const FighterPreviewModal = ({ fighter, attribute, fight, ...props }) => {
  if (!fighter) return null
  let fighterMemo = useMemo(() => fighter, [])
  const { name } = fighterMemo
  const power = fighterMemo[attribute]

  return (
    <Modal id={"FighterPreviewModal"} centered {...props}>
      <Modal.Header closeButton css={css`border: 0;`} />
      <Modal.Body>
        <FighterCard {... { power, name }} />
      </Modal.Body>

      <Modal.Footer css={css`border: 0; justify-content: center;`}>
        <Link to="/fight" id="RandomFightButton">
          <Button variant="secondary">
            Fight random enemy
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  )
}

export default FighterPreviewModal