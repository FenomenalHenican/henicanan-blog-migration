import { computed } from 'vue'

export const getTruncatedDescription = (discription: string) => {
  return computed(() => {
    const lines: string[] = discription.split('\n')
    if (lines.length > 3) {
      const truncatedLines = lines.slice(0, 3)
      const lastLineWords = truncatedLines[2].split(' ')
      lastLineWords[lastLineWords.length - 1] = '...'
      truncatedLines[2] = lastLineWords.join(' ')
      return truncatedLines.join('\n')
    }
    return discription
  })
}
