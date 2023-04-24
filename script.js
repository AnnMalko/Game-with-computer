const text = "Game with a computer...Who is smarter?";
let i = 0;
const speed = 120;

function start() {
	if (i < text.length) {
		document.querySelector("#par").textContent += text.charAt(i);
		i++;
		setTimeout(start, speed);
	}
}

start();

const button = document.querySelector("#btn");
const inputField = document.querySelector("#input_field");
const randomNumber = Math.floor(Math.random() * 10) + 1;

inputField.addEventListener("keypress", function (e) {
	if (e.keyCode === 13) play();
});

button.addEventListener("click", play);
let userAttempts = 5;
const numberAttempts = document.querySelector("#numberAttempts");
const attempts = document.querySelector("#attempts");

function play() {
	const userNumber = document.querySelector("#input_field").value;
	userAttempts--;
	attempts.textContent = userAttempts;
	numberAttempts.textContent += userNumber + " ";
	if (userAttempts === 0) {
		if (Number(userNumber) === randomNumber) {
			winner();
		} else {
			fail();
		}
	} else {
		if (userNumber < 1 || userNumber > 20) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Enter the number from 1 to 20!",
			});
			inputField.value = "";
		} else if (isNaN(userNumber)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Please enter a number!",
			});
			inputField.value = "";
		} else {
			if (randomNumber > userNumber) {
				Swal.fire("Try a bigger number.", "The computer is winning!");
				inputField.value = "";
			} else if (randomNumber < userNumber) {
				Swal.fire("Try a smaller number.", "The computer is winning!");
				inputField.value = "";
			} else {
				winner();
			}
		}
	}
}

function winner() {
	Swal.fire({
		title: "Congradulations! You are the winner!",
		width: 800,
		padding: "15px",
		backdrop: `
          rgba(0,0,123,0.4)
          url("https://img.wattpad.com/e4e9bc0f8bfc9adc1e5916d46b24ced6e19acd35/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6d314445334e6f6e7178412d54513d3d2d3936383037323632302e313633656261646534303934373664363135383833373538323233312e676966")
          center top
          no-repeat
        `,
	});
	inputField.value = "";
	inputField.setAttribute("disabled", "");
	button.setAttribute("disabled", "");
	btnNewGame.style.display = "block";
	btnNewGame.addEventListener("click", newGame);
}

const gameOver = document.querySelector("#game_over");
const btnNewGame = document.querySelector("#btnNewGame");
const answer = document.querySelector("#answer");

function fail() {
	gameOver.style.display = "block";
	btnNewGame.style.display = "block";
	answer.textContent = randomNumber;
	inputField.value = "";
	inputField.setAttribute("disabled", "");
	button.setAttribute("disabled", "");
	btnNewGame.addEventListener("click", newGame);
}

function newGame() {
	inputField.removeAttribute("disabled");
	button.removeAttribute("disabled");
	numberAttempts.textContent = "";
	attempts.textContent = "";
	userAttempts = 5;
	gameOver.style.display = "none";
}


const animation = new TimelineMax();

animation.from("#container", 1.5, {
	opacity: 0,
	x: -400,
	skewX: 15,
	delay: 5,
});

animation.from("#user_attempts", 1.5, {
	opacity: 0,
	delay: 0.1,
	x: -400,
	skewX: 15,
});

animation.from("#number_attempts", 1.5, {
	opacity: 0,
	delay: 0.1,
	x: -400,
	skewX: 15,
});

animation.from("#btnNewGame", 1.5, {
	opacity: 0,
	delay: 0.1,
	x: -400,
	skewX: 15,
});
