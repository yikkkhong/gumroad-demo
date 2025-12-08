/* Extracted script from index.html */
/* =========================================
   1. CANVAS PARTICLE ANIMATION (The "Neural Network" Look)
   ========================================= */
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particlesArray;

// Resize Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Mouse Interaction
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00f2ff';
        ctx.fill();
    }

    // Update particle position
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Mouse Collision Check
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Initialize Particles
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000; // Density
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2; // Slow speed
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#00f2ff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles with lines
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(0, 242, 255,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

init();
animate();

/* =========================================
   2. TYPING EFFECT (Hero Section)
   ========================================= */
const textElement = document.querySelector('.typing-text');
const phrases = ["With Infinite Potential.", "Without Boundaries.", "Faster Than Ever."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

/* =========================================
   3. SCROLL REVEAL ANIMATION
   ========================================= */
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    for (let i = 0; i < revealElements.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = revealElements[i].getBoundingClientRect().top;
        let elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

/* =========================================
   4. NAVBAR SCROLL EFFECT
   ========================================= */
const navbar = document.getElementById('navbar');
window.onscroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    reveal(); // Ensure reveal works
};

/* =========================================
   5. NUMBER COUNTER ANIMATION
   ========================================= */
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

function runCounters() {
    const section = document.querySelector('.stats-section');
    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if(sectionPos < screenPos && !hasCounted) {
        hasCounted = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100; // Speed

            const updateCounter = () => {
                const count = +counter.innerText;
                if(count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            }
            updateCounter();
        });
    }
}
    
window.addEventListener('scroll', runCounters);
