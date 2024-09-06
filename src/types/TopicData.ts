export interface TopicData {
  header: string
  discription: string
  userId: string | null
  createdAt: Date
  tags: string[]
}

export interface TopicWithId extends TopicData {
  id: string
}
