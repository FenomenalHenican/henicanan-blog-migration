import type { ToastServiceMethods } from 'primevue/toastservice'

export const showMessageAddTopic = (toast: ToastServiceMethods) => {
  toast.add({
    severity: 'info',
    summary: 'Message',
    detail: 'Your topic is added',
    life: 3000
  })
}
