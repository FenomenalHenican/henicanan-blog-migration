import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllTopics } from '@/services/firebase/topicDataService'
import type { TopicWithId } from '@/types/TopicData'

export const useTopicStore = defineStore('topic', () => {
  const topics = ref<TopicWithId[]>([])
  const isLoaded = ref<boolean>(false)

  const fetchTopics = async () => {
    if (!isLoaded.value) {
      try {
        const topicData = await getAllTopics()
        topics.value = topicData as TopicWithId[]
        isLoaded.value = true
      } catch (err) {
        console.log(err)
      }
    }
  }
  return { fetchTopics, topics, isLoaded }
})
