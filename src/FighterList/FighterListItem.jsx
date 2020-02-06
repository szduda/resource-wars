/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Name, Power } from '../Common/Fighter'
import { ListItem } from '../Common/List'
import Card from '@material-ui/core/Card'

const ListItemContentWrapper = props => (
  <Card css={css`
  padding: 20px 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > * {
    flex-basis: 180px;
  }
  `} {...props} />
)

const FighterListItem = ({ fighter, click }) => {
  if (!fighter) return null
  const { name, power } = fighter

  return (
    <ListItem>
      <button css={css`width: 100%; padding: 0;`} onClick={click}>
        <ListItemContentWrapper>
          <Name css={css`flex-grow: 1;`}>{name}</Name>
          <Power>{power}</Power>
        </ListItemContentWrapper>
      </button>
    </ListItem>
  )
}

export default FighterListItem
