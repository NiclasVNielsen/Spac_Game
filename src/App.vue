<script setup>
import * as val from './scripts/validation'
import * as data from './scripts/data'
import { ref, watch } from 'vue'

val.generateWord()
const response = ref("")

const input = ref([])

const submitInput = () => {
  const formattetInput = val.formatInput(input.value)
  if(formattetInput == null)
    return

  response.value = val.validate(formattetInput)
}

watch(input.value, () => {
  submitInput()
})

</script>

<template>
  <main>
    {{ response }}
    <form>
      <template v-for="(char, index) in data.Word.value.length">
        <input type="text" v-model="input[index]">
      </template>
    </form>
  </main>
</template>

<style scoped>
</style>
