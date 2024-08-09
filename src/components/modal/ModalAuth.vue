<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

import { ref } from 'vue'

const toogleLoginModal = ref<boolean>(false)
</script>

<template>
  <div>
    <div class="button-auth">
      <i class="pi pi-sign-in" @click="toogleLoginModal = true" />
    </div>
    <div class="button-logout">
      <Button> <i class="pi pi-times" /></Button>
    </div>

    <Dialog
      v-model:visible="toogleLoginModal"
      modal
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }"
    >
      <template #container="{ closeCallback }">
        <div class="modal-auth" style="border-radius: 14px; background-image: white">
          <div class="close-modal-auth">
            <i class="pi pi-times" @click="closeCallback" />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>
