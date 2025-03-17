// Function to load and insert the navbar
async function loadNavbar() {
    try {
        // Fetch the navbar HTML (using relative path)
        const response = await fetch('./components/navbar.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();

        // Find the navbar placeholder or insert at the start of body
        const navbarPlaceholder = document.getElementById('navbar-placeholder') || document.body.firstChild;
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Insert the navbar
        if (navbarPlaceholder.id === 'navbar-placeholder') {
            navbarPlaceholder.replaceWith(temp.firstElementChild);
        } else {
            document.body.insertBefore(temp.firstElementChild, navbarPlaceholder);
        }

        // Initialize dark mode after navbar is loaded (using relative path)
        const darkModeScript = document.createElement('script');
        darkModeScript.src = './scripts/dark-mode.js';
        document.body.appendChild(darkModeScript);

    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar); 