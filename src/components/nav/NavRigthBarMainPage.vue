<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import { ref } from 'vue'

import RecentTopic from '@/components/topic/RecentTopic.vue'
import { allTypeOfTags } from '@/constants/allTypeOfTags'

const inputTopicSearch = ref<string>('')
const recomendationTags = ref(allTypeOfTags)
</script>

<template>
  <InputText
    type="text"
    class="input-topic-search"
    placeholder="Search topic"
    v-model="inputTopicSearch"
  />
  <div class="wrapper-recent-topic">
    <span class="recent-title">Latest added topics</span>
    <div class="recent-topic">
      <RecentTopic />
      <RecentTopic class="recent" />
      <RecentTopic class="recent" />
    </div>
  </div>
  <div class="recommended-topic">
    <span class="recommended-topic-title">Recommended Topic</span>
    <div class="tag-group">
      <Tag
        v-for="tag in recomendationTags"
        :key="tag"
        class="tag"
        severity="secondary"
        :value="tag"
      />
    </div>
  </div>
</template>

<style scoped>
.input-topic-search {
  padding-left: 10px;
  height: 30px;
  margin-top: 30vh;
  border: 2px solid rgb(178, 178, 178);
}

.wrapper-recent-topic {
  margin-top: 20px;
}

.recent-title {
  margin-left: 5px;
  font-weight: 400;
  font-size: 20px;
}

.recent-topic {
  border-top: 2px solid rgb(178, 178, 178);
  margin-top: 10px;
}

.recommended-topic {
  margin-top: 20px;
  font-weight: 500;
  font-size: 20px;
}

.tag-group {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  border-top: 2px solid rgb(178, 178, 178);
  padding-top: 20px;
}

.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 12px;
  padding: 0 8px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
