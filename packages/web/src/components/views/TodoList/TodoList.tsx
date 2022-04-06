import styles from './TodoList.module.scss'
import { TodoListItem } from './TodoListItem'
import { TodoDetails } from './TodoDetails'

export function TodoList(props) {
  const { items, activeItem } = props
  return (
    <div className={styles.TodoList}>
      <div>
        {items.map((it) => (
          <TodoListItem key={it.id} {...it}></TodoListItem>
        ))}
      </div>
      <TodoDetails {...activeItem}></TodoDetails>
    </div>
  )
}
