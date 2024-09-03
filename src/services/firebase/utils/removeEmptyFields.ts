export const removeEmptyFields = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value == null) return false
      if (typeof value === 'string' && value.trim() === '') return false
      return true
    })
  ) as Partial<T>
}
