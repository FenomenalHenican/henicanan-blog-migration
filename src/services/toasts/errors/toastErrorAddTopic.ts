import { useToast } from 'primevue/usetoast'

export const showErrorAddTopic = () => {
  const toast = useToast()
  toast.add({
    severity: 'error',
    summary: 'Message',
    detail: "You're not authorized",
    life: 3000
  })
}
