let h1 = document.querySelector('.header')
let startButton = document.querySelector('.start-button');
console.log(startButton);
startButton.addEventListener('click', startGame);
let net = document.querySelector('#net');
let scoreOne = document.querySelector('#score1');
let scoreTwo = document.querySelector('#score2');
let theBall = document.querySelector('#ball');
let resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetGame);
let paddleHeight = 150;
let paddleWidth = 30;
let ballRadius = 25;
let halfPaddleHeight = paddleHeight / 2;
let speedOfPaddle1 = 0;
let speedOfPaddle2 = 0;
let positionOfPaddle1 = 220;
let positionOfPaddle2 = 220;
let topPositionOfBall = 510;
let leftPositionOfBall = 820;
let topSpeedOfBall = 10;
let leftSpeedOfBall = 0;
let score1 = 0;
let score2 = 0;

function startGame(e) {
	e.preventDefault();
	scoreOne.style.display = 'block';
	scoreTwo.style.display = 'block';
	startButton.style.display = 'none';
	theBall.style.display = 'block';
	net.style.display = 'block';
	h1.style.fontSize = '40px';
	resetButton.style.display = 'block';
	startBall();
}

function resetGame(e) {
	e.preventDefault();
	document.location.href = "";
}

// 2 players

function startBall() {
	topPositionOfBall = 510;
	leftPositionOfBall = 820;

	if (Math.random() < 0.5) {
		var side = 1;
	} else {
		var side = -1;
	}

	leftSpeedOfBall = side * (Math.random() * 6 + 5);
	topSpeedOfBall = Math.random() * 6 + 5;
}

document.addEventListener('keydown', function (e) {
	// W
	if (e.keycode == 87 || e.which == 87) {
		speedOfPaddle1 = -10;
	}
	// S
	if (e.keycode == 83 || e.which == 83) {
		speedOfPaddle1 = 10;
	}
	// Up Arrow
	if (e.keycode == 38 || e.which == 38) {
		speedOfPaddle2 = -10;
	}
	// Down Arrow
	if (e.keycode == 40 || e.which == 40) {
		speedOfPaddle2 = 10;
	}
});

document.addEventListener('keyup', function (e) {
	// W
	if (e.keycode == 87 || e.which == 87) {
		speedOfPaddle1 = 0;
	}
	// S
	if (e.keycode == 83 || e.which == 83) {
		speedOfPaddle1 = 0;
	}
	// Up Arrow
	if (e.keycode == 38 || e.which == 38) {
		speedOfPaddle2 = 0;
	}
	// Down Arrow
	if (e.keycode == 40 || e.which == 40) {
		speedOfPaddle2 = 0;
	}
});

window.setInterval(function show() {
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;

	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	// Stop the paddle from leaving the top of the window
	if (positionOfPaddle1 <= 1) {
		positionOfPaddle1 = 1;
	}
	if (positionOfPaddle2 <= 1) {
		positionOfPaddle2 = 1;
	}

	// Stop the paddle from leaving the bottom of the window
	if (positionOfPaddle1 >= window.innerHeight - paddleHeight) {
		positionOfPaddle1 = window.innerHeight - paddleHeight;
	}
	if (positionOfPaddle2 >= window.innerHeight - paddleHeight) {
		positionOfPaddle2 = window.innerHeight - paddleHeight;
	}

	if (
		topPositionOfBall <= 10 ||
		topPositionOfBall >= window.innerHeight - ballRadius
	) {
		topSpeedOfBall = -topSpeedOfBall;
	}

	if (leftPositionOfBall <= paddleWidth) {
		if (
			topPositionOfBall > positionOfPaddle1 &&
			topPositionOfBall < positionOfPaddle1 + paddleHeight
		) {
			leftSpeedOfBall = -leftSpeedOfBall;
		} else {
			score2++;
			startBall();
		}
	}

	if (leftPositionOfBall >= window.innerWidth - ballRadius - paddleWidth) {
		if (
			topPositionOfBall > positionOfPaddle2 &&
			topPositionOfBall < positionOfPaddle2 + paddleHeight
		) {
			leftSpeedOfBall = -leftSpeedOfBall;
		} else {
			score1++;
			startBall();
		}
	}

	document.getElementById('paddle1').style.top = positionOfPaddle1 + 'px';
	document.getElementById('paddle2').style.top = positionOfPaddle2 + 'px';

	document.getElementById('ball').style.top = topPositionOfBall + 'px';
	document.getElementById('ball').style.left = leftPositionOfBall + 'px';

	document.getElementById('score1').innerHTML = score1.toString();
	document.getElementById('score2').innerHTML = score2.toString();
}, 1000 / 60);
