import { navbarHTML } from '../components/navbar-html.js';
import { initDarkMode } from './dark-mode.js';

// Function to load and insert the navbar
function loadNavbar() {
    try {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = navbarHTML;
            initDarkMode();
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

loadNavbar(); 