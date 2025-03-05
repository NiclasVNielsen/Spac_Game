import * as data from './data'

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

/* 
    Takes the input as an array, validates if it's filled out correctly and turns into a string
*/
export const formatInput = (word) => {
    /* Failsafe Only pass if full word is typed on */
    if(word.length != data.Word.value.length)
        return null
    /* Failsafe Only 1 character in every slot is accepted (not 0 or < 1)*/
    for(let i = 0; i < word.length; i++){
        if(word[i] != null && word[i].length != 1)
            return null
    }

    const result = word.join("").toUpperCase()
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


/* 
  more e's
*/
const moreEs = () => {
    data.vEryCounter.value += "e"
}

/* 
Submits the input?
*/
export const submitInput = () => {
    const formattetInput = formatInput(data.input.value)
    if(formattetInput == null)
        return

    const response = validate(formattetInput)
    printResponse(formattetInput, response)
    moreEs()
    resetInputs()
    editPlaceholders(response)
    didIWin(response)
}


/* 
Stores data in the array that gets printed
*/
const printResponse = (word, validation) => {
    data.attempts.value["words"].push(word)
    data.attempts.value["validations"].push(validation)
}


/* 
Switches between the different input fields as you are typing
*/
export const smoothTyping = (index, event) => {
    const inputs = document.querySelectorAll('.inputs')

    if(event.data != null){
        if(index != inputs.length - 1){
        /* Move to next input */
        if(inputs[index].value != "")
            inputs[index].nextElementSibling.focus()
        }
    }
    else{
        if(index != 0)
        /* Move to previous input */
        inputs[index].previousElementSibling.focus()
    }
}

/* 
Handles cases where you wanna go backwards while on an empty input
and when you are typing in an input that already has a character
*/
export const smoothTypingHelper = (index, event) => {
    const inputs = document.querySelectorAll('.inputs')
    if(event.code == "Backspace" && inputs[index].value == "" && index != 0)
        inputs[index].previousElementSibling.focus()
    if(event.code != "Backspace" && inputs[index].value != "")
        inputs[index].nextElementSibling.focus()
}

/* 
Resets the inputs so you can type a new word
*/
const resetInputs = () => {
    const inputs = document.querySelectorAll('.inputs')

    data.input.value.forEach((inp, index) => {
        data.input.value[index] = ""
    })

    inputs[0].focus()
}

/* 
Edits placeholders to be correct characters you have already guessed
*/
const editPlaceholders = (answers) => {
    const inputs = document.querySelectorAll('.inputs')
    answers.forEach((answer, index) => {
        if(answer == 1)
            inputs[index].placeholder = data.Word.value[index]
})
}

/* 
Checks if you won the game
*/
const didIWin = (answers) => {
    let nope = false
    answers.forEach(answer => {
        if(answer != 1)
            nope = true
})

if(nope == false)
    data.GameWon.value = true
}