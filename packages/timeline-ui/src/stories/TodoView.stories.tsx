import React from 'react'
import { Story, Meta } from '@storybook/react'

import { mockConfigConverted } from '../components/containers/TodoContainer'
import { TodoView } from '../components/views/TodoView'

export default {
  title: 'TodoView',
  component: TodoView,
} as Meta

const Template: Story = (args) => <TodoView {...args} />

export const ManyItems = Template.bind({})
ManyItems.args = mockConfigConverted
