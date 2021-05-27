import { Input } from '../Primitives'

export function TodoDetails(props) {
  const { name } = props
  return (
    <div>
      Name:
      <Input value={name} onChange={() => {}}></Input>
    </div>
  )
}
