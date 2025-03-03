import * as data from './data'

export const generateWord = () => {
    data.Word.value = "pinapple"
    return 
}


/* 
    word is an array
*/
export const formatInput = (word) => {
    /* Failsafe only 1 character in every slot is accepted (not 0 or < 1)*/
    for(let i = 0; i < word.length; i++){
        if(word[i].length != 1){
            console.log("Wrong Input")
            return null
        }
    }
    if(word.length != data.Word.value.length){
        console.log("Wrong Input")
        return null
    }

    const result = word.join("")
    console.log(result)
    return result
}


/* 
    Validates the entire input

    Returns an array of results for every character in the inputet string
*/
export const validate = (word) => {
    /* Failsafe if the input isn't the correct length */
    if(word.length != data.Word.value.length)
        return

    /* 
        1 = Correct
        2 = Correct but wrong place
        3 = Wrong
    */
    const answers = []

    /* Calls function to validate every input */
    for(let i = 0; i < data.Word.value.length; i++){
        const result = validateCharacter(data.Word.value, i, word[i])
        answers.push(result)
    }

    return answers
}


/* 
    Validates a single character

    word = the correct word
    index = the index of the correct word to match
    character = the character you are matching to the word
*/
const validateCharacter = (word, index, character) => {
    /* Correct */
    if(word[index] == character)
        return 1
    
    /* Semi-correct */
    if(word.indexOf(character) != -1)
        return 2
    
    /* Wrong */
    return 3
}