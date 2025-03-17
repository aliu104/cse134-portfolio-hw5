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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("load-storage-btn").addEventListener("click", loadLocalData);
    document.getElementById("load-remote-btn").addEventListener("click", loadRemoteData);
});

async function loadLocalData() {
    const container = document.getElementById("food-container");
	container.innerHTML = '';
	// localStorage.clear();
    const storedFoodSpots = JSON.parse(localStorage.getItem('foodSpots')) || [];
    if (storedFoodSpots.length > 0) {
        populateCards(storedFoodSpots, container);
    } else {
        // alert("No data found in local storage.");
		try {
			const response = await fetch('../docs/food.json');
			const foodSpots = await response.json();
			localStorage.setItem('foodSpots', JSON.stringify(foodSpots));
			populateCards(foodSpots, container);
		} catch (error) {
			console.error("Failed to fetch food spots:", error);
		}
    }
	console.log("fetched from local storage");
}

async function loadRemoteData() {
    const container = document.getElementById("food-container");
	container.innerHTML = '';
    try {
        const response = await fetch('https://api.jsonbin.io/v3/b/67d0f5f38561e97a50ea4787', {
            headers: {
                'X-Master-Key': '$2a$10$SUjoEwRYxgCCKSjL.IqCH.MquxIIFS24g9IorvDATyL8yp5bFyMZu'
            }
        });
        const result = await response.json();
        const foodSpots = result.record;
        localStorage.setItem('foodSpots', JSON.stringify(foodSpots));
        populateCards(foodSpots, container);
    } catch (error) {
        console.error("Failed to fetch remote data:", error);
        alert("Failed to load remote data. Check console for errors.");
    }
	console.log("fetched from API");
}

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