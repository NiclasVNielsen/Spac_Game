import * as data from './data'

export const generateWord = () => {
    data.Word.value = "pinapple"
    return 
}


/* 
    Returns array of results for every character in the inputet string
*/
export const validate = (word) => {
    console.log(word)

    if(word.length != data.Word.value.length)
        return

    /* 
        1 = Correct
        2 = Correct but wrong place
        3 = Wrong
    */
    const answers = []

    for(let i = 0; i < data.Word.value.length; i++){
        const result = validateCharacter(data.Word.value, i, word[i])
        answers.push(result)
    }

    console.log(answers)

    return answers
}

/* 
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