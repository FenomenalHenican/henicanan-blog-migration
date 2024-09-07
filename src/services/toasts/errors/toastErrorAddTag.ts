import type { ToastServiceMethods } from 'primevue/toastservice'

export const showErrorAddTag = (toast: ToastServiceMethods) => {
  toast.add({
    severity: 'error',
    summary: 'Error message',
    detail: 'You can add a maximum of 3 tags',
    life: 3000
  })
}
