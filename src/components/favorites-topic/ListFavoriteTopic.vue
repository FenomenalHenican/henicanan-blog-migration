<script setup lang="ts">
import FavoriteTopic from '../topic/FavoriteTopic.vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../modules/firebase/firebase'
import { ref, onMounted } from 'vue'
import { fetchFavoriteTopics } from '../../services/firebase/favoriteTopicService'
import type { TopicWithId } from '../../types/TopicData'

const favoriteTopics = ref<TopicWithId[]>([])

const loadFavoritesTopics = async () => {
  const favoriteTopicIds = await fetchFavoriteTopics()
  const favoriteTopicsPromise = favoriteTopicIds.map(async (topicId: string) => {
    const topicRef = doc(db, 'topics', topicId)
    const topicSnap = await getDoc(topicRef)
    return topicSnap.exists() ? { id: topicId, ...topicSnap.data() } : null
  })
  favoriteTopics.value = (await Promise.all(favoriteTopicsPromise)).filter(
    (topic) => topic !== null
  )
}

const removeTopicFromList = (topicId: string) => {
  favoriteTopics.value = favoriteTopics.value.filter((topic) => topic.id !== topicId)
}

onMounted(() => {
  loadFavoritesTopics()
})
</script>

<template>
  <div class="favorite-topics-list" v-if="favoriteTopics.length">
    <span>Your list favorites</span>
    <span>Added in favorites:{{ favoriteTopics.length }}</span>
    <FavoriteTopic
      v-for="topic in favoriteTopics"
      :key="topic.id"
      :topic="topic"
      @removeFromFavorite="removeTopicFromList"
    />
  </div>
</template>

<style scoped>
.favorite-topics-list {
  display: flex;
  flex-direction: column;
}
</style>
