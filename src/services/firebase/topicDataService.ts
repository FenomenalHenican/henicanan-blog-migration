import { db } from '../../modules/firebase/firebase'
import {
  setDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  arrayRemove,
  getDoc,
  arrayUnion
} from 'firebase/firestore'
import type { TopicData, TopicWithId } from '../../types/TopicData'
import { getUserIdFromLocalStorage } from '../../local-storage/getUserId'
import { removeEmptyFields } from './utils/removeEmptyFields'
import { showMessageAddTopic } from '@/services/toasts/message/toastAnnountationTopic'

const setTopic = async (topicData: TopicData): Promise<void> => {
  try {
    const cleanedTopicData = removeEmptyFields(topicData)
    const topicRef = doc(db, 'topics', topicData.userId + '_' + new Date().getTime())
    await setDoc(topicRef, cleanedTopicData)
    console.log('Topic succesfully added', topicData)
  } catch (err) {
    console.log(err)
  }
}

const getAllTopics = async (): Promise<TopicWithId[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'topics'))
    const topics: TopicWithId[] = []
    querySnapshot.forEach((doc) => {
      topics.push({ id: doc.id, ...(doc.data() as TopicData) })
    })
    return topics
  } catch (err) {
    console.log(err)
    return []
  }
}

const addTopicToFavorite = async (userId: string, topicId: string) => {
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

const removeTopicFromFavorites = async (userId: string, topicId: string) => {
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

const fetchFavoriteTopics = async () => {
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

const saveTopic = async (inputHeader: string, inputTextArea: string, selectedTags: string[]) => {
  const userId = getUserIdFromLocalStorage()

  if (userId === null) {
    console.log('UserId is null')
    return
  }

  const topicData: TopicData = {
    header: inputHeader,
    discription: inputTextArea,
    userId: userId,
    createdAt: new Date(),
    tags: selectedTags
  }
  try {
    await setTopic(topicData)
    console.log('topicData', topicData)
    showMessageAddTopic()
  } catch (err) {
    console.log(err)
  }
}

export {
  fetchFavoriteTopics,
  removeTopicFromFavorites,
  addTopicToFavorite,
  getAllTopics,
  setTopic,
  saveTopic
}
