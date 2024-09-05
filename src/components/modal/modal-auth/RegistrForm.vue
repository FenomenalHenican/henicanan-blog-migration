<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps<{
  login: string
  password: string
  onRegister: (login: string, password: string) => void
}>()
const emit = defineEmits(['registr', 'update:login', 'update:password'])

const localLogin = ref(props.login)
const localPassword = ref(props.password)

watch(localLogin, (newLogin) => {
  emit('update:login', newLogin)
})

watch(localPassword, (newPassword) => {
  emit('update:password', newPassword)
})

const handleRegister = () => {
  props.onRegister(localLogin.value, localPassword.value)
}
</script>

<template>
  <div class="flex">
    <label for="label-regist-input-username">Username</label>
    <InputText
      id="label-registr-input-username"
      placeholder="Enter username"
      class="registr-input-username ml-3"
      v-model="localLogin"
    />
  </div>
  <div>
    <label for="label-regist-input-password">Password</label>
    <InputText
      id="label-registr-input-password"
      placeholder="Enter password"
      class="registr-input-password ml-4"
      v-model="localPassword"
      type="password"
    />
  </div>
  <Button label="Registr" class="btn-registr" @click="handleRegister" />
</template>

<style scoped>
.registration-form {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.registr-input-username {
  border: 2px solid black;
  max-width: 30%;
  padding-left: 10px;
}

.registr-input-password {
  border: 2px solid black;
  max-width: 30%;
  padding-left: 10px;
  margin-top: 10px;
}

.btn-registr {
  margin-top: 20px;
  margin-left: 10%;
  width: 20vh;
  background-color: rgb(232, 232, 232);
}
</style>
