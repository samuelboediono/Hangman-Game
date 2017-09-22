var wordBank = ["toyota", "honda", "lexus", "scion", "bmw"];
var wins = 0;
var losses = 0;

var wordPicker = wordBank[Math.floor(Math.random() * wordBank.length)];
var dashes = [];
var lettersGuessed = [];
var guesses = 10;
var score = 0;
underScoreString = [];


var validationChecker = function(inputStr) {
    patt=/[A-Za-z]/g; // pattern to check against - g is global
    var isLetter = patt.test(inputStr); // check if input is a letter T/F
    return isLetter
}
// alert users 
function notLetter (str) {
    displayError( str + " Is not a letter. lease type letters only! (a-z)");
}
// 
function createUnderscores() {
    for(var i = 0; i< wordPicker.length; i++){
        underScoreString.push("_");
    }
}

// show dashes for word
function displayWord(currentStr) {
    document.querySelector("#letters-dashes").innerHTML = currentStr.join(" ");
}
function displayGuesses() {
    document.querySelector("#guesses-remaining").innerHTML = guesses;
}
function displayError(errorStr){
    document.querySelector("#game-error").innerHTML = errorStr;
}
// compare user input to selected word
function keyCompare(userInput) {
    if(lettersGuessed.indexOf(userInput) !== -1) {
        // ignore already entered input
        displayError("letter already guessed: " + userInput);
        return;
    }

    if(wordPicker.indexOf(userInput) !== -1) {
        updateGameState(userInput)
    } else {
       guesses--;
       displayGuesses();
       lettersGuessed.push(userInput);
       document.querySelector("#letters-guessed").innerHTML = lettersGuessed.join(", ");
       if(guesses === 0) {
            gameLoss();
        }
   }
}
// display correctly guessed letters
function updateGameState(userInput) {
    var swapDashes = [];
    for(var c =0; c<wordPicker.length; c++){
        if(wordPicker[c] == userInput){
            underScoreString[c] = userInput;   
        }
    }
    displayWord(underScoreString);
    if(underScoreString.indexOf("_") === -1){
        gameWin();
    }
}

function gameWin(){
    wins++;
    document.querySelector("#total-wins").innerHTML = wins;
    gameReset();
    displayError("you win! play again?");
}

function gameLoss(){
    losses++;
    document.querySelector("#total-losses").innerHTML = losses;
    gameReset();
    displayError("you lose");
}

function gameReset(){
    wordPicker = wordBank[Math.floor(Math.random() * wordBank.length)];
 
    lettersGuessed = [];
    document.querySelector("#letters-guessed").innerHTML = lettersGuessed.join(", ");

    guesses = 10;
    underScoreString = [];
 
    createUnderscores();
    displayGuesses();
    displayWord(underScoreString);
}

document.addEventListener("keyup", function(event){
    var userInput =  event.key.toLowerCase();// key press value
    console.log(userInput);   
    var isLetter = validationChecker(userInput);
    // COMMENT OUT LATER:
    //isLetter = true;
    //
    displayError(""); // clear error on keyup
    console.log(isLetter);
        // isLetter ? compareLetter(userInput) : notLetter(userInput);
            if(userInput.length > 1) return; //ignore things like shift and backspace

            if (isLetter) {
                // true
                console.log(userInput);
                keyCompare(userInput);
            } else { 
                // false
                console.log(isLetter);
                notLetter(userInput);
            }
});

console.log(wordPicker)
gameReset();