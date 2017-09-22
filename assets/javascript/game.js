var gameVariable = {
	currentLetter: [""],

	allGuesses: [""],
	correctGuesses: [""],
	wrongGuesses: [""],
	orderAnswer: [""],

	carBrand: ["Toyota", "Mercedes", "Maserati", "Honda", "Jaguar", "Audi", "Infiniti", "Lexus", "Ferrari", "Bentley"];

	randomWord: [""],
	allWords: [""],

	isRepeat: true,
	isMatch: true,

	wins: 0,
	losses: 0,
	guessesRemaining: 15,

	computerWord: function() {
		var computerGuess = Math.random() * 10;
		computerGuess = Math.floor(computerGuess);
		
		this.randomWord = this.carBrand[computerGuess];
		this.allWords = this.randomWord.split("");

		console.log(this.randomWord + " " + this.allWords);

		this.allGuesses = [];
		this.wrongGuesses = [];
		this.correctGuesses = [];
		this.orderAnswer = [];
		this.guessesRemaining = 15;
	};

	checker: function() {
		var repeat = -1;

		for(var i = 0; i < this.allGuesses.length; i++) {
			if (this.currentLetter == this.allGuesses[i]) {
				repeat ++;
			}
		}

		if (repeat == 0) {
			this.isRepeat = false;
		}

		else {
			this.isRepeat = true;
		}
	};

	wordMatch: function() {
		var matchCheck = 0;

		for (var i = 0; i < this.allWords.length; i++) {
			if (this.currentLetter == this.allWords[i]) {
				matchCheck++;
			}
		}

		if (matchCheck == 0) {
			this.isMatch = false;
		}

		else {
			this.isMatch = true;
		}
	};

	matchRepeat: function() {

		if (this.isRepeat == true) {
			this.allGuesses.pop(this.currentLetter);
		}

		if (this.isRepeat == false && this.isMatch == false) {
			this.wrongGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}

		if (this.isRepeat == false && this.isMatch == true) {
			this.correctGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}	
	};

	brandIdentity: function() {

		if (this.correctGuesses.length == 0) {
			for (var i = 0; i < this.allWords.length; i++) {
				this.orderAnswer[i] = " - ";
			}
		}

		else {
			for (var i = 0; i < this.allWords.length; i++) {
				if (this.orderAnswer[i] != this.allWords[i]) {
					for (var j = 0; j < this.correctGuesses.length; j++) {
						if (this.correctGuesses[j] == this.allWords[i]) {
							this.orderAnswer[i] = this.allWords[i];
						}

						else {
							this.orderAnswer[i] = " - ";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.orderAnswer.join(" ");
		document.getElementById("num-wins").innerHTML = ("Wins: " + this.wins + " " + "Losses: " + this.losses);
		document.getElementById("letters-guessed").innerHTML = this.wrongGuesses;
		document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
	};
	
	result: function() {
		var progress = 0;

		for (var i = 0; i < this.allWords.length; i++) {
			if (this.orderAnswer[i] == this.allWords[i]) {
				progress++;
			}
		}

		if (progress == this.allWords.length) {
			alert("You win!!!");
			this.wins++;
			this.computerWord();
		}

		if (this.guessesRemaining == 0) {
			alert("You lose!!!");
			this.losses++;
			this.computerWord();
		}
	}
}
	
var gameStart = false;

document.onkeyup = function(event) {
	gameVariable.currentLetter = String.fromCharCode(event.keyCode).toUpperCase();

		if(gameVariable.currentLetter == " " && gameStart == false) {

			gameVariable.computerWord();
			gameStart = true;
		}

		gameVariable.allGuesses.push(gameVariable.currentLetter);
		console.log("Current Letter: " + gameVariable.currentLetter + "\n" + "Letters: " + gameVariable.allWords + "\n" + "Guesses: " + gameVariable.allGuesses);

		gameVariable.checker();
		gameVariable.wordMatch();

		gameVariable.matchRepeat();

		console.log("Correct Guesses: " + gameVariable.correctGuesses);
		console.log("Wrong Guesses: " + gameVariable.wrongGuesses);
		console.log("Guesses Remaining: " + gameVariable.guessesRemaining);

	gameVariable.brandIdentity();
	console.log(gameVariable.orderAnswer);

	gameVariable.result();
}