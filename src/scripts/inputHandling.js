import * as data from './data'

/* 
    This file handles:
     - Typing behavior
     - Editing the input fields
*/


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
export const resetInputs = () => {
    const inputs = document.querySelectorAll('.inputs')

    data.input.value.forEach((inp, index) => {
        data.input.value[index] = ""
    })

    inputs[0].focus()
}

/* 
Edits placeholders to be correct characters you have already guessed
*/
export const editPlaceholders = (answers) => {
    const inputs = document.querySelectorAll('.inputs')
    answers.forEach((answer, index) => {
        if(answer == 1)
            inputs[index].placeholder = data.Word.value[index]
    })
}