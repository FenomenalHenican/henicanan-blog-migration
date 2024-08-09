<script setup lang="ts">
import Avatar from 'primevue/avatar'
</script>

<template>
  <div class="topic-card">
    <div class="header-card">
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        size="normal"
        shape="circle"
      />
      <div class="username">Artyom Henicanan</div>
    </div>
    <span class="title-card">Your Portfolio is stopping you from geting that job</span>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.topic-card {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.header-card {
  display: flex;
  align-items: center;
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

.title-card {
  margin-top: 10px;
  font-size: 15px;
  font-weight: 500;
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
</style>
