interface UserTokens {
  userId: string
}

export const getUserIdFromLocalStorage = (): string | null => {
  const userTokensString = localStorage.getItem('userTokens')

  if (userTokensString) {
    try {
      const userTokens: UserTokens = JSON.parse(userTokensString)
      return userTokens.userId
    } catch (err) {
      console.log('Error parsing user tokens from Local Storage', err)
      return null
    }
  }
  return null
}
