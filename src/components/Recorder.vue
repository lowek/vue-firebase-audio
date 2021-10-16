<template>
  <div class="recorder">
      <div class="container">
        <h2>Vue record firebase</h2>
        <div class="form">
          {{recordedVoice}}
          <audio controls :src="recordedVoice" />
          <button class="cta" @click="recordNow" :disabled="recordedVoice">Record</button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import record from '@/composable/record.ts'

export default defineComponent({
  name: 'Recorder',
  props: {
    recordTime: {
      type: Number as PropType<number>,
      default: 3000
    }
  },
  setup (props: any) {
    const { generateRandomId } = record
    const recordedVoice = ref()
    const recordNow = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const media = new MediaRecorder(stream)
      const audioChunks: any = []
      media.start()

      const handleData = (e: any) => {
        audioChunks.push(e.data)
      }

      media.addEventListener('dataavailable', handleData)

      media.addEventListener('stop', () => {
        const generatedName = generateRandomId()
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        recordedVoice.value = URL.createObjectURL(audioBlob)
        record.uploadFile(audioBlob, `${generatedName}.wav`)
      })

      setTimeout(() => {
        media.stop()
      }, props.recordTime)
    }

    return { recordNow, recordedVoice }
  }
})
</script>

<style lang="scss" scoped>
$background: #eaeaea;
$white: #ffffff;
$green: #4fc08d;
$red: #ff4040;

.recorder {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: $background;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 4rem;
    background: $white;
    border-radius: 12px;
    box-shadow: 0 10px 15px rgba(0,0,0,0.02);

    audio {
      min-width: 240px;
      margin-bottom: 12px;
    }

    .cta {
      border: 0;
      background: $green;
      color: $white;
      border-radius: 24px;
      padding: 12px 32px;
      cursor: pointer;

      &:hover {
        background-color: $red;
      }

      &:disabled {
        filter: grayscale(100%);
      }
    }
  }
}
</style>
