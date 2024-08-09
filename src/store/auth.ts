import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  auth,
  provider,
  signInWithPopup as signInWithGoogle,
  signOut,
  signInWithEmailAndPassword
} from '@/modules/firebase/firebase'
import type { User } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = null
    localStorage.removeItem('userTokens')
  }

  const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const user = result.user
      setUser(user)

      const idTokenResult = await user.getIdTokenResult()

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          accessToken: idTokenResult.token,
          refreshToken: (user as any).refreshToken,
          email: user.email,
          userId: user.uid
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  const signInWithGoogleAction = async () => {
    try {
      const result = await signInWithGoogle(auth, provider)
      const user = result.user
      setUser(user)

      const idTokenResult = await user.getIdTokenResult()

      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          accessToken: idTokenResult.token,
          refreshToken: (user as any).refreshToken,
          email: user.email,
          userId: user.uid
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  const signOutAction = async () => {
    try {
      await signOut(auth)
      clearUser()
    } catch (err) {
      console.log(err)
    }
  }
  return {
    user,
    setUser,
    clearUser,
    signInWithGoogleAction,
    registerWithEmailAndPassword,
    handleSignInWithEmailAndPassword,
    signOutAction
  }
})
