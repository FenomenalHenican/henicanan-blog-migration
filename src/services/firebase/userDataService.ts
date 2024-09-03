import { db } from '@/modules/firebase/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import type { UserData } from '../../types/UserData'
import { removeEmptyFields } from '../firebase/utils/removeEmptyFields'

export const saveUserData = async (userId: string, userData: UserData): Promise<void> => {
  try {
    const cleanedUserData = removeEmptyFields(userData)
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, cleanedUserData, { merge: true })
    console.log('User data successfully saved: ', userData)
  } catch (err) {
    console.error(err)
  }
}

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data() as UserData
    } else {
      return null
    }
  } catch (err) {
    console.error(err)
    return null
  }
}
