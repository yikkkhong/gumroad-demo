// 1. Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, .magnetic, .work-item');

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate movement for the small dot
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth delay for the circle follower (The "Lag" effect)
function animateCursor() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
    
    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 2. Hover Effects (Grow)
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        follower.classList.add('cursor-active');
        cursor.style.opacity = '0';
    });
    link.addEventListener('mouseleave', () => {
        follower.classList.remove('cursor-active');
        cursor.style.opacity = '1';
    });
});

// 3. Simple Magnetic Effect for specific elements
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const pos = elem.getBoundingClientRect();
        const x = e.clientX - pos.left - pos.width / 2;
        const y = e.clientY - pos.top - pos.height / 2;

        elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    elem.addEventListener('mouseleave', () => {
        elem.style.transform = `translate(0px, 0px)`;
    });
});

// 4. Reveal Text on Load
window.addEventListener('load', () => {
    const title = document.querySelector('h1');
    title.style.opacity = '0';
    title.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        title.style.transition = 'all 1s ease-out';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 300);
});