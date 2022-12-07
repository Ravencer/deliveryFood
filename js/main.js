/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const toggleModal = () => {
	modal.classList.toggle("is-open");
};
cartButton.addEventListener('click', toggleModal);
if (close !== null) {
	close.addEventListener('click', toggleModal);
}

if (document.querySelector('main') && document.querySelector('main').id === 'index') {
	const cards = document.querySelectorAll('.card');
	const selectCategory = document.querySelector('.category-select');
	const filtersSection = document.querySelector('.filters');
	const filtersPoints = [...filtersSection.querySelectorAll('li')];
	const inputSearch = document.querySelector('.input-search');
	inputSearch.addEventListener("keyup", ({ key }) => {
		if (key === "Enter") {
			localStorage.setItem('search', inputSearch.value);
			cards.forEach(element => {
				if (inputSearch.value.toLowerCase() === element.querySelector('.card-title').textContent.trim().toLowerCase()) {
					element.style.display = 'block';
				} else if (inputSearch.value.trim() === '') {
					element.style.display = 'block';
				} else {
					element.style.display = 'none';
				}
			});
		}
	});
	const toggleCards = category => {
		cards.forEach(element => {
			if (category === '1') {
				element.style.display = 'inline';
			} else if (element.querySelector('.category').textContent !== category) {
				element.style.display = 'none';
			} else if (element.querySelector('.category').textContent === category) {
				element.style.display = 'inline';
			}
		});
	};
	selectCategory.addEventListener('change', () => {
		localStorage.setItem('category', selectCategory.value);
		toggleCards(selectCategory.value);
	});
	if (localStorage.getItem('category') !== 1 && localStorage.getItem('category')) {
		toggleCards(localStorage.getItem('category'));
		selectCategory.value = localStorage.getItem('category');
	}
	if (localStorage.getItem('search') !== '') {
		inputSearch.value = localStorage.getItem('search');
	}
	filtersSection.addEventListener('click', e => {
		if (e.target.tagName === 'LI') {
			toggleCards('1');
			selectCategory.value = '1';
			if (e.target.classList.contains('filter-active')) {
				filtersPoints.forEach(element => {
					element.classList.remove('filter-active');
				});
				cards.forEach(el => {
					el.style.display = 'inline';
				});
			} else {
				e.target.classList.add('filter-active');
				filtersPoints.forEach(element => {
					if (e.target !== element) {
						element.classList.remove('filter-active');
					}
				});
				cards.forEach(element => {
					if (parseFloat(element.querySelector('.rating').textContent) >= parseFloat(e.target.dataset.rating)) {
						element.style.display = 'inline';
					} else {
						element.style.display = 'none';
					}
				});
			}

		}
	});

}

if (document.querySelector('.modal')) {
	const modalBody = document.querySelector('.modal-body');
	const totalSumm = document.querySelector('.pricetag');
	let foodRows = [...modalBody.querySelectorAll('.food-row')];
	const totalFunction = () => {
		let summary = 0;
		foodRows.forEach(element => {
			const foodCounter = parseInt(element.querySelector('.food-counter').querySelector('.counter').innerHTML);
			const foodPrice = parseInt(element.querySelector('.food-price').innerHTML.split(' ')[0]);
			summary += foodCounter * foodPrice;
		});
		return summary;
	};
	totalSumm.innerHTML = String(totalFunction());
	foodRows.forEach(element => {
		const foodCounter = element.querySelector('.food-counter');
		foodCounter.querySelector('.minus-button').addEventListener('click', () => {
			if (parseInt(foodCounter.querySelector('.counter').innerHTML) === 1) {
				element.remove();
				foodRows = [...modalBody.querySelectorAll('.food-row')];
				totalSumm.innerHTML = String(totalFunction());
			} else if (parseInt(foodCounter.querySelector('.counter').innerHTML) > 1) {
				const newValue = parseInt(foodCounter.querySelector('.counter').innerHTML) - 1;
				foodCounter.querySelector('.counter').innerHTML = String(newValue);
				totalSumm.innerHTML = String(totalFunction());
			}
		});
		foodCounter.querySelector('.plus-button').addEventListener('click', () => {
			const newValue = parseInt(foodCounter.querySelector('.counter').innerHTML) + 1;
			foodCounter.querySelector('.counter').innerHTML = String(newValue);
			totalSumm.innerHTML = String(totalFunction());
		});
	});
}

if (document.querySelector('section') && document.querySelector('section').id === 'reg') {
	const validateComm = () => {
		const btnAuth = document.querySelector('.auth-btn');
		const phoneForm = document.getElementsByName('phone');
		btnAuth.addEventListener('click', event => {
			if (document.querySelector('.password1').value !== document.querySelector('.password2').value) {
				alert('Пароли не совпадают!');
				event.preventDefault();
			}
		});
		const blurValidate = elem => {
			elem.value = elem.value.replace(/(^ )|(^-)|(-$)|( $)/i, '');
			elem.value = elem.value.replace(/(-+)/i, '-');
			elem.value = elem.value.trim();
		};
		phoneForm.forEach(elem => {
			elem.addEventListener('input', () => {
				elem.value = elem.value.replace(/[^0-9()-]/i, '');
				elem.addEventListener('blur', () => {
					elem.value = elem.value.replace(/[^0-9()-]/i, '');
					blurValidate(elem);
				});
			});
		});
	};
	validateComm();
}

