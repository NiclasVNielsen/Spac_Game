import { ref } from "vue";
import words from "./words.json"

/* 
    This file handles:
     - All the data!
*/

/* Holds the array of all the words */
export const WordsArray = ref(words.words)

/* Holds the selected word */
export const Word = ref("")

/* Keeps track of the users input */
export const input = ref([])

/* Are you winning son? */
export const GameWon = ref(false)

/* controls how vEry hungry the game is */
export const vEryCounter = ref("e")

/* Keeps track of whether or not the input is food */
export const isItFood = ref(true)

/* Array of previous attempts*/
export const attempts = ref({
    words: [],
    validations: []
})