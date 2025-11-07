// ===== Orbit Scroll Controller =====
class OrbitController {
    constructor() {
        this.orbitRing = document.getElementById('orbitRing');
        this.orbitCenter = document.querySelector('.orbit-center');
        this.currentRotation = 0;
        this.isScrolling = false;
        this.animationPaused = false;
        
        this.init();
    }
    
    init() {
        if (!this.orbitRing || !this.orbitCenter) {
            console.error('Orbit elements not found');
            return;
        }
        
        console.log('OrbitController initialized');
        
        // Add scroll event to center circle
        this.orbitCenter.addEventListener('wheel', this.onScroll.bind(this), { passive: false });
        
        // Also add to orbit container for better coverage
        const orbitContainer = document.querySelector('.orbit-container');
        if (orbitContainer) {
            orbitContainer.addEventListener('wheel', (e) => {
                // Check if mouse is over center circle
                const rect = this.orbitCenter.getBoundingClientRect();
                const isOverCenter = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );
                
                if (isOverCenter) {
                    this.onScroll(e);
                }
            }, { passive: false });
        }
        
        // Add hover effect to center
        this.orbitCenter.addEventListener('mouseenter', () => {
            this.orbitCenter.style.cursor = 'pointer';
            this.orbitCenter.style.transform = 'translate(-50%, -50%) scale(1.05)';
            console.log('Mouse entered center circle');
        });
        
        this.orbitCenter.addEventListener('mouseleave', () => {
            this.orbitCenter.style.transform = 'translate(-50%, -50%) scale(1)';
            console.log('Mouse left center circle');
        });
        
        // Stop auto-rotation when scrolling
        this.orbitRing.addEventListener('animationstart', () => {
            this.isAutoRotating = true;
        });
    }
    
    getCurrentRotation() {
        // Get current rotation from the animation
        // Since we're using rotateZ in the animation, we need to extract it differently
        const style = window.getComputedStyle(this.orbitRing);
        const transform = style.transform;
        
        if (transform && transform !== 'none') {
            // Parse the 3D matrix to get rotation
            const matrix = new DOMMatrix(transform);
            // For rotateZ, we can calculate the angle from the matrix
            const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
            console.log('Captured angle from animation:', angle);
            return angle;
        }
        return 0;
    }
    
    onScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Scroll detected! Delta:', e.deltaY);
        
        // First time scrolling - capture current rotation from animation
        if (!this.animationPaused) {
            this.currentRotation = this.getCurrentRotation();
            // Stop the animation completely
            this.orbitRing.style.animation = 'none';
            this.animationPaused = true;
            console.log('Animation stopped at rotation:', this.currentRotation);
        }
        
        // Calculate rotation based on scroll delta
        const scrollSpeed = 0.3; // Adjust sensitivity
        this.currentRotation -= e.deltaY * scrollSpeed; // Negative for natural scroll direction
        
        // Apply rotation with setProperty to ensure it takes effect
        this.orbitRing.style.setProperty('transform', `translate(-50%, -50%) rotateX(75deg) rotateZ(${this.currentRotation}deg)`, 'important');
        this.orbitRing.style.setProperty('transform-style', 'preserve-3d', 'important');
        
        console.log('Current rotation:', this.currentRotation);
        
        // Check what's actually rendered
        const computed = window.getComputedStyle(this.orbitRing);
        console.log('Computed transform:', computed.transform);
        
        // Resume auto-rotation after 2 seconds of no scrolling
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            console.log('Resuming auto-rotation');
            // Remove inline styles and restart animation
            this.orbitRing.style.removeProperty('transform');
            this.orbitRing.style.removeProperty('transform-style');
            this.orbitRing.style.animation = '';
            this.animationPaused = false;
            this.currentRotation = 0;
        }, 2000);
    }
}

// ===== Smooth Scroll Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Contact Form Handler =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-content, .about-image, .contact-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ===== Project Card Click Handler =====
document.querySelectorAll('.project-card').forEach((card, index) => {
    // Make cards clickable
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        // Get project info
        const projectTitle = this.querySelector('.project-overlay h4')?.textContent || `Project ${index + 1}`;
        const projectCategory = this.querySelector('.project-overlay p')?.textContent || 'View Details';
        
        // Option 1: Navigate to project detail page
        // window.location.href = `project-${index + 1}.html`;
        
        // Option 2: Open in new tab
        // window.open(`project-${index + 1}.html`, '_blank');
        
        // Option 3: Show alert (temporary - replace with your logic)
        alert(`Opening: ${projectTitle}\nCategory: ${projectCategory}\n\nReplace this with your project detail page navigation.`);
        
        // Option 4: Scroll to gallery
        // window.location.href = 'gallery.html';
        
        console.log('Project clicked:', projectTitle);
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08)';
        this.style.zIndex = '100';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

// ===== Initialize Orbit Controller =====
document.addEventListener('DOMContentLoaded', () => {
    new OrbitController();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Parallax Effect for Hero Section =====
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-content');
        if (parallax && scrolled < window.innerHeight) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            parallax.style.opacity = 1 - (scrolled / 500);
        }
    });
}

// ===== Cursor Trail Effect (Optional Enhancement) =====
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ===== Performance Optimization =====
let ticking = false;

function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateCursor);
        ticking = true;
    }
}

// ===== Preload Images =====
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

preloadImages();
