<script setup lang="ts"></script>

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
