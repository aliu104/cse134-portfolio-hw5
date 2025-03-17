import { navbarHTML } from '../components/navbar-html.js';

// Function to load and insert the navbar
function loadNavbar() {
    try {
        // Find the navbar placeholder
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = navbarHTML;
            
            // Load dark mode script
            const darkModeScript = document.createElement('script');
            darkModeScript.src = './scripts/dark-mode.js';
            darkModeScript.onload = () => {
                // Manually trigger the DOMContentLoaded handler in dark-mode.js
                const event = new Event('DOMContentLoaded');
                document.dispatchEvent(event);
            };
            document.body.appendChild(darkModeScript);
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Start loading navbar immediately
loadNavbar(); 