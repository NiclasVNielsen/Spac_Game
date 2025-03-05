<script setup>

import * as ih from './scripts/inputHandling'
import * as game from './scripts/game'
import * as data from './scripts/data'
import { watch } from 'vue'

/* 
  Genereate starting word
*/
game.generateWord()

/* 
  Auto submit
*/
watch(data.input.value, () => {
  game.submitInput()
})

</script>

<template>
  <main>
    <h2>Guess the word!</h2>
    <section v-for="(word, wordIndex) in data.attempts.value['words']">
      <div v-for="(letter, letterIndex) in word" :class="{ 
        red: data.attempts.value['validations'][wordIndex][letterIndex] == 3,
        yellow: data.attempts.value['validations'][wordIndex][letterIndex] == 2,
        green: data.attempts.value['validations'][wordIndex][letterIndex] == 1,
      }">
        {{ letter }}
      </div>
    </section>
    <form v-if="!data.GameWon.value">
      <template v-for="(char, index) in data.Word.value.length">
        <input class="inputs" maxlength="1" type="text" v-model="data.input.value[index]" @input="(event) => ih.smoothTyping(index, event)" @keydown="(event) => ih.smoothTypingHelper(index, event)">
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
