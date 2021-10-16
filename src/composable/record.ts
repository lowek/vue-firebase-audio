import { storage } from '@/firebase'
import { ref, uploadBytes } from 'firebase/storage'

class RecordData {
  async uploadFile (record: any, name: string) {
    const storageRef = ref(storage, name)
    await uploadBytes(storageRef, record).then(() => {
      console.log('Uploaded a file!')
    })
  }

  generateRandomId = () => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength))
    }
    return result
  }
}

export default new RecordData()
