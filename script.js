
const cards = 30; // quantity pairs of cards 
const card = document.querySelectorAll('.card');
let firstCardValue = '';
let secondCardValue = '';
let firstCardItem;
let secondCardItem;

render();

window.addEventListener('click', function(e) {
	let firstCardItem = e.target.closest('.card');
	let secondCardItem = e.target.closest('.card');
	if (e.target.closest('.card')) {
		if (!firstCardValue && !secondCardValue) {
			firstCardItem.querySelector('.card__value').classList.toggle("hidden");
			firstCardValue = e.target.querySelector('.card__value').textContent;
			console.log(firstCardValue);
		} else if (firstCardValue && !secondCardValue) {
			secondCardItem.querySelector('.card__value').classList.toggle("hidden");
			secondCardValue = e.target.querySelector('.card__value').textContent;
			console.log(secondCardValue);
		} else if (firstCardValue && secondCardValue) {

			if (firstCardValue === secondCardValue) {
				e.target.closest('.card')

			} else {
				firstCardItem.querySelector('.card__value').classList.toggle("hidden");
				secondCardItem.querySelector('.card__value').classList.toggle("hidden");
				reset();
			}
		}
	}
})


function render() {
	const array = generateArrayOfPairs();
	const wrapper = document.querySelector('.cards-wrapper');
	for (let i = 0; i < array.length; i++) {
		wrapper.insertAdjacentHTML('beforeend', `
		<button class="card" id='${array[i]}'>
			<p class="card__value hidden">${array[i]}</p>
		</button>
		`)
	}
}
console.log(generateArrayOfPairs());

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
	}
	
}
