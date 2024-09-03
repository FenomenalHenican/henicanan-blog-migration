export interface TopicData {
  header: string
  discription: string
  userId: number
  createdAt: Date
  tags: string[]
}

export interface TopicWithId extends TopicData {
  id: string
}
