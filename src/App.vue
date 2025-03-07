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
  Force Word
*/
data.Word.value = "cookie".toUpperCase()

/* 
  Auto submit
*/
watch(data.input.value, () => {
  game.submitInput()
})

</script>

<template>
  <main>
    <h2 v-if="!data.GameWon.value">Guess the word!</h2>
    <h2 v-if="data.GameWon.value">You guessed the word!!!</h2>
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
    <p v-if="!data.GameWon.value && data.isItFood.value == false">
      Either thats not food or I'm a picky eater...
    </p>
    <p v-if="!data.GameWon.value">
      *Tip: I'm currently v{{data.vEryCounter.value}}ry hungry*
    </p>
    <p v-if="data.GameWon.value">
      You Won! *Om Nom Nom Nom Nom!!* I LOVE {{ data.Word }}!
    </p>
    <p v-if="data.GameWon.value">
      <a href="/">PLAY AGAIN!</a>
    </p>
  </main>
</template>
