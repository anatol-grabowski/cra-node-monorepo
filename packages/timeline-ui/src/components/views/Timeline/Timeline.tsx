import { TimelineItem } from './TimelineItem'
import styles from './Timeline.module.scss'
import { withPanAndZoom } from '../../hocs/withPanAndZoom'

export function StaticTimeline(props) {
  const { items, range } = props
  return (
    <div className={styles.Timeline}>
      {items.map((it) => (
        <TimelineItem key={it.id} {...it} />
      ))}
    </div>
  )
}

export const Timeline = withPanAndZoom(StaticTimeline, {
  doZoom: false,
  doPanY: false,
  doPanX: true,
})
