import { ref } from "vue";
import words from "./words.json"

export const WordsArray = ref(words.words)

export const Word = ref("")