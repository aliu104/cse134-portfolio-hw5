export function initDarkMode() {
    const toggleSwitch = document.getElementById('toggle-switch');
    if (!toggleSwitch) return;

    // Make toggle visible
    document.getElementById('toggle').style.display = "block";

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleSwitch.checked = true;
        setDarkTheme();
    } else {
        toggleSwitch.checked = false;
        setLightTheme();
    }

    // Listen for toggle switch changes
    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            setDarkTheme();
            localStorage.setItem('theme', 'dark');
        } else {
            setLightTheme();
            localStorage.setItem('theme', 'light');
        }
    });
}

function setDarkTheme() {
    document.documentElement.style.setProperty('--color-bg', 'var(--dark-color-bg)');
    document.documentElement.style.setProperty('--font-color', 'var(--dark-font-main)');
    document.documentElement.style.setProperty('--card-color', 'var(--dark-card-color)');
    document.documentElement.style.setProperty('--box-shadow', 'var(--dark-box-shadow)');
    document.documentElement.style.setProperty('--box-shadow-light', 'var(--dark-box-shadow-light)');
    document.documentElement.style.setProperty('--fail-color', 'var(--dark-fail-color)');
    document.documentElement.style.setProperty('--success-color', 'var(--dark-success-color)');
    document.documentElement.style.setProperty('--info-color', 'var(--dark-info-color)');
}

function setLightTheme() {
    document.documentElement.style.setProperty('--color-bg', 'var(--light-color-bg)');
    document.documentElement.style.setProperty('--font-color', 'var(--light-font-main)');
    document.documentElement.style.setProperty('--card-color', 'var(--light-card-color)');
    document.documentElement.style.setProperty('--box-shadow', 'var(--light-box-shadow)');
    document.documentElement.style.setProperty('--box-shadow-light', 'var(--light-box-shadow-light)');
    document.documentElement.style.setProperty('--fail-color', 'var(--light-fail-color)');
    document.documentElement.style.setProperty('--success-color', 'var(--light-success-color)');
    document.documentElement.style.setProperty('--info-color', 'var(--light-info-color)');
}
