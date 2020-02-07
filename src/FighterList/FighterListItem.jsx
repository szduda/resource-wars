/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ListItem } from '../Common/List'
import { FighterCard } from '../Common/Fighter'

export const FighterListItem = ({ fighter, click }) => {
  if (!fighter) return null

  return (
    <ListItem>
      <button css={css`width: 100%; padding: 0;`} onClick={click}>
        <FighterCard fighter={fighter} />
      </button>
    </ListItem>
  )
}

export default FighterListItem
