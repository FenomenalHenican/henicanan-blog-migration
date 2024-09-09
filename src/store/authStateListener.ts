import { auth } from '../modules/firebase/firebase'
import { useUserStore } from '@/store/auth'
import type { User as FirebaseUser } from 'firebase/auth'
import type { UserData } from '@/types/UserData'

type User = FirebaseUser & UserData

export const setupAuthStateListener = () => {
  const userStore = useUserStore()

  auth.onAuthStateChanged((user: User | null) => {
    if (user) {
      userStore.setUser(user)
    } else {
      userStore.clearUser()
    }
  })
}
