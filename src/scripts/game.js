import * as data from './data'
import * as val from './validation'
import * as ih from './inputHandling'
import * as pf from './playerFeedback'

/* 
    This file handles:
     - Game setup
     - Game actions
*/

/* 
    Submits the input?
*/
export const submitInput = () => {
    const formattetInput = val.formatInput(data.input.value)
    if(formattetInput == null)
        return

    const response = val.validate(formattetInput)
    pf.printResponse(formattetInput, response)
    pf.moreEs()
    ih.resetInputs()
    ih.editPlaceholders(response)
    pf.didIWin(response)
}

/* 
    Picks out a random word from the words array
    and sets the Word value to the selected word
*/
export const generateWord = () => {
    const randomNumber = getRandomNumberInRange(0, data.WordsArray.value.length)
    data.Word.value = data.WordsArray.value[randomNumber].toUpperCase()
    return 
}
/* 
    Source:
    https://keploy.io/blog/community/javascript-random-number
*/
const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}