// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Close the menu when a link is clicked
const navItems = document.querySelectorAll('.nav-link');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// Dropdown Toggle for Touch Devices
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        // Prevent the default link behavior
        e.preventDefault();
        // Toggle the dropdown menu
        dropdown.classList.toggle('active');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu.style.opacity === "1") {
            dropdownMenu.style.opacity = "0";
            dropdownMenu.style.visibility = "hidden";
        } else {
            dropdownMenu.style.opacity = "1";
            dropdownMenu.style.visibility = "visible";
        }
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80; // Adjust based on navbar height
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Theme Toggle Functionality (Option A: Checkbox)
const toggleCheckbox = document.getElementById('toggle-checkbox');

// Check for saved theme in localStorage
if(localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    toggleCheckbox.checked = true;
} else {
    document.body.classList.remove('light-theme');
}

toggleCheckbox.addEventListener('change', () => {
    if(toggleCheckbox.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// Alternatively, Theme Toggle Button Functionality (Option B)
/*
const themeToggleButton = document.getElementById('theme-toggle-button');

if(localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeToggleButton.classList.add('active');
    themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.body.classList.remove('light-theme');
    themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if(document.body.classList.contains('light-theme')) {
        themeToggleButton.classList.add('active');
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggleButton.classList.remove('active');
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});
*/

// Scroll-to-Top Button Functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // Show button after scrolling down 300px
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch(contactForm.action, {
        method: contactForm.method,
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            formMessage.textContent = "Thank you! Your message has been sent.";
            formMessage.style.color = "#17a44d";
            formMessage.style.display = "block";
            contactForm.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    formMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
                    formMessage.style.color = "#ff4d4d";
                    formMessage.style.display = "block";
                } else {
                    formMessage.textContent = "Oops! There was a problem submitting your form.";
                    formMessage.style.color = "#ff4d4d";
                    formMessage.style.display = "block";
                }
            });
        }
    })
    .catch(error => {
        formMessage.textContent = "Oops! There was a problem submitting your form.";
        formMessage.style.color = "#ff4d4d";
        formMessage.style.display = "block";
    });
});
