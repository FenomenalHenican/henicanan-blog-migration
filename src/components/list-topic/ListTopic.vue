<script setup lang="ts">
import Button from 'primevue/button'
import Message from 'primevue/message'
import SelectButton from 'primevue/selectbutton'
import Toast from 'primevue/toast'

import CreateTopic from '@/components/modal/create-topic/CreateTopic.vue'
import ExtendedTopic from '../topic/ExtendedTopic.vue'

import { onMounted, ref } from 'vue'
import { getAllTopics } from '../../services/firebase/topicDataService'
import { useUserStore } from '@/store/auth'
import { getUserData } from '@/services/firebase/userDataService'
import { showErrorAddTopic } from '@/services/toasts/errors/toastErrorAddTopic'
import type { TopicWithId } from '@/types/TopicData'
import { useToast } from 'primevue/usetoast'
import { getUserIdFromLocalStorage } from '@/local-storage/getUserId'

const userStore = useUserStore()
const toast = useToast()

const valueOfNavCatalog = ref<string>('Recommended')
const optionsNavCatalog = ref<string[]>(['Following', 'Recommended'])

const topics = ref<TopicWithId[]>([])

const favoriteStatuses = ref<{ [key: string]: boolean }>({})

const fetchFavoriteStatuses = async () => {
  for (const topic of topics.value) {
    favoriteStatuses.value[topic.id] = await isFavoriteTopic(topic.id)
  }
}

const fetchTopicData = async () => {
  try {
    const topicData = await getAllTopics()
    topics.value = topicData as TopicWithId[]
  } catch (err) {
    console.error('Failed to fetch topics:', err)
  }
}

const isFavoriteTopic = async (topicId: string) => {
  const userId = getUserIdFromLocalStorage()
  if (!userId) {
    return false
  }
  const userData = await getUserData(userId)
  if (!userData || !userData.favoriteTopics) {
    return false
  }
  return userData.favoriteTopics.includes(topicId)
}

onMounted(async () => {
  await fetchTopicData()
  await fetchFavoriteStatuses()
})
</script>

<template>
  <div class="add-topic">
    <div class="wrapper-btn-add-topic" v-if="userStore.user">
      <CreateTopic />
      <span class="add-topic-title">Click to create a discussion topic</span>
    </div>
    <div class="wrapper-btn-blocked-add-topic" v-else>
      <Button
        icon="pi pi-plus"
        severity="secondary"
        rounded
        aria-label="Bookmark"
        class="btn-blocked-add-topic"
        @click="showErrorAddTopic(toast)"
      />
      <Toast />
      <span class="add-topic-title">You are not logged in, please log in to create a topic.</span>
    </div>
    <Message severity="secondary" class="add-topic-warning"
      >Click on the plus icon to create a discussion topic. After filling out the fields and sending
      them for moderation, you will receive a response in your personal account. Users will be able
      to reply to you and discuss your topic.</Message
    >
  </div>
  <div class="nav-catalog">
    <SelectButton v-model="valueOfNavCatalog" :options="optionsNavCatalog" />
  </div>
  <div class="topic-list-recomendation" v-if="valueOfNavCatalog === 'Recommended'">
    <ExtendedTopic
      v-for="topic in topics"
      :key="topic.id"
      :isFavoriteDefault="favoriteStatuses[topic.id] || false"
      :topic="topic"
    />
  </div>
  <div class="topic-list-following" v-else>
    <div class="message-absent-topic">
      <span class="absent-topic-title"
        >There are no records. Subscribe to the author to see favorites.</span
      >
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.add-topic {
  display: flex;
  flex-direction: column;
}

.wrapper-btn-add-topic,
.wrapper-btn-blocked-add-topic {
  display: flex;
  align-items: center;
}

.btn-add-topic,
.btn-blocked-add-topic {
  width: fit-content;
  height: fit-content;
}

.add-topic-title {
  margin-left: 10px;
  font-size: 16px;
}

.add-topic-warning {
  margin-top: 20px;
  font-size: 18px;
  font-family: serif;
}

.nav-catalog {
  margin-top: 25px;
}

.message-absent-topic {
  margin-top: 20px;
}

.absent-topic-title {
  font-size: 120%;
  color: #444;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
