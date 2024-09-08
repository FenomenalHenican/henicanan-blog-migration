export const calculateTimeOfRead = (discription: string): string => {
  const wordsPerMinute = 120
  const numberOfWords = discription.trim().split(/\s+/).length
  const minutes = numberOfWords / wordsPerMinute
  if (minutes < 1) {
    return 'less than a minute read'
  } else if (minutes < 2) {
    return '1 minute read'
  } else {
    return `${Math.ceil(minutes)} minutes read`
  }
}
