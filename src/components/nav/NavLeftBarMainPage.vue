<script setup lang="ts">
import { inject } from 'vue'

import ModalAuth from '../modal/modal-auth/ModalAuth.vue'

const navigateTo = inject<(section: string) => void>('navigateTo')
const isActive = inject<(section: string) => boolean>('isActive')
</script>

<template>
  <ul class="top-colomn-left-nav">
    <li :class="{ active: isActive && isActive('personalarea') }">
      <i class="pi pi-home" @click="navigateTo && navigateTo('personalarea')" />
    </li>
    <li :class="{ active: isActive && isActive('searchfriends') }">
      <i class="pi pi-users" @click="navigateTo && navigateTo('searchfriends')" />
    </li>
    <li :class="{ active: isActive && isActive('messenger') }">
      <i class="pi pi-comment" @click="navigateTo && navigateTo('messenger')" />
    </li>
    <li :class="{ active: isActive && isActive('notification') }">
      <i class="pi pi-bell" @click="navigateTo && navigateTo('notification')" />
    </li>
    <li :class="{ active: isActive && isActive('favoritetopics') }">
      <i class="pi pi-bookmark" @click="navigateTo && navigateTo('favoritetopics')" />
    </li>
    <li :class="{ active: isActive && isActive('listtopic') }">
      <i class="pi pi-receipt" @click="navigateTo && navigateTo('listtopic')" />
    </li>
    <li :class="{ active: isActive && isActive('usersettings') }">
      <i class="pi pi-user-edit" @click="navigateTo && navigateTo('usersettings')" />
    </li>
    <li><div class="underline-left-nav" /></li>
    <li class="button-login"><ModalAuth /></li>
  </ul>
</template>

<style scoped>
.top-colomn-left-nav {
  margin-left: 20px;
  list-style: none;
  padding-top: 25vh;
}

.top-colomn-left-nav li {
  padding: 3px;
  margin-top: 25px;
  border-radius: 6px;
}

.top-colomn-left-nav li i {
  font-size: 28px;
}

.top-colomn-left-nav li i:hover {
  background-color: rgb(199, 199, 199);
  border-radius: 5px;
  padding: 2px;
  transition: 0.2s;
}

.active {
  background-color: rgb(199, 199, 199);
  width: fit-content;
  height: auto;
}

.underline-left-nav {
  border-top: 2px solid rgb(178, 178, 178);
  width: 55%;
  margin-top: 10px;
}
</style>
