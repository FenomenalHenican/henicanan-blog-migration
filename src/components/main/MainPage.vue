<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { provide, onMounted } from 'vue'
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

onMounted(() => {
  if (!route.name || route.name === 'mainpage') {
    navigateTo('listtopic')
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
  width: 10vh;
  border-right: 2px solid rgb(178, 178, 178);
  position: fixed;
  top: 0;
  left: 0;
}

.content {
  margin-top: 20px;
  margin-left: 13vh;
  width: 190vh;
}

.rigth-nav {
  margin-left: 4vh;
  border-left: 2px solid rgb(178, 178, 178);
  padding-left: 30px;
  height: 100%;
  margin-right: 25px;
}
</style>
