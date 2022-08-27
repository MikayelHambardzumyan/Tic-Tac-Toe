let board = document.querySelector('.board'),
	res = document.querySelector('.res'),
	btnGame = document.querySelector('.new-game'),
	fields = document.querySelectorAll('.field'),
    playerXscore = document.querySelector(".playerXscore"),
    playerOscore = document.querySelector(".playerOscore"),
    scoreX = 0,
    scoreO = 0,
	count = 0,
	step = false,
	circle = `<svg class="circle">
				<circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round" />
			</svg>`,
	cross = `<svg class="cross">
				<line x1="15" y1="15" x2="100" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
				<line x1="100" y1="15" x2="15" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
			</svg>`;

function stepCross(target) {
	const fl = document.getElementById(`${target.id}`);
	fl.setAttribute("onclick", "event.stopPropagation()");
	target.innerHTML = cross;
	target.classList.add('x');
	count++;
	console.dir(target);
}
function stepZero(target) {
	const fl = document.getElementById(`${target.id}`);
	fl.setAttribute("onclick", "event.stopPropagation()");
	target.innerHTML = circle;
	target.classList.add('o');
	count++;
}

function init(e) {
	if (!step) stepCross(e.target);
	else stepZero(e.target);
	step = !step;
	win();
}

function newGame() {
	step = false;
	count = 0;
	res.innerText = '';
	fields.forEach(item => {
		item.innerHTML = '';
		item.classList.remove('x', 'o');
		item.removeAttribute("onclick");
	});
	board.addEventListener('click', init);
}

function win() {
	let comb = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < comb.length; i++) {

		if (fields[comb[i][0]].classList.contains('x') &&
			fields[comb[i][1]].classList.contains('x') &&
			fields[comb[i][2]].classList.contains('x')) {
                ++scoreX; 
			setTimeout(() => {
                playerXscore.innerHTML = scoreX;
				res.innerText = 'X is win';
			}, 500);
			board.removeEventListener('click', init);
		}

		else if (fields[comb[i][0]].classList.contains('o') &&
			fields[comb[i][1]].classList.contains('o') &&
			fields[comb[i][2]].classList.contains('o')) {
                ++scoreO; 
			setTimeout(() => {
                playerOscore.innerHTML = scoreO;
				res.innerText = 'O is win';
			}, 500);
			board.removeEventListener('click', init);
		}

		else if (count == 9) {
			res.innerText = 'Draw';
			board.removeEventListener('click', init);
		}

	}

}

btnGame.addEventListener('click', newGame);
board.addEventListener('click', init);

