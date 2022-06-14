let cards = 30; // quantity pairs of cards. May be in range between 2 and 100, and multiple of ten ( 10, 20, 30, 40, 50...)

let seconds = 0;
let minutes = 0;
let interval;
let result = [];

let firstCardId;		
let secondCardId;
let startButton = document.querySelector('.start-button');	
const cardsWrapper = document.querySelector('.cards-wrapper');	
const selectedPairOfCards = [];		// Array with selected pair of cards

startTimer();
render();

// Timer
const timer = document.querySelector('.timer');
const minutesElement = document.querySelector('.timer__minutes');
const secondsElement = document.querySelector('.timer__seconds');



window.addEventListener('click', function(e) {
	let firstCardItem = e.target.closest('.card');		// First selected card
	let secondCardItem = e.target.closest('.card');		// Second selected card
	if (e.target.closest('.card')) {
		if (!firstCardId) {
			firstCardItem.querySelector('.card__value').classList.toggle('hidden');
			firstCardId = firstCardItem.dataset.id;
			selectedPairOfCards.push(firstCardItem);
			selectedPairOfCards.forEach(function(key) {
				key.setAttribute('disabled', '');
				key.classList.add('selected');
				key.style.background = 'rgb(255, 255, 255)';
			})
		} else {
			secondCardItem.querySelector('.card__value').classList.toggle('hidden');
			secondCardId = secondCardItem.dataset.id;
			selectedPairOfCards.push(secondCardItem);
			selectedPairOfCards.forEach(function(key) {
				key.setAttribute('disabled', '');
				key.classList.add('selected');
				key.style.background = 'rgb(255, 255, 255)';
			})
			if (firstCardId === secondCardId) {
				const idList = document.querySelectorAll(`[data-id]`);
				idList.forEach(function(key) {
					if (key.dataset.id === secondCardId) {
						key.classList.add('found');
					}
				})	
				const foundList = document.querySelectorAll('.found');	// List of found values
				if (foundList.length === cards) {
					clearInterval(interval);
					timer.childNodes.forEach((key) => result.push(key.textContent));
					result = result.join('');
					const wrapper = document.querySelector('.wrapper');
					wrapper.insertAdjacentHTML('beforeend', `			
						<div class="popup">
							<div class="popup__wrapper">
								<div class="popup__content">
									<h1 class="popup__title">You win!</h1>
									<p class="popup__text">
										Your result: ${result}
									</p>
									<button class="popup__button" onClick="window.location.reload();">Restart!</button>
								</div>
							</div>
						</div>
					`)
				}
			} else {
				setTimeout(function() {
					selectedPairOfCards.forEach(function(key) {
						key.querySelector('.card__value').classList.toggle('hidden');
						key.style.background = "url('img/card.jpeg') center / cover no-repeat";
					})
				}, 400)
				setTimeout(function() {
					selectedPairOfCards.forEach(function(key) {
						key.removeAttribute('disabled', '');
						key.classList.remove('selected');
						})
					selectedPairOfCards.length = 0;
				}, 400)
			}
			// Reset
			firstCardItem = '';
			secondCardItem = '';
			firstCardId = '';
			secondCardId = '';
		} 
	}
})

function startRender() {
	cardsWrapper.insertAdjacentHTML('beforeend', `
		<button class='start-button'>Start!</button>
	`) 
}

function render() {
	let mainArray = generateRandomArray();		// Generated random array
	cardsWrapper.innerHTML = `
		<div class="timer">
			<span class="timer__minutes">00</span>
			<span> : </span>
			<span class="timer__seconds">00</span>
		</div>
	`
	for (let i = 0; i < mainArray.length; i++) {
		cardsWrapper.insertAdjacentHTML('beforeend', `
		<button class='card' data-id='${mainArray[i]}'>
			<input type="button" value='${mainArray[i]}' disabled class='card__value'>
		</button>
		`)
	}
	hideValuesTimeout();
}

function hideValuesTimeout() {
	setTimeout(function() {
		document.querySelectorAll('.card__value').forEach(function(key) {
			key.classList.add('hidden');
		})
		document.querySelectorAll('.card').forEach(function(key) {
			key.style.background = "url('img/card.jpeg') center / cover no-repeat";
		})
	}, 5000);
}

function generateRandomArray() {
	let array = [];
	let a = 1; // from number
	let b = 50; // to number
	for (let i = a; i <= 1000; i++) {
		let num = Math.round(Math.random() * (a - b) + b);
		if (!array.includes(num)) {
			array.push(num);
		}
	}
	if (array.length = cards / 2 ) { // 
		let arrayOfPairs = [].concat(array, array); 
		return mixPairs(arrayOfPairs);
	}
	function mixPairs(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
}

function startTimer() {
	setTimeout(() => {
		clearInterval(interval);
		interval = setInterval(setTimer, 1000)
	}, 4500)
}

function setTimer() {
	seconds++;
	if (seconds < 10) {
		secondsElement.innerText = '0' + seconds;
	} 
	if (seconds > 9 && seconds < 59) {
		secondsElement.innerText = seconds;
	} 
	if (seconds > 59) {
		minutes++;
		minutesElement.innerText = '0' + minutes;
		seconds = 0;
		secondsElement.innerText = '0' + seconds;
	}
	if (minutes < 9) {
		minutesElement.innerText = '0' + minutes;
	}
	if (minutes > 9 && minutes < 59) {
		minutesElement.innerText = minutes;
	} 
}	
