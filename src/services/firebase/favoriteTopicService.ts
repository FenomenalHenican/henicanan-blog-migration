import { getUserIdFromLocalStorage } from '@/local-storage/getUserId'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/modules/firebase/firebase'

export const fetchFavoriteTopics = async () => {
  try {
    const userId = getUserIdFromLocalStorage()
    if (!userId) {
      console.log('No user ID found')
      return []
    }
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data()
      return userData.favoriteTopics || []
    } else {
      console.log('Favorite topics is found')
    }
  } catch (err) {
    console.log(err)
    return []
  }
}

export const addTopicToFavorite = async (userId: string, topicId: string) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      favoriteTopics: arrayUnion(topicId)
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const removeTopicFromFavorites = async (userId: string, topicId: string) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      favoriteTopics: arrayRemove(topicId)
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
