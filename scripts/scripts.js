// scripts/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Elements
    const toggleCheckbox = document.getElementById('toggle-checkbox');
    const body = document.body;

    // Hamburger Menu Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Contact Form Elements
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    /* ==============================================
       THEME TOGGLE FUNCTIONALITY
    =============================================== */

    // Initialize Theme Based on Local Storage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        toggleCheckbox.checked = true;
    } else {
        body.classList.remove('light-theme');
    }

    // Theme Toggle Event Listener
    toggleCheckbox.addEventListener('change', () => {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==============================================
       HAMBURGER MENU FUNCTIONALITY
    =============================================== */

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');

        // Update ARIA Attribute for Accessibility
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
    });

    // Close the Menu When a Link is Clicked
    const navItems = document.querySelectorAll('.nav-link, .dropdown-link');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            // Update ARIA attribute for accessibility
            hamburger.setAttribute('aria-expanded', false);
        });
    });

    /* ==============================================
       ACTIVE LINK HIGHLIGHTING
    =============================================== */

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

    /* ==============================================
       SCROLL-TO-TOP BUTTON FUNCTIONALITY
    =============================================== */

    // Show or Hide Scroll-to-Top Button Based on Scroll Position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling down 300px
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to Top Smoothly When Button is Clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==============================================
       CONTACT FORM SUBMISSION HANDLING
    =============================================== */

    if (contactForm) {
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
                        if (data.errors && data.errors.length > 0) {
                            formMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formMessage.textContent = "Oops! There was a problem submitting your form.";
                        }
                        formMessage.style.color = "#ff4d4d";
                        formMessage.style.display = "block";
                    });
                }
            })
            .catch(error => {
                formMessage.textContent = "Oops! There was a problem submitting your form.";
                formMessage.style.color = "#ff4d4d";
                formMessage.style.display = "block";
            });
        });
    }

    /* ==============================================
       CLICK OUTSIDE TO CLOSE NAVIGATION MENU
    =============================================== */

    document.addEventListener('click', (event) => {
        const isClickInside = hamburger.contains(event.target) || navLinks.contains(event.target);

        if (!isClickInside && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            // Update ARIA attribute for accessibility
            hamburger.setAttribute('aria-expanded', false);
        }
    });
});
