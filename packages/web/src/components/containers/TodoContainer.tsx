import React from 'react'
import { TodoView } from '../views/TodoView'
import { TimelineService } from '../../services/timeline.service'

const mockConfig = {
  todo: {
    items: [
      { id: 1, name: 'take vitamin D' },
      { id: 2, name: 'call mom' },
      { id: 3, name: 'abc' },
    ],
    activeItem: { name: 'xxx' },
  },
  timeline: {
    range: [new Date('2021-05-03T00:00:00.000Z'), new Date('2021-05-06T00:00:00.000Z')] as [
      Date,
      Date,
    ],
    items: [
      { id: 1, name: 'order charger', symbol: 'B', time: new Date('2021-05-04T10:00:00.000Z') },
      { id: 2, name: 'wash car', symbol: '💦🛻', time: new Date('2021-05-03T18:03:50.294Z') },
    ],
  },
}

const timelineService = new TimelineService()
export const mockConfigConverted = {
  ...mockConfig,
  timeline: {
    ...mockConfig.timeline,
    items: mockConfig.timeline.items.map((it) => {
      return {
        ...it,
        x: timelineService.convertDateToScreen(it.time, mockConfig.timeline.range, 500),
        y: 10,
      }
    }),
  },
}

export class TodoContainer extends React.Component {
  render() {
    return <TodoView {...mockConfigConverted}></TodoView>
  }
}
