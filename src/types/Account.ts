import type Tag from './Tag'

export default interface Account {
  id: number
  name: string
  type: string
  password: string
  tags: Tag[]
}
