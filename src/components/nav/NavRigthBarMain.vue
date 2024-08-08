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
