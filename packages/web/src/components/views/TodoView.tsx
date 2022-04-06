import { TodoList } from './TodoList'
import { Timeline } from './Timeline'

export function TodoView(props) {
  const { todo, timeline } = props
  return (
    <div>
      <TodoList {...todo}></TodoList>
      <Timeline {...timeline}></Timeline>
    </div>
  )
}
