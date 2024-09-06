<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Toasts from 'primevue/toast'
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/store/auth'
import RegistrForm from './RegistrForm.vue'

const userStore = useUserStore()
const toast = useToast()

const toggleLoginModal = ref<boolean>(false)
const toggleRegistrForm = ref<boolean>(false)

const login = ref<string>('')
const password = ref<string>('')

const showAuthMessage = () => {
  toast.add({
    severity: 'success',
    summary: 'Message',
    detail: 'Your succesfully authorizated',
    life: 3000
  })
}

const handleSignInWithGoogle = async () => {
  await userStore.signInWithGoogleAction()
  toggleLoginModal.value = false
}

const handleRegister = async (login: string, password: string) => {
  try {
    await userStore.registerWithEmailAndPassword(login, password)
    toggleRegistrForm.value = false
  } catch (err) {
    console.log(err)
  }
}

const handleSignIn = async () => {
  try {
    await userStore.handleSignInWithEmailAndPassword(login.value, password.value)
    toggleLoginModal.value = false
    showAuthMessage()
  } catch (err) {
    console.log(err)
  }
}

const handleSignOut = async () => {
  await userStore.signOutAction()
}

const user = computed(() => userStore.user)
</script>

<template>
  <div>
    <div class="button-auth" v-if="!user">
      <i class="pi pi-sign-in" @click="toggleLoginModal = true" />
    </div>
    <div v-else>
      <button class="btn-logout" @click="handleSignOut"><i class="pi pi-times" /></button>
    </div>
    <Dialog
      v-model:visible="toggleLoginModal"
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
          <div class="wrapper-username-input">
            <label for="username" class="label-input-username">Username</label>
            <InputText id="username" class="input-username" v-model="login" />
          </div>
          <div class="wrapper-password-input">
            <label for="password" class="label-input-password">Password</label>
            <InputText id="password" class="input-password" type="password" v-model="password" />
          </div>
          <div class="wrapper-auth-service">
            <Button class="btn-auth-github"><i class="pi pi-github" /></Button>
            <Button class="btn-auth-google" @click="handleSignInWithGoogle"
              ><i class="pi pi-google"
            /></Button>
          </div>
          <div class="btn-nav">
            <Button label="Sign-In" text class="btn-signin w-40" @click="handleSignIn" />
          </div>
          <div class="registration-wrapper mb-5 mt-6 ml-4">
            <span class="registration-title" @click="toggleRegistrForm = true"
              >Still not registered? Go ahead and register</span
            >
            <div class="registration-form" v-if="toggleRegistrForm">
              <RegistrForm :onRegister="handleRegister" :login="login" :password="password" />
            </div>
          </div>
        </div>
      </template>
    </Dialog>
    <Toasts />
  </div>
</template>

<style scoped>
.btn-login i {
  font-size: 22px;
  font-weight: 500;
}

.btn-login i:hover {
  background-color: rgb(199, 199, 199);
  border-radius: 5px;
  padding: 6px;
  transition: 0.2s;
}

.modal-auth {
  display: flex;
  flex-direction: column;
  width: 70vh;
  height: fit-content;
}

.close-modal-auth {
  align-self: flex-end;
  margin-top: 10px;
  margin-right: 10px;
}

.close-modal-auth i {
  font-size: 20px;
}

.wrapper-username-input {
  margin-top: 30px;
  margin-left: 40px;
}

.label-input-username {
  font-size: 24px;
}

.input-username {
  border: 2px black solid;
  margin-left: 15px;
}

.wrapper-password-input {
  margin-top: 15px;
  margin-left: 40px;
}

.label-input-password {
  font-size: 24px;
}

.input-password {
  border: 2px black solid;
  margin-left: 20px;
}

.wrapper-auth-service {
  margin-left: 40%;
  margin-top: 20px;
}

.btn-auth-github {
  background-color: rgb(232, 232, 232);
  padding: 7px;
}

.btn-auth-github i {
  font-size: 28px;
}

.btn-auth-google {
  margin-left: 20px;
  background-color: rgb(232, 232, 232);
  padding: 7px;
}

.btn-auth-google i {
  font-size: 28px;
}

.btn-nav {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.btn-signin {
  font-size: 22px;
  background-color: rgb(232, 232, 232);
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-bottom: 20px;
  border: 2px solid #09a65c;
}

.btn-logout {
  background: none;
  border: none;
  font-size: 35px;
  margin-top: 0;
}

.btn-logout:hover {
  background-color: rgb(199, 199, 199);
  border-radius: 5px;
}
</style>
