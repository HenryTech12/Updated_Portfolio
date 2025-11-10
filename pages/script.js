/**
 * File: script.js
 * Description: Handles animations, mobile menu, and form validation for the portfolio website.
 * Author: Fakorode Henry
 * Last Updated: October 2025
 */

// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const links = mobileMenu.querySelectorAll('a');
    links.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.toggle('nav-slide-in');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            mobileMenu.classList.add('hidden');
        }
    });
});

// Typed.js for hero text
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: ['Full-Stack Java Developer', 'Spring Boot Specialist', 'Front-End Enthusiast', 'Python Backend Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        loop: true,
        showCursor: false
    });
}

// Particles.js for hero background
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#333333" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "resize": true }
        },
        "retina_detect": true
    });
}

// Scroll animation for skill progress rings
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'skills') {
            document.querySelectorAll('.progress-ring').forEach(ring => {
                ring.style.strokeDashoffset = ring.style.getPropertyValue('--progress-offset');
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('#skills').forEach(section => observer.observe(section));

// Contact form validation (on contact.html)
if (document.getElementById('contact-form')) {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = true;

        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('border-red-500');
        });

        if (!nameInput.value.trim()) {
            nameInput.classList.add('border-red-500');
            valid = false;
        }
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            emailInput.classList.add('border-red-500');
            valid = false;
        }
        if (!messageInput.value.trim()) {
            messageInput.classList.add('border-red-500');
            valid = false;
        }

        if (valid) {
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                form.reset();
                form.classList.remove('hidden');
                successMessage.classList.add('hidden');
            }, 3000);
        }
    });
}