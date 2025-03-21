export const navbarHTML = `
<header class="navbar">
    <h1>ANNIE LIU</h1>
    
    <nav>
        <ul class="desktop-bar">
            <li><a href="index.html">Home</a></li>
            <li><a href="resume.html">Resume</a></li>
            <li><a href="passions.html">Passions</a></li>
            <li><a href="food.html">Food</a></li>
            <li><a href="contact.html">Contact Me</a></li>
        </ul>

        <input type="checkbox" id="menu-toggle">
        <label for="menu-toggle" class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </label>

        <ul class="mobile-menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="resume.html">Resume</a></li>
            <li><a href="passions.html">Passions</a></li>
            <li><a href="food.html">Food</a></li>
            <li><a href="contact.html">Contact Me</a></li>
        </ul>

        <label class="light-dark-switch" id="toggle">
            <input type="checkbox" id="toggle-switch">
            <span class="slider"></span>
        </label>
    </nav>
</header> `; 