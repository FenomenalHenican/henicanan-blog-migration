import './assets/main.css'
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import ToastService from 'primevue/toastservice'

import App from './App.vue'
import { router } from './router'
import { setupAuthStateListener } from '@/store/authStateListener'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

setupAuthStateListener()

app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
