/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Name, Power } from '../Common/Fighter'
import { ListItem } from '../Common/List'

const Button = props => (
  <button css={css`
  padding: 10px 20px;
  background: none;
  border: none;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  > * {
    margin: 10px 0;
  }
  `} {...props} />
)

const ListItemContentWrapper = props => (
  <div css={css`
  display: flex;
  flex-basis: 180px;
  flex-shrink: 0;
  flex-grow: 1;
  flex-wrap: wrap;
  margin-left: 20px;

  > * {
    flex-basis: 240px;
    flex-shrink: 0;
    flex-grow: 0;
  }
  `} {...props} />
)

const FighterListItem = ({ fighter, click }) => {
  if (!fighter) return null
  const { name, power } = fighter

  return (
    <ListItem>
      <Button onClick={click}>
        <ListItemContentWrapper>
          <Name>{name}</Name>
          <Power>{power}</Power>
        </ListItemContentWrapper>
      </Button>
    </ListItem>
  )
}

export default FighterListItem
