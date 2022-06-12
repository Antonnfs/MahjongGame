const cards = 30; // quantity pairs of cards;  May be in range beetween 2 and 50;
const card = document.querySelectorAll('.card');

let mainArray;			// Generated randjm array
let foundArray = [];		// Array of founded values
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
		if (!firstCardValue && !secondCardValue) {
			firstCardItem.querySelector('.card__value').classList.toggle('hidden');
			firstCardId = firstCardItem.dataset.id;
			console.log(`first id: ${firstCardId}`);
			firstCardValue = +e.target.querySelector('.card__value').textContent;
			console.log(firstCardValue);
			selectedPairOfCards.push(firstCardItem);
			selectedPairOfCards.forEach(function(key) {
				console.log(key);
				key.setAttribute('disabled', '');
				//let child = key.querySelector('p');
				//console.log(child);
				//child.setAttribute('disabled', '');
				})
			console.log(selectedPairOfCards);
		} else if (firstCardValue && !secondCardValue) {
			secondCardItem.querySelector('.card__value').classList.toggle('hidden');
			secondCardId = secondCardItem.dataset.id;
			console.log(`second id: ${secondCardId}`);
			secondCardValue = +e.target.querySelector('.card__value').textContent;
			console.log(secondCardValue);
			selectedPairOfCards.push(secondCardItem);

			console.log(selectedPairOfCards);
			if (firstCardId === secondCardId) {
				const idList = document.querySelectorAll(`[data-id]`);
				idList.forEach(function(key) {
					if (key.dataset.id === secondCardId) {
						key.classList.add('found');
					}
				})
				console.log(idList);
				reset();

			} else {

				firstCardItem.querySelector('.card__value').classList.remove('hidden');
				secondCardItem.querySelector('.card__value').classList.remove('hidden');
				reset();
				
			}
		} else if (firstCardValue && secondCardValue) {

		
		}
	}
})


function render() {
	mainArray = generateArrayOfPairs();
	const wrapper = document.querySelector('.cards-wrapper');
	for (let i = 0; i < mainArray.length; i++) {
		wrapper.insertAdjacentHTML('beforeend', `
		<button class='card' data-id='${mainArray[i]}'>
			<input type='button' disabled class='card__value hidden'>${mainArray[i]}</input>
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
	setTimeout(resetItems(), 500)
	function resetItems() {
		firstCardValue = '';
		secondCardValue = '';
		firstCardItem = '';
		secondCardItem = '';
		console.log(firstCardValue);
		console.log(secondCardValue);
		console.log(firstCardItem);
		console.log(secondCardItem);
		console.log(`first id: ${firstCardId}`);
		console.log(`second id: ${secondCardId}`);

	}
	console.log('reset');
}
