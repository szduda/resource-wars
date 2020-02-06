import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Name, Power } from '../Common/Fighter'
import { Modal } from 'react-bootstrap'
import Button from '@material-ui/core/Button'
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

const FightLink = React.forwardRef((props, ref) =>
  <Link to="/fight" id="RandomFightButton" {...props} ref={ref} />)

export const FighterPreviewModal = ({ fighter, fight, ...props }) => {
  if (!fighter) return null
  let fighterMemo = useMemo(() => fighter, [])
  const { name, power } = fighterMemo

  return (
    <Modal id={"FighterPreviewModal"} centered {...props}>
      <Modal.Header closeButton css={css`border: 0;`} />
      <Modal.Body>
        <FighterCard {... { power, name }} />
      </Modal.Body>

      <Modal.Footer css={css`border: 0; justify-content: center;`}>
        <Button component={FightLink} variant="contained" color="secondary">
          Fight random enemy
          </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FighterPreviewModal