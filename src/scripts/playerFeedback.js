import * as data from './data'

/* 
    This file handles:
     - Giving visual feedback to the player
*/


/* 
Stores data in the array that gets printed
*/
export const printResponse = (word, validation) => {
    data.attempts.value["words"].push(word)
    data.attempts.value["validations"].push(validation)
}

/* 
Checks if you won the game
*/
export const didIWin = (answers) => {
    let nope = false
    answers.forEach(answer => {
        if(answer != 1)
            nope = true
    })

    if(nope == false)
        data.GameWon.value = true
}

/* 
  more e's
*/
export const moreEs = () => {
    data.vEryCounter.value += "e"
}