// Function to load and insert the navbar
async function loadNavbar() {
    try {
        const response = await fetch('./components/navbar.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const navbarPlaceholder = document.getElementById('navbar-placeholder') || document.body.firstChild;
        
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        if (navbarPlaceholder.id === 'navbar-placeholder') {
            navbarPlaceholder.replaceWith(temp.firstElementChild);
        } else {
            document.body.insertBefore(temp.firstElementChild, navbarPlaceholder);
        }

        // Initialize dark mode after navbar is loaded 
        const darkModeScript = document.createElement('script');
        darkModeScript.src = './scripts/dark-mode.js';
        document.body.appendChild(darkModeScript);

    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar); 