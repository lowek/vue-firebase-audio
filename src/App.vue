<template>
  <Recorder :record-time="6000" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Recorder from '@/components/Recorder.vue'

export default defineComponent({
  name: 'App',
  components: {
    Recorder
  }
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
