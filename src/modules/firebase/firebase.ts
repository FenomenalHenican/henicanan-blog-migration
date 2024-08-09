import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAHZ3OfIiDbIqd8dzeE54Sw-cA7JEHQIWo',
  authDomain: 'utopian-cistern-406011.firebaseapp.com',
  projectId: 'utopian-cistern-406011',
  storageBucket: 'utopian-cistern-406011.appspot.com',
  messagingSenderId: '185791041506',
  appId: '1:185791041506:web:d7903b9cf721441f3633bb'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage()
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export {
  storage,
  auth,
  provider,
  db,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
}
