export const allTypeOfTags = [
  'Technologies',
  'Health and Fitness',
  'Travelling',
  'Finance',
  'Culture',
  'Personal growth',
  'Science'
] as const 

export type Tag =  typeof allTypeOfTags [number]
