<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'

import anonim from '@/assets/img/anonim.jpg'

import { defineProps, ref, onMounted, computed } from 'vue'
</script>

<template>
  <div class="topic-card">
    <div class="header-card">
      <img :src="avatarLink || anonim" alt="User Avatar" class="avatar" />
      <div class="username">{{ userFirstName + ' ' + userSecondName }}</div>
      <div class="date-post">{{ formattedDate }}</div>
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
              @click="toggleFavorite(topic)"
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
}

.reading-time {
  margin-left: 10px;
  color: rgb(116, 115, 115);
  font-size: 16px;
  font-weight: 250;
}

.recomendation {
  margin-left: 10px;
  color: rgb(116, 115, 115);
  font-size: 16px;
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
