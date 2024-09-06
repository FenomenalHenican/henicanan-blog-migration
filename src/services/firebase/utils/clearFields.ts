import { allTypeOfTags } from '@/constants/allTypeOfTags'

export const clearFields = (
  inputHeader: string,
  inputTextArea: string,
  selectedTags: string[],
  availableTags: string[]
) => {
  inputHeader = ''
  inputTextArea = ''
  selectedTags = []
  availableTags = [...allTypeOfTags]
}
