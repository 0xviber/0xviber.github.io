// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

function setMenu(open) {
    navLinks.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
}

hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => setMenu(false)));

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50 ? '0 2px 10px rgba(0,0,0,0.3)' : 'none';
}, { passive: true });

// Certificate preview (lightbox)
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');

document.querySelectorAll('.cert-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
        lbImg.src = btn.dataset.full;
        lbImg.alt = btn.dataset.alt || '';
        lightbox.showModal();
    });
});
lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });

// Typing effect (skipped when the visitor prefers reduced motion)
const typingText = document.querySelector('.typing-text');
const words = ["Penetration Tester", "Security Auditor", "Bug Hunter", "Code Reviewer"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    typingText.textContent = word.substring(0, charIndex);

    let delay = deleting ? 50 : 100;
    if (!deleting && charIndex === word.length) {
        delay = 2000;
        deleting = true;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 500;
    }
    setTimeout(typeEffect, delay);
}

if (typingText && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(typeEffect, 1000);
}
