<script setup>
import * as val from './scripts/validation'
import * as data from './scripts/data'
import { ref, watch } from 'vue'

/* 
  Genereate starting word
*/
val.generateWord()

const input = ref([])

/* 
  Submits the input?
*/
const submitInput = () => {
  const formattetInput = val.formatInput(input.value)
  if(formattetInput == null)
    return

  const response = val.validate(formattetInput)
  printResponse(formattetInput, response)
}

/* 
  Auto submit
*/
watch(input.value, () => {
  submitInput()
})

/* 
  Array of previous attempts
*/
const attempts = ref({
  words: [],
  validations: []
})

/* 
  Stores data in the array that gets printed
*/
const printResponse = (word, validation) => {
  attempts.value["words"].push(word)
  attempts.value["validations"].push(validation)
}


/* 
  Switches between the different input fields as you are typing
*/
const smoothTyping = (index, event) => {
  const inputs = document.querySelectorAll('.inputs')
  
  if(event.code != "Backspace"){
    if(index != inputs.length - 1)
      /* Move to next input */
      inputs[index].nextElementSibling.focus()
  }
  else{
    if(index != 0)
      /* Move to previous input */
      inputs[index].previousElementSibling.focus()
  }
}

</script>

<template>
  <main>
    <section v-for="(word, wordIndex) in attempts['words']">
      <div v-for="(letter, letterIndex) in word" :class="{ 
        red: attempts['validations'][wordIndex][letterIndex] == 3,
        yellow: attempts['validations'][wordIndex][letterIndex] == 2,
        green: attempts['validations'][wordIndex][letterIndex] == 1,
      }">
        {{ letter }}
      </div>
    </section>
    <form>
      <template v-for="(char, index) in data.Word.value.length">
        <input class="inputs" maxlength="1" type="text" v-model="input[index]" @keyup="(event) => smoothTyping(index, event)">
      </template>
    </form>
  </main>
</template>

<style lang="sass" scoped>
*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: "Comic Sans MS"

form, section
  display: flex
input
  text-transform: uppercase 
  width: 2em
  height: 2em
  font-size: 2em
  display: flex
  align-items: center
  justify-content: center
  text-align: center

section > div
  width: 2em
  height: 2em
  font-size: 2em
  display: flex
  align-items: center
  justify-content: center
  text-align: center
  border: solid 1px #222
  padding: 1px 2px

.green
  background: green

.yellow
  background: yellow

.red
  background: red
</style>
