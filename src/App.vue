<script setup>
import * as val from './scripts/validation'
import * as data from './scripts/data'
import { ref, watch } from 'vue'

val.generateWord()
const response = ref("")
response.value = val.validate("notapple")

const input = ref([])

const submitInput = () => {
  val.formatInput(input.value)
}

watch(input.value, () => {
  submitInput()
})

</script>

<template>
  <main>
    {{ response }}
    {{ data.Word.value.length }}
    {{ input }}
    <form>
      <template v-for="(char, index) in data.Word.value.length">
        <input type="text" v-model="input[index]">
      </template>
      <div @click="submitInput()">Validate</div>
    </form>
  </main>
</template>

<style scoped>
</style>
