// 1. Typewriter Effect Logic
const textElement = document.querySelector('.typing-text');
const words = ["digital experiences.", "web applications.", "stunning interfaces."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    
    textElement.textContent = currentChars;
    textElement.classList.add('stop-blinking');

    if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        // Switching modes
        isDeleting = !isDeleting;
        textElement.classList.remove('stop-blinking');
        
        if (!isDeleting) {
            // Moving to next word
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        setTimeout(typeEffect, isDeleting ? 1000 : 200); // Pause before delete or type
    }
}

document.addEventListener('DOMContentLoaded', typeEffect);


// 2. Scroll Animation (Intersection Observer)
// This adds the 'show' class to elements when they come into view
const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
        // Optional: Remove 'else' if you only want the animation to happen once
        // else {
        //     entry.target.classList.remove('show');
        // }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));