const cards = 30; // quantity pairs of cards. May be in range between 2 and 100, and multiple of ten ( 10, 20, 30, 40, 50...)


let mainArray;			// Generated random array
let foundArray;	// Array of founded values
let firstCardId;		
let secondCardId;		
let firstCardItem;		// First selected card
let secondCardItem;		// Second selected card
let selectedPairOfCards = [];		// Array with selected pair of cards

render();

console.log(mainArray);
window.addEventListener('click', function(e) {
	firstCardItem = e.target.closest('.card');
	secondCardItem = e.target.closest('.card');
	if (e.target.closest('.card')) {
		if (!firstCardId) {
			firstCardItem.querySelector('.card__value').classList.toggle('hidden');
			firstCardId = firstCardItem.dataset.id;
			selectedPairOfCards.push(firstCardItem);
			selectedPairOfCards.forEach(function(key) {
				key.setAttribute('disabled', '');
				key.classList.add('selected');
			})
		} else {
			secondCardItem.querySelector('.card__value').classList.toggle('hidden');
			secondCardId = secondCardItem.dataset.id;
			selectedPairOfCards.push(secondCardItem);
			selectedPairOfCards.forEach(function(key) {
				key.setAttribute('disabled', '');
				key.classList.add('selected');
			})
			if (firstCardId === secondCardId) {
				const idList = document.querySelectorAll(`[data-id]`);
				idList.forEach(function(key) {
					if (key.dataset.id === secondCardId) {
						key.classList.add('found');
					}
				})	
				foundArray = document.querySelectorAll('.found');	
				if (foundArray.length === cards) {
					const wrapper = document.querySelector('.wrapper');
					console.log(wrapper);
					wrapper.insertAdjacentHTML('beforeend', `
						<div class="popup">
							<div class="popup__wrapper">
								<div class="popup__content">
									<div class="popup__text">
										You win!
										Your score: 
									</div>
									<button class="popup__button" onClick="window.location.reload();">Restart!</button>
								</div>
							</div>
						</div>
					`)
					console.log(foundArray.length);
					
				}
			} else {
				setTimeout(function() {
					selectedPairOfCards.forEach(function(key) {
						key.querySelector('.card__value').classList.toggle('hidden');
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
			reset();
		} 
	}
})

function render() {
	mainArray = generateArrayOfPairs();
	const cardsWrapper = document.querySelector('.cards-wrapper');
	for (let i = 0; i < mainArray.length; i++) {
		cardsWrapper.insertAdjacentHTML('beforeend', `
		<button class='card' data-id='${mainArray[i]}'>
			<input type="button" value='${mainArray[i]}' disabled class='card__value'>
		</button>
		`)
	}
	hiddenTimeout();
}

function hiddenTimeout() {
	setTimeout(function() {
		document.querySelectorAll('.card__value').forEach(function(key) {
			key.classList.add('hidden');
		})
	}, 5000);
}

function generateArrayOfPairs() {
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

function reset() {
	firstCardItem = '';
	secondCardItem = '';
	firstCardId = '';
	secondCardId = '';
}
