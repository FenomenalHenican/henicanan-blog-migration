<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { provide } from 'vue'

import NavLeftBarMainPage from '../nav/NavLeftBarMainPage.vue'
import NavRigthBarMainPage from '../nav/NavRigthBarMainPage.vue'

const route = useRoute()
const router = useRouter()

const navigateTo = (section: string) => {
  router.push({ name: section })
}

const isActive = (section: string): boolean => {
  return route.name === section
}

provide('navigateTo', navigateTo)
provide('isActive', isActive)

watchEffect(() => {
  if (!route.name) {
    navigateTo('listTopic')
  }
})
</script>

<template>
  <div class="container">
    <div class="left-nav">
      <NavLeftBarMainPage />
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="rigth-nav">
      <NavRigthBarMainPage />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.container {
  display: flex;
}

.left-nav {
  height: 100vh;
  width: 14vh;
  border-right: 2px solid rgb(178, 178, 178);
}

.content {
  margin-top: 20px;
  margin-left: 10vh;
  width: 200vh;
}

.rigth-nav {
  margin-left: 4vh;
  border-left: 2px solid rgb(178, 178, 178);
  padding-left: 30px;
  height: 100%;
  margin-right: 25px;
}
</style>
