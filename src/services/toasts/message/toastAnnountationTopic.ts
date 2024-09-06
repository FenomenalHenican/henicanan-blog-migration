import { useToast } from 'primevue/usetoast'

export const showMessageAddTopic = () => {
  const toast = useToast()
  toast.add({
    severity: 'info',
    summary: 'Message',
    detail: 'Your topic is added',
    life: 3000
  })
}
