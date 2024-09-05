import { db } from '@/modules/firebase/firebase'
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore'
import type { UserData, UserWithId } from '../../types/UserData'
import { removeEmptyFields } from '../firebase/utils/removeEmptyFields'
import { getUserIdFromLocalStorage } from '@/local-storage/getUserId'

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

export const getAllUsers = async (): Promise<UserWithId[]> => {
  try {
    const userId = getUserIdFromLocalStorage()
    const querySnapshot = await getDocs(collection(db, 'users'))
    const users: UserWithId[] = []
    querySnapshot.forEach((doc) => {
      if (doc.id !== userId) {
        users.push({ id: doc.id, ...doc.data() })
      }
    })
    return users
  } catch (err) {
    console.log(err)
    return []
  }
}
