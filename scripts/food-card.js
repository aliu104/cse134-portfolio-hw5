// my-component.js
import { getMyComponentHTML } from './food-card-html.js';
import { getMyComponentCSS } from './food-card-css.js';

class FoodCard extends HTMLElement {
	constructor() {
		super();
		// this.attachShadow({mode: 'open'});
	}

	static get observedAttributes() {
		return ['title', 'img-src', 'img-alt', 'description', 'link'];
	}


	connectedCallback() {
		// Create a style tag for the component’s CSS
		const style = document.createElement('style');
		style.textContent = getMyComponentCSS();

		// Get the HTML content with the current date
		const content = getMyComponentHTML(
			this.getAttribute('title'),
			this.getAttribute('img-src'),
			this.getAttribute('img-alt'),
			this.getAttribute('description'),
			this.getAttribute('link')
		);

		// Attach styles and HTML content to the component
		this.innerHTML = '';
		this.appendChild(style);
		this.innerHTML += content;
	}
}

// Define the custom element
customElements.define('food-card', FoodCard);

document.addEventListener('DOMContentLoaded', async () => {
	const container = document.getElementById("food-container");
	const storedFoodSpots = JSON.parse(localStorage.getItem('foodSpots')) || [];

	if (storedFoodSpots.length === 0) {
		try {
			const response = await fetch('../food.json');
			const foodSpots = await response.json();
			localStorage.setItem('foodSpots', JSON.stringify(foodSpots));
			populateCards(foodSpots, container);
		} catch (error) {
			console.error("Failed to fetch food spots:", error);
		}
	} else {
		populateCards(storedFoodSpots, container);
	}
});

function populateCards(foodSpots, container) {
    foodSpots.forEach(spot => {
        const card = document.createElement('food-card');
        card.setAttribute('title', spot.title);
        card.setAttribute('img-src', spot.imgSrc);
        card.setAttribute('img-alt', spot.imgAlt);
        card.setAttribute('description', spot.description);
        card.setAttribute('link', spot.link);
        container.appendChild(card);
    });
}