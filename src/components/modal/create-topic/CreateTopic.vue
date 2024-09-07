<script setup lang="ts">
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Tag from 'primevue/tag'
import { allTypeOfTags, type Tag as Tags } from '@/constants/allTypeOfTags'
import { showErrorAddTag } from '@/services/toasts/errors/toastErrorAddTag'

import { ref } from 'vue'
import { saveTopic } from '@/services/firebase/topicDataService'

const visible = ref(false)
const inputHeader = ref('')
const inputTextArea = ref('')

const availableTags = ref([...allTypeOfTags])

const selectedTags = ref<Tags[]>([])

const closeDialog = () => {
  clearFields()
  visible.value = false
}

const clearFields = () => {
  inputHeader.value = ''
  inputTextArea.value = ''
  availableTags.value = [...allTypeOfTags]
}

const selectTag = (tag: Tags) => {
  if (selectedTags.value.length < 3) {
    selectedTags.value.push(tag)
    availableTags.value = availableTags.value.filter((t) => t !== tag)
  } else {
    showErrorAddTag()
  }
}

const removeTag = (tag: Tags) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag)
  availableTags.value.push(tag)
}

const handleSaveTopic = async () => {
  try {
    await saveTopic(inputHeader.value, inputTextArea.value, selectedTags.value)
  } catch (err) {
    console.log(err)
  } finally {
    closeDialog()
  }
}
</script>

<template>
  <Button
    icon="pi pi-plus"
    severity="secondary"
    rounded
    aria-label="Bookmark"
    class="btn-add-topic"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    maximizable
    modal
    header="Create Topic"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    ><div class="header-name">
      <span class="header-title">Enter title your topic</span>
      <InputText class="input-header" v-model="inputHeader" />
    </div>
    <div class="textarea">
      <span class="textarea-title">Write discription your topic or question</span>
      <Textarea class="input-textarea" v-model="inputTextArea" />
    </div>
    <div class="select-tag">
      <div class="tag-group">
        <span class="select-tag-title">Select up to three tags for your topic</span>
        <div class="tag-list">
          <Tag
            v-for="tag in availableTags"
            :key="tag"
            class="tag"
            severity="secondary"
            :value="tag"
            @click="selectTag(tag)"
          />
        </div>
      </div>
      <div class="selected-tag-group" v-if="selectedTags.length">
        <span class="selected-tag-title">Selected tags:</span>
        <div class="selected-tag-list">
          <Tag
            v-for="tag in selectedTags"
            :key="tag"
            class="tag"
            severity="secondary"
            :value="tag"
            @click="removeTag(tag)"
          />
        </div>
      </div>
    </div>
    <Button class="btn-save-topic" label="Save Topic" @click="handleSaveTopic" />
  </Dialog>
  <Toast />
</template>

<style>
.header-name,
.textarea {
  display: flex;
  flex-direction: column;
}

.header-title,
.textarea-title,
.select-tag-title,
.selected-tag-title {
  font-size: 16px;
  font-family: sans-serif;
  color: #666;
}

.textarea-title {
  margin-top: 20px;
}

.input-header {
  margin-top: 6px;
  border: 1.5px solid #999;
  border-radius: 7px;
  width: 90%;
  min-width: 50%;
  max-width: 100%;
  font-size: 18px;
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.input-textarea {
  width: 100%;
  margin-top: 6px;
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  border: 1.5px solid #999;
  border-radius: 7px;
}

.tag-group {
  margin-top: 16px;
}

.tag-list {
  margin-top: 10px;
  display: flex;
}

.tag,
.first-tag:hover {
  cursor: pointer;
}

.tag {
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 8px;
}

.selected-tag-group {
  margin-top: 10px;
}

.selected-tag-list {
  margin-top: 8px;
}

.btn-save-topic {
  margin-top: 20px;
  margin-left: 5px;
  font-size: 20px;
  font-family: sans-serif;
  border: 3px solid #777;
  padding: 5px;
}

.btn-save-topic:hover {
  color: #777;
  transition: 0.3s;
}
</style>
