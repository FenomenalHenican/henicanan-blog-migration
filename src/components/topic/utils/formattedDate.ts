import { Timestamp } from 'firebase/firestore'

export const formattedDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate()
  const today = new Date()
  const oneDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round((today.getTime() - date.getTime()) / oneDay)

  switch (true) {
    case diffDays === 0:
      return 'Today'
    case diffDays === 1:
      return 'Yesterday'
    case diffDays === 2:
      return 'the day before yesterday'
    case diffDays < 30:
      return `${diffDays} days ago`
    default: {
      const months = Math.floor(diffDays / 30)
      if (months <= 11) {
        return `${months} months ago`
      } else {
        return '1 year ago'
      }
    }
  }
}
