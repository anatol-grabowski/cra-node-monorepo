import React from 'react'
import { withPanAndZoom } from '../components/hocs/withPanAndZoom'
import styles from './stories.module.scss'
import { Story, Meta } from '@storybook/react'

function Div() {
  return (
    <div className="test-offset">
      some draggable and zoomable
      <br />
      multiline text
    </div>
  )
}
const DivWithPanAndZoom = withPanAndZoom(Div, { doPanX: true, doPanY: false, doZoom: false })

export default {
  title: 'withPanAndZoom',
  component: DivWithPanAndZoom,
} as Meta

const Template: Story = (args) => (
  <div>
    <div className={styles.Container}>
      <DivWithPanAndZoom />
    </div>
  </div>
)
export const ManyItems = Template.bind({})
ManyItems.args = {}
