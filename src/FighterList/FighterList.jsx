import React from 'react'
import {
  useStateValue,
  useNotificationActions,
  useResourceActions,
  useListActions
} from '../StateManager/StateManager'
import { AppWrapper, SectionHeader, Row } from '../Common/Theme'
import { PagedList } from '../Common/List'
import PreviewModal from './PreviewModal'
import FighterListItem from './FighterListItem'
import ResourcePicker from './Resource/ResourcePicker'
import ErrorInfo from '../Common/ErrorInfo'
import TopBar from '../Common/TopBar'
import ResourceProvider from './Resource/ResourceProvider'

export default () => {
  const [{ notification, resource, list, player }, dispatch] = useStateValue();
  const actions = {
    ...useNotificationActions(dispatch),
    ...useListActions(dispatch),
    ...useResourceActions(dispatch)
  }

  const { previewId } = list
  const {
    name: resourceName,
    items,
    dataState,
    page,
    available: availableResources
  } = resource
  const attribute = availableResources[resourceName]

  return (
    <>
      <ResourceProvider {...{ resourceName, page, attribute, ...actions }} />
      <TopBar wins={player.wins} fails={player.fails} />
      <AppWrapper>

        <Row>
          <SectionHeader>
            Resource
          </SectionHeader>
          <ResourcePicker
            resourceName={resourceName}
            onResourceSelect={actions.updateResourceName}
            availableResources={availableResources}
            decrementPage={actions.decrementPage}
          />
        </Row>

        <SectionHeader>
          List of fighters
        </SectionHeader>

        <PagedList onLoadMore={actions.setNextPage} dataState={dataState}>
          {items.map((fighter, index) => (
            <FighterListItem
              fighter={fighter}
              click={() => actions.setPreview(fighter.name)}
              key={`listItem-${index}`}
            />
          ))}
        </PagedList>

      </AppWrapper>

      <PreviewModal
        fighter={items.find(f => f.name === previewId)}
        show={!!previewId}
        onHide={() => actions.setPreview(null)}
      />

      <ErrorInfo
        error={notification}
        close={() => actions.setNotification('')}
      />
    </>
  )
}