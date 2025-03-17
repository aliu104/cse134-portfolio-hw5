import { navbarHTML } from '../components/navbar-html.js';
import { initDarkMode } from './dark-mode.js';

// Function to load and insert the navbar
function loadNavbar() {
    try {
        // Find the navbar placeholder
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = navbarHTML;
            // Initialize dark mode immediately after navbar is inserted
            initDarkMode();
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Start loading navbar immediately
loadNavbar(); 