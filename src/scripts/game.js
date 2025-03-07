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
    /* Is the input valid? */
    const formattetInput = val.formatInput(data.input.value)
    if(formattetInput == null)
        return

    /* Is the word in the array? */
    const isThatFood = val.isThatFood(formattetInput.toLowerCase())
    if(isThatFood == -1){
        data.isItFood.value = false
        return
    }

    /* Reset variable */
    data.isItFood.value = true

    /* Start a bunch of other processes */
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
    Get a random number
    Source:
    https://keploy.io/blog/community/javascript-random-number
*/
const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}