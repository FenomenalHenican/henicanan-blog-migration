<script setup lang="ts">
import Tag from 'primevue/tag'

import anonim from '@/assets/img/anonim.jpg'

import { defineProps, ref, onMounted, computed } from 'vue'
import { getUserIdFromLocalStorage } from '@/local-storage/getUserId'
import { removeTopicFromFavorites, addTopicToFavorite } from '@/services/firebase/topicDataService'
import type { TopicWithId } from '@/types/TopicData'
import { getUserData } from '@/services/firebase/userDataService'
import { Timestamp } from 'firebase/firestore'

const props = defineProps<{
  topic: TopicWithId
}>()

const userFirstName = ref<string>('')
const userSecondName = ref<string>('')
const formattedCreationDate = ref<string>('')
const readingTime = ref<string>('')
const isFavorite = ref<boolean>(false)
const avatarLink = ref<string>('')

const fetchUserName = async () => {
  try {
    const userId = props.topic.userId
    if (userId) {
      const userData = await getUserData(userId)
      if (userData) {
        userFirstName.value = userData.firstName || 'Anonymus'
        userSecondName.value = userData.secondName || ''
        avatarLink.value = userData.avatarUrl || ''
      } else {
        userFirstName.value = 'Anonymus'
      }
    } else {
      userFirstName.value = 'Anonymus'
    }
  } catch (err) {
    console.log(err)
    userFirstName.value = 'Anonymus'
  }
}

const formattedDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate()
  const today = new Date()
  const oneDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round((today.getTime() - date.getTime()) / oneDay)

  switch (true) {
    case diffDays === 0:
      return 'Today'
    case diffDays === 1:
      return 'Yesterday'
    case diffDays === 2:
      return 'the day before yesterday'
    case diffDays < 30:
      return `${diffDays} days ago`
    default: {
      const months = Math.floor(diffDays / 30)
      if (months <= 11) {
        return `${months} months ago`
      } else {
        return '1 year ago'
      }
    }
  }
}

const calculateTimeOfRead = (discription: string): string => {
  const wordsPerMinute = 120
  const numberOfWords = discription.trim().split(/\s+/).length
  const minutes = numberOfWords / wordsPerMinute
  if (minutes < 1) {
    return 'less than a minute read'
  } else if (minutes < 2) {
    return '1 minute read'
  } else {
    return `${Math.ceil(minutes)} minutes read`
  }
}

const truncatedDescription = computed(() => {
  const lines: string[] = props.topic.discription.split('\n')
  if (lines.length > 3) {
    const truncatedLines = lines.splice(0, 3)
    const lastLineWords = truncatedLines[2].split(' ')
    lastLineWords[lastLineWords.length - 1] = '...'
    truncatedLines[2] = lastLineWords.join(' ')
    return truncatedLines.join('\n')
  }
  console.log(props.topic.discription)
  return props.topic.discription
})

const toggleFavorite = async (topic: TopicWithId) => {
  try {
    const userId = getUserIdFromLocalStorage()

    if (!userId) {
      console.log('User Id is not found')
      return
    }

    if (isFavorite.value) {
      const result = await removeTopicFromFavorites(userId, topic.id)
      if (result) {
        isFavorite.value = false
      }
    } else {
      const result = await addTopicToFavorite(userId, topic.id)
      if (result) {
        isFavorite.value = true
      }
    }
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchUserName()
  if (props.topic.createdAt instanceof Timestamp) {
    formattedCreationDate.value = formattedDate(props.topic.createdAt)
  } else {
    console.log('Invalid timestamp')
  }
  readingTime.value = calculateTimeOfRead(props.topic.discription)
})
</script>

<template>
  <div class="topic-card">
    <div class="header-card">
      <img :src="avatarLink || anonim" alt="User Avatar" class="avatar" />
      <div class="username">{{ userFirstName + ' ' + userSecondName }}</div>
      <div class="date-post">{{ formattedCreationDate }}</div>
    </div>
    <span class="title-card">{{ topic.header }}</span>
    <span class="description-card">{{ truncatedDescription }}</span>
    <div class="footer-card">
      <div class="left-footer-card">
        <Tag v-for="tag in topic.tags" :key="tag" class="tag" severity="secondary" :value="tag" />
        <span class="reading-time">{{ readingTime }}</span>
        <span class="recomendation">Selected for you</span>
      </div>
      <div class="rigth-footer-card">
        <ul>
          <li>
            <i
              :class="['pi', isFavorite ? 'pi-bookmark-fill' : 'pi-bookmark']"
              @click="() => toggleFavorite(topic)"
            />
          </li>
          <li class="options"><i class="pi pi-ellipsis-h" /></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.topic-card {
  margin-top: 30px;
  border-top: 2px solid rgb(178, 178, 178);
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.header-card {
  display: flex;
  align-items: center;
}

.avatar {
  height: 40px;
  width: 40px;
  overflow: hidden;
  border-radius: 50%;
}

.username {
  margin-left: 10px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 17px;
}

.username:hover {
  color: #777;
  transition: 0.25s;
  cursor: pointer;
}

.date-post {
  margin-left: 10px;
  color: rgb(116, 115, 115);
  font-size: 16px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}

.title-card {
  margin-top: 10px;
  font-size: 22px;
  font-weight: 500;
}

.title-card:hover {
  color: #777;
  transition: 0.25s;
  cursor: pointer;
}

.description-card {
  margin-top: 10px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}

.footer-card {
  display: flex;
  margin-top: 15px;
}

.left-footer-card {
  display: flex;
  align-items: center;
}

.tag {
  font-size: 14px;
  margin-right: 10px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 5px;
  white-space: nowrap;
}

.reading-time {
  margin-left: 10px;
  color: rgb(116, 115, 115);
  font-size: 16px;
  font-weight: 250;
}

.recomendation {
  margin-left: 10px;
  color: rgb(130, 127, 127);
  font-size: 18px;
  font-weight: 350;
}

.rigth-footer-card {
  margin-left: auto;
}

.rigth-footer-card ul {
  display: flex;
}

.rigth-footer-card li {
  list-style: none;
}

.options {
  margin-left: 13px;
}
</style>
