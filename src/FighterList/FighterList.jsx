import React from 'react'
import { useStateValue } from '../StateManager'
import { AppWrapper, SectionHeader, Row } from '../Common/Theme'
import { PagedList } from '../Common/List'
import PreviewModal from './PreviewModal'
import FighterListItem from './FighterListItem'
import ResourcePicker from '../Resource/ResourcePicker'
import ErrorInfo from '../Common/ErrorInfo/ErrorInfo'
import TopBar from '../Common/TopBar/TopBar'

export default () => {
  const [{ notification, resource, list, player }, dispatch] = useStateValue();
  const { previewId } = list
  const { items, dataState, attribute } = resource

  const setNextPage = () => dispatch({
    type: 'setNextPage',
  })

  const setNotification = notification => dispatch({
    type: 'setNotification',
    payload: notification
  })

  const setEndOfData = () => dispatch({
    type: 'setEndOfData',
    payload: { endOfData: true }
  })

  const setPreview = id => dispatch({
    type: 'setPreview',
    payload: id
  })

  return (
    <>
      <TopBar wins={player.wins} fails={player.fails} />
      <AppWrapper>

        <Row>
          <SectionHeader>
            Resource
          </SectionHeader>
          <ResourcePicker setEndOfData={setEndOfData} />
        </Row>

        <SectionHeader>
          List of fighters
        </SectionHeader>

        <PagedList onLoadMore={setNextPage} dataState={dataState}>
          {items.map((item, index) => (
            <FighterListItem {...{
              fighter: {
                name: item.name,
                power: item[attribute]
              },
              click: () => setPreview(item.name),
              key: `listItem-${index}`
            }} />
          ))}
        </PagedList>

      </AppWrapper>

      <PreviewModal
        fighter={items.find(f => f.name === previewId)}
        attribute={attribute}
        show={!!previewId}
        onHide={() => setPreview(null)}
      />

      <ErrorInfo
        error={notification}
        close={() => setNotification('')}
      />
    </>
  )
}