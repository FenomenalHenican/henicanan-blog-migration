import { useToast } from 'primevue/usetoast'

export const showErrorAddTag = () => {
  const toast = useToast()
  toast.add({
    severity: 'error',
    summary: 'Error message',
    detail: 'You can add a maximum of 3 tags',
    life: 3000
  })
}
