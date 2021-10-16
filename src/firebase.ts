import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSENGINGSENDER_ID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENT_ID,
  databaseURL: process.env.DATABASE
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const defaultStoragePath = process.env.DEFAULTPATH
const storage = getStorage(app, defaultStoragePath)

export { storage }
