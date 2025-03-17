// my-component-css.js
export function getMyComponentCSS() {
	return `
    .food-card {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        margin: 0;
        background-color: var(--color-bg);
        box-shadow: 0 4px 6px var(--box-shadow-light);
        height: 100%;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    .food-card:hover {
        transform: scale(1.05); 
        box-shadow: 8px 8px 20px var(--box-shadow-light);
    }

    .food-card-img {
        margin: 0;
        padding: 0;
        border-radius: 8px;    
        width: 100%;
        height: auto;
        object-fit: cover ;

    }

    .food-card-img img {
        width: 100%;
        margin: 0;
        padding: 0;
        border-radius: 8px 8px 0 0;
    }

    .food-info {
        display: flex;
        padding: 2rem;
        margin: 0;
        flex-direction: column;
        justify-content:space-between;
        align-self: center;
        height: 100%;
        width: 100%;
        gap: 10px;
    }

    .food-card a {
        background-color: var(--hover-color-dark);
        width: 100%;
        color: white;
        margin: 0;
        padding: 2%;
        border: 2px solid transparent;
        border-radius: 5px;
        text-decoration: none; 
        text-align: center;
    }

    .food-card a:hover {
        background-color: var(--hover-color-light);
        color: black;
        border-color: var(--hover-color-dark);
    }
  `;
}
