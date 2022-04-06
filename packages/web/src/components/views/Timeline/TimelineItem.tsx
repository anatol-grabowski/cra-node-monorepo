import styles from './TimelineItem.module.scss'

export function TimelineItem(props) {
  const { name, symbol, x, y } = props
  return (
    <div
      className={styles.TimelineItem}
      style={{
        top: y + 'px',
        left: x + 'px',
      }}
    >
      {symbol}
    </div>
  )
}
