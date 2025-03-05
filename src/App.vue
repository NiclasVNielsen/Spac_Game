<script setup>
import * as methods from './scripts/methods'
import * as data from './scripts/data'
import { ref, watch } from 'vue'

/* 
  Genereate starting word
*/
methods.generateWord()



/* 
  more e's
*/
const moreEs = () => {
  data.vEryCounter.value += "e"
}

/* 
  Submits the input?
*/
const submitInput = () => {
  const formattetInput = methods.formatInput(data.input.value)
  if(formattetInput == null)
    return

  const response = methods.validate(formattetInput)
  printResponse(formattetInput, response)
  moreEs()
  resetInputs()
  editPlaceholders(response)
  didIWin(response)
}

/* 
  Auto submit
*/
watch(data.input.value, () => {
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

  if(event.data != null){
    if(index != inputs.length - 1){
      /* Move to next input */
      if(inputs[index].value != "")
        inputs[index].nextElementSibling.focus()
    }
  }
  else{
    if(index != 0)
      /* Move to previous input */
      inputs[index].previousElementSibling.focus()
  }
}

/* 
  Handles cases where you wanna go backwards while on an empty input
  and when you are typing in an input that already has a character
*/
const smoothTypingHelper = (index, event) => {
  const inputs = document.querySelectorAll('.inputs')
  if(event.code == "Backspace" && inputs[index].value == "" && index != 0)
    inputs[index].previousElementSibling.focus()
  if(event.code != "Backspace" && inputs[index].value != "")
    inputs[index].nextElementSibling.focus()
}

/* 
  Resets the inputs so you can type a new word
*/
const resetInputs = () => {
  const inputs = document.querySelectorAll('.inputs')

  data.input.value.forEach((inp, index) => {
    data.input.value[index] = ""
  })

  inputs[0].focus()
}

/* 
  Edits placeholders to be correct characters you have already guessed
*/
const editPlaceholders = (answers) => {
  const inputs = document.querySelectorAll('.inputs')
  answers.forEach((answer, index) => {
    if(answer == 1)
      inputs[index].placeholder = data.Word.value[index]
  })
}

/* 
  Checks if you won the game
*/
const didIWin = (answers) => {
  let nope = false
  answers.forEach(answer => {
    if(answer != 1)
      nope = true
  })

  if(nope == false)
    data.GameWon.value = true
}

</script>

<template>
  <main>
    <h2>Guess the word!</h2>
    <section v-for="(word, wordIndex) in attempts['words']">
      <div v-for="(letter, letterIndex) in word" :class="{ 
        red: attempts['validations'][wordIndex][letterIndex] == 3,
        yellow: attempts['validations'][wordIndex][letterIndex] == 2,
        green: attempts['validations'][wordIndex][letterIndex] == 1,
      }">
        {{ letter }}
      </div>
    </section>
    <form v-if="!data.GameWon.value">
      <template v-for="(char, index) in data.Word.value.length">
        <input class="inputs" maxlength="1" type="text" v-model="data.input.value[index]" @input="(event) => smoothTyping(index, event)" @keydown="(event) => smoothTypingHelper(index, event)">
      </template>
    </form>
    <p v-if="data.GameWon.value">
      You Won! *Om Nom Nom Nom Nom!!* I LOVE {{ data.Word }}!
    </p>
    <p v-if="!data.GameWon.value">
      *Tip: I'm currently v{{data.vEryCounter.value}}ry hungry*
    </p>
  </main>
</template>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: "Comic Sans MS"
  text-align: center

body
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center

main > p, main > h2
  margin: 1rem 0

form, section
  display: flex
  justify-content: center
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
