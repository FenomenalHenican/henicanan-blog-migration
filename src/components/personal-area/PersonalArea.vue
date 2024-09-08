<script setup lang="ts">
import Button from 'primevue/button'
import 'primeicons/primeicons.css'

import { getUserData, saveUserData } from '@/services/firebase/userDataService'
import { getUserIdFromLocalStorage } from '@/local-storage/getUserId'
import anonim from '@/assets/img/anonim.jpg'
import { useRouter } from 'vue-router'
import type { UserData } from '@/types/UserData'

import { ref, onMounted } from 'vue'

const router = useRouter()

const avatarUrl = ref<string>('')
const firstName = ref<string>('')
const secondName = ref<string>('')
const country = ref<string>('')
const gitHubLink = ref<string>('')
const telegramLink = ref<string>('')
const workPlace = ref<string>('')
const inputStatus = ref<string>('')

const getUserSettings = async () => {
  const userId = getUserIdFromLocalStorage()
  if (!userId) {
    console.log('UserID is not found')
    return
  }
  try {
    const userData = await getUserData(userId)
    if (userData) {
      avatarUrl.value = userData.avatarUrl ?? ''
      firstName.value = userData.firstName ?? ''
      secondName.value = userData.secondName ?? ''
      country.value = userData.country ?? ''
      gitHubLink.value = userData.gitHub ?? ''
      telegramLink.value = userData.telegram ?? ''
      workPlace.value = userData.workPlace ?? ''
      inputStatus.value = userData.status ?? ''
    }
    return userData
  } catch (err) {
    console.log(err)
  }
}
const saveUserStatus = async () => {
  const userId = getUserIdFromLocalStorage()
  if (!userId) {
    console.log('UserID is not found')
    return
  }
  const userData: Partial<UserData> = {
    status: inputStatus.value
  }
  if (userData) {
    try {
      await saveUserData(userId, userData)
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('User data is not correctly')
  }
}

const redirectToUserSettings = () => {
  router.push({ name: 'UserSettings' })
}

onMounted(async () => {
  await getUserSettings()
})
</script>

<template>
  <div class="container">
    <div class="flex">
      <div class="avatar-wrapper">
        <img class="avatar" :src="avatarUrl || anonim" />
        <Button @click="redirectToUserSettings">Edit profile <i class="pi pi-cog ml-3" /></Button>
      </div>
      <div class="personal-info ml-7">
        <div class="user-name flex text-3xl mt-2">
          <span class="first-name">{{ firstName }}</span>
          <span class="second-name ml-2">{{ secondName }}</span>
        </div>
        <div class="select-status flex">
          <input
            type="text"
            class="input-status"
            v-model="inputStatus"
            @keyup.enter="saveUserStatus"
          />
        </div>
        <div class="wrapper-country flex" v-if="country">
          <span class="country-title">Country:</span>
          <div class="country">{{ country }}</div>
        </div>
        <div class="wrapper-work-place flex" v-if="workPlace">
          <span class="work-place-title">Work of the place:</span>
          <div class="work-place">{{ workPlace }}</div>
        </div>
        <div class="add-info" v-if="gitHubLink || telegramLink">
          <span class="add-info-title">Add information</span>
          <div class="ml-9">
            <div class="wrapper-github flex" v-if="gitHubLink">
              <span class="github-title">GitHub: </span>
              <div class="github-link">{{ gitHubLink }}</div>
            </div>
            <div class="wrapper-telegram flex" v-if="telegramLink">
              <span class="telegram-title">Telegram: </span>
              <div class="telegram-link">{{ telegramLink }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="topic-list"></div>
  </div>
</template>

<style scoped>
.loading-spinner {
  align-items: centers;
  margin-top: 30%;
  margin-left: 40%;
  height: 150px;
  width: 150px;
  color: black;
  justify-content: center;
  display: flex;
}

.avatar {
  margin-top: 10px;
  max-width: 250px;
  max-height: 300px;
  width: auto;
  height: auto;
  border-bottom: 2px solid transparent;
  border-radius: 4px;
}

.input-status {
  border: none;
  border-bottom: 2px solid transparent;
  outline: none;
  font-size: 12px;
  color: #5b5b5b;
}

.input-status:focus {
  border-bottom: 2px solid #bab9b9;
}
</style>
