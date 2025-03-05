import { ref } from "vue";
import words from "./words.json"

/* Holds the array of all the words */
export const WordsArray = ref(words.words)

/* Holds the selected word */
export const Word = ref("")