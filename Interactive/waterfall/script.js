/**
 * Waterfall Portfolio - The Flow
 * Interactive Particle System Logic
 */

// --- CONFIGURATION ---
const PARTICLE_COUNT = window.innerWidth < 768 ? 600 : 1500; // Optimize for mobile
const GRAVITY = 0.15;
const TERMINAL_VELOCITY = 8;
const MOUSE_INFLUENCE_RADIUS = 150;
const MOUSE_FORCE = 0.8;

// --- SETUP ---
const canvas = document.getElementById('waterfall-canvas');
const ctx = canvas.getContext('2d', { alpha: true }); // Enable transparency
let width, height;
let particles = [];
let obstacles = []; // DOM elements represented as physics bodies

// Mouse/Touch State
let mouse = { x: -1000, y: -1000, active: false };
let scrollY = window.scrollY;

// UI References
const cursorFollower = document.getElementById('cursor-follower');
const cursorGlow = document.getElementById('cursor-glow');

// --- CLASSES ---

class Particle {
    constructor(reset = true) {
        this.init(reset);
    }

    init(reset = true) {
        // Initialize random position at top or scattered if not reset
        this.x = Math.random() * width;
        this.y = reset ? -Math.random() * height : Math.random() * height;
        
        // Physics properties
        this.vx = (Math.random() - 0.5) * 0.5; // Slight horizontal drift
        this.vy = Math.random() * 2 + 2;       // Initial fall speed
        this.size = Math.random() * 1.5 + 0.5;
        this.friction = 0.96;
        
        // Visuals
        // Colors range from deep blue to bright cyan/white
        const colors = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#f0f9ff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
        // Apply Gravity
        this.vy += GRAVITY;
        if (this.vy > TERMINAL_VELOCITY) this.vy = TERMINAL_VELOCITY;

        // Apply Mouse Repulsion (The "Splash" effect)
        if (mouse.active) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_INFLUENCE_RADIUS) {
                const forceDirectionX = dx / dist;
                const forceDirectionY = dy / dist;
                const force = (MOUSE_INFLUENCE_RADIUS - dist) / MOUSE_INFLUENCE_RADIUS; // Stronger closer

                this.vx += forceDirectionX * force * MOUSE_FORCE * 5;
                this.vy += forceDirectionY * force * MOUSE_FORCE * 5;
            }
        }

        // Apply Obstacle Collisions (The DOM elements)
        // We check if particle is inside an obstacle rect
        for (let obs of obstacles) {
            if (this.x > obs.left && this.x < obs.right &&
                this.y > obs.top && this.y < obs.bottom) {
                
                // Collision!
                // Bounce off the top
                if (this.y < obs.top + 20) {
                    this.y = obs.top;
                    this.vy *= -0.4; // Bounce
                    this.vx += (Math.random() - 0.5) * 4; // Scatter horizontally
                } else {
                    // Slide around sides
                    const centerX = (obs.left + obs.right) / 2;
                    if (this.x < centerX) {
                        this.vx = -2;
                    } else {
                        this.vx = 2;
                    }
                }
            }
        }

        // Update Position
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around / Reset
        if (this.y > height + 20) {
            this.y = -10;
            this.x = Math.random() * width;
            this.vy = Math.random() * 2 + 2;
        }
        
        // Wall Bounce (Sides)
        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        if (this.x > width) { this.x = width; this.vx *= -1; }
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- FUNCTIONS ---

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    updateObstacles();
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(false));
    }
}

function updateObstacles() {
    // Get all elements with class 'obs-collider'
    // We store their bounding rectangles relative to the viewport
    const elements = document.querySelectorAll('.obs-collider');
    obstacles = Array.from(elements).map(el => {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
        };
    });
}

// Global function for the "Make a Splash" button
window.triggerSplash = function() {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Explode particles from center
    particles.forEach(p => {
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 300) {
            p.vx = (dx / dist) * 20;
            p.vy = (dy / dist) * 20;
        }
    });
    
    // Shake screen slightly
    document.body.style.transform = "translate(2px, 2px)";
    setTimeout(() => document.body.style.transform = "none", 50);
};

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

// --- EVENTS ---

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

// Optimization: Debounce obstacle updates on scroll
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    
    // Update active nav dot
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top >= -height/2 && rect.top < height/2) {
            const id = sec.getAttribute('id');
            document.querySelectorAll('.nav-dot').forEach(dot => {
                dot.classList.toggle('active', dot.getAttribute('href') === `#${id}`);
            });
        }
    });

    // Update physics obstacles
    updateObstacles();
});

// Mouse Tracking
document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;

    // Update Custom Cursor
    if (cursorFollower && cursorGlow) {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }

    // Parallax effect on content blocks near mouse
    const blocks = document.querySelectorAll('.content-block');
    blocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.sqrt(distX*distX + distY*distY);
        
        if (dist < 400) {
            const moveX = -(distX / 30);
            const moveY = -(distY / 30);
            block.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            block.style.transform = `translate(0px, 0px)`;
        }
    });
});

document.addEventListener('mousedown', () => {
    if (cursorFollower) {
        cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)";
        cursorFollower.style.background = "rgba(255,255,255,0.3)";
    }
    
    // Create a shockwave in particles
    particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
            p.vx += (dx / dist) * 10;
            p.vy += (dy / dist) * 10;
        }
    });
});

document.addEventListener('mouseup', () => {
    if (cursorFollower) {
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
        cursorFollower.style.background = "transparent";
    }
});

document.addEventListener('mouseleave', () => {
    mouse.active = false;
});

// --- INITIALIZATION ---
resize();
initParticles();
animate();
updateObstacles();