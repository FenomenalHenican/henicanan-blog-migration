import { db } from '@/modules/firebase/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { IUserData } from '@/types/UserData'

const removeEmptyFields = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== ''))
}

export const saveUserData = async (userId: string, userData: IUserData): Promise<void> => {
  try {
    const cleanedUserData = removeEmptyFields(userData)
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, cleanedUserData, { merge: true })
    console.log('User data successfully saved: ', userData)
  } catch (err) {
    console.error(err)
  }
}

export const getUserData = async (userId: string): Promise<IUserData | null> => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data() as IUserData
    } else {
      return null
    }
  } catch (err) {
    console.error(err)
    return null
  }
}
