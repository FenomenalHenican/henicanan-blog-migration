import type { ToastServiceMethods } from 'primevue/toastservice'

export const showErrorAddTopic = (toast: ToastServiceMethods) => {
  toast.add({
    severity: 'error',
    summary: 'Message',
    detail: "You're not authorized",
    life: 3000
  })
}
