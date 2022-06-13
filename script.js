const cards = 10; // quantity pairs of cards. May be in range between 2 and 100, and multiple of ten ( 10, 20, 30, 40, 50...)
const card = document.querySelectorAll('.card');

let mainArray;			// Generated random array
let foundArray;	// Array of founded values
let firstCardValue = '';
let secondCardValue = '';
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
		if (!firstCardValue) {
			firstCardItem.querySelector('.card__value').classList.toggle('hidden');
			firstCardId = firstCardItem.dataset.id;
			firstCardValue = +e.target.querySelector('.card__value').value;
			selectedPairOfCards.push(firstCardItem);
			selectedPairOfCards.forEach(function(key) {
				key.setAttribute('disabled', '');
			})
		} else {
			secondCardItem.querySelector('.card__value').classList.toggle('hidden');
			secondCardId = secondCardItem.dataset.id;
			secondCardValue = +e.target.querySelector('.card__value').value;
			selectedPairOfCards.push(secondCardItem);
			selectedPairOfCards.forEach(function(key) {
				key.setAttribute('disabled', '');
			})
			if (firstCardId === secondCardId) {
				const idList = document.querySelectorAll(`[data-id]`);
				idList.forEach(function(key) {
					if (key.dataset.id === secondCardId) {
						key.classList.add('found');
					}
				})	
				selectedPairOfCards.forEach(function(key) {
					//foundArray.push(key);
				});
				foundArray = document.querySelectorAll('.found');	
				console.log(foundArray.length);
				console.log(foundArray);
				
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
			<input type="button" value='${mainArray[i]}' disabled class='card__value hidden'>
		</button>
		`)
	}
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
	firstCardValue = '';
	secondCardValue = '';
	firstCardItem = '';
	secondCardItem = '';
	firstCardId = '';
	secondCardId = '';
}
