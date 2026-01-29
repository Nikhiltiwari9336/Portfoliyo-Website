// Navbar toggle and auto-close on scroll
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close nav menu on scroll
window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Slider/Carousel
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;
const slideCount = slides.length;
const slideIntervalTime = 5000;
let slideInterval;

// Show slide by index
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

// Show next slide
function nextSlide() {
    let nextIndex = (currentSlide + 1) % slideCount;
    showSlide(nextIndex);
}

// Show previous slide
function prevSlide() {
    let prevIndex = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(prevIndex);
}

// Event listeners for buttons
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
});

// Auto-play slider
function startSlideInterval() {
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Initialize slider
showSlide(0);
startSlideInterval();

// Live updating time & date for header, footer, and slides
const headerClock = document.querySelector('.header-clock');
const footerClock = document.querySelector('.footer-clock');
const slideTimes = document.querySelectorAll('.slide-time');

function updateClocks() {
    const now = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formatted = now.toLocaleString(undefined, options);

    // Update header and footer clocks
    headerClock.textContent = formatted;
    footerClock.textContent = formatted;

    // Update each slide's time
    slideTimes.forEach((el) => {
        el.textContent = formatted;
    });
}

// Update clocks every second
setInterval(updateClocks, 1000);
updateClocks();

// Contact form validation
const form = document.getElementById('contact-form');
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const messageInput = form.elements['message'];
const formStatus = form.querySelector('.form-status');

function showError(input, message) {
    const errorEl = input.parentElement.query