/* === GAME CONFIG === */
const SPEED = 3.5;
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 40;
const INTERACTION_DISTANCE = 60;
// Project Database
const projects = {
    1: {
        title: "🥐 Croissant E-Commerce",
        desc: "A buttery-smooth online shopping platform with real-time inventory management, secure payment processing, and responsive design. Features include product recommendations, wishlist functionality, and admin dashboard.",
        tech: "React • Redux • Node.js • Stripe • MongoDB"
    },
    2: {
        title: "🥖 Baguette REST API",
        desc: "High-performance RESTful API serving 10,000+ requests per second. Implements JWT authentication, rate limiting, caching strategies, and comprehensive documentation with Swagger.",
        tech: "Node.js • Express • Redis • PostgreSQL • Docker"
    },
    3: {
        title: "🍰 Shortcake Game Engine",
        desc: "Lightweight 2D game engine with physics simulation, sprite animation system, collision detection, and level editor. Perfect for creating platformers and arcade-style games.",
        tech: "HTML5 Canvas • JavaScript • Web Audio API"
    },
    4: {
        title: "🍩 Donut Dashboard",
        desc: "Beautiful analytics dashboard with real-time data visualization, customizable widgets, and dark mode support. Features interactive charts, export functionality, and role-based access control.",
        tech: "Vue.js • D3.js • Tailwind CSS • WebSocket"
    },
    5: {
        title: "🥨 Pretzel CMS",
        desc: "Flexible content management system with drag-and-drop page builder, multi-language support, and SEO optimization tools. Includes version control and collaborative editing features.",
        tech: "Next.js • TypeScript • Prisma • tRPC • AWS S3"
    }
};

/* === STATE === */
const player = document.getElementById('player');
const promptBox = document.getElementById('interaction-prompt');
const container = document.getElementById('game-container');

let pos = { x: 300, y: 350 };
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    s: false,
    a: false,
    d: false
};

let obstacles = [];
let breads = [];
let activeItem = null;
let isModalOpen = false;

/* === INITIALIZATION === */
function init() {
    // Set initial player position from state
    player.style.left = pos.x + 'px';
    player.style.top = pos.y + 'px';

    // Compute scene bounds (obstacles + breads) using boundingClientRect
    computeSceneBounds();

    // Setup overlay helpers (canvas, toggle, shortcuts)
    setupOverlay();

    // Recompute bounds on resize in case layout changes
    window.addEventListener('resize', computeSceneBounds);

    requestAnimationFrame(gameLoop);
}

function computeSceneBounds() {
    obstacles = [];
    breads = [];

    const containerRect = container.getBoundingClientRect();

    // Obstacles: use bounding rect relative to container for accurate collision
    const obstacleEls = document.querySelectorAll('.obstacle');
    obstacleEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        let x = rect.left - containerRect.left;
        let y = rect.top - containerRect.top;
        let w = rect.width;
        let h = rect.height;

        // Make small collider adjustments for display cases so player can reach the front
        if (el.classList.contains('display-case')) {
            // shrink from top slightly so player can stand in front
            const shrink = Math.min(30, h * 0.3);
            y += shrink;
            h -= shrink;
        }

        obstacles.push({ x, y, w, h });
    });

    // Breads: compute center positions using bounding rect relative to container
    const breadEls = document.querySelectorAll('.bread');
    breadEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        const breadObj = { id: el.dataset.id, x, y, element: el };
        breads.push(breadObj);

        // Click interaction (attached after breads array is populated)
        el.onclick = () => {
            if (!isModalOpen) openModal(breadObj.id);
        };
    });

    // If overlay is present, request a redraw to reflect updated bounds
    if (typeof drawOverlay === 'function') drawOverlay();
}

/* === INPUT HANDLING === */
window.addEventListener('keydown', (e) => {
    const k = e.key;
    if (keys.hasOwnProperty(k)) {
        keys[k] = true;
    } else {
        const lk = k.toLowerCase();
        if (keys.hasOwnProperty(lk)) keys[lk] = true;
    }

    // Interaction
    if ((e.code === 'Space' || e.key.toLowerCase() === 'e') && activeItem && !isModalOpen) {
        e.preventDefault();
        openModal(activeItem);
    }

    // Close Modal
    if (e.code === 'Escape' && isModalOpen) {
        closeModal();
    }
});

window.addEventListener('keyup', (e) => {
    const k = e.key;
    if (keys.hasOwnProperty(k)) {
        keys[k] = false;
    } else {
        const lk = k.toLowerCase();
        if (keys.hasOwnProperty(lk)) keys[lk] = false;
    }
});

/* === OVERLAY / UX HELPERS === */
const overlayCanvas = document.getElementById('overlay-canvas');
let overlayCtx = null;
let overlayVisible = false;
let helperActive = false;
let helperTimeout = null;

function setupOverlay() {
    if (!overlayCanvas) return;
    overlayCtx = overlayCanvas.getContext('2d');
    resizeOverlay();

    // Toggle button
    const toggle = document.getElementById('overlay-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            overlayVisible = !overlayVisible;
            toggle.innerText = overlayVisible ? 'Hide Overlays' : 'Show Overlays';
            drawOverlay();
        });
    }

    // Shortcuts: F1 to toggle overlays, H to point to nearest interactable
    window.addEventListener('keydown', (e) => {
        if (e.key === 'F1') {
            e.preventDefault();
            overlayVisible = !overlayVisible;
            if (toggle) toggle.innerText = overlayVisible ? 'Hide Overlays' : 'Show Overlays';
            drawOverlay();
        }
        if ((e.key === 'h' || e.key === 'H') && !helperActive) {
            showHelperArrow();
        }
    });

    window.addEventListener('resize', resizeOverlay);
}

function resizeOverlay() {
    if (!overlayCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    overlayCanvas.width = container.clientWidth * dpr;
    overlayCanvas.height = container.clientHeight * dpr;
    overlayCanvas.style.width = container.clientWidth + 'px';
    overlayCanvas.style.height = container.clientHeight + 'px';
    overlayCtx && overlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawOverlay() {
    if (!overlayCanvas || !overlayCtx) return;
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    if (!overlayVisible) return;

    // Draw obstacles
    overlayCtx.lineWidth = 2;
    obstacles.forEach(obs => {
        overlayCtx.fillStyle = 'rgba(255,0,0,0.08)';
        overlayCtx.strokeStyle = 'rgba(255,0,0,0.6)';
        overlayCtx.fillRect(obs.x, obs.y, obs.w, obs.h);
        overlayCtx.strokeRect(obs.x + 0.5, obs.y + 0.5, obs.w - 1, obs.h - 1);
    });

    // Draw breads and interaction circles
    breads.forEach(b => {
        overlayCtx.beginPath();
        overlayCtx.strokeStyle = 'rgba(255,215,0,0.9)';
        overlayCtx.fillStyle = 'rgba(255,215,0,0.06)';
        overlayCtx.lineWidth = 2;
        overlayCtx.arc(b.x, b.y, INTERACTION_DISTANCE, 0, Math.PI * 2);
        overlayCtx.fill();
        overlayCtx.stroke();

        overlayCtx.beginPath();
        overlayCtx.fillStyle = 'rgba(255,215,0,1)';
        overlayCtx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        overlayCtx.fill();
    });

    // Draw player center
    const px = pos.x + PLAYER_WIDTH / 2;
    const py = pos.y + PLAYER_HEIGHT / 2;
    overlayCtx.beginPath();
    overlayCtx.fillStyle = 'rgba(0,150,255,0.9)';
    overlayCtx.arc(px, py, 4, 0, Math.PI * 2);
    overlayCtx.fill();

    // If helper active, draw arrow to nearest bread
    if (helperActive) {
        const target = getNearestBreadToPlayer();
        if (target) {
            overlayCtx.beginPath();
            overlayCtx.strokeStyle = 'rgba(0,255,128,0.95)';
            overlayCtx.lineWidth = 3;
            overlayCtx.moveTo(px, py);
            overlayCtx.lineTo(target.x, target.y);
            overlayCtx.stroke();

            // Arrow head
            const angle = Math.atan2(target.y - py, target.x - px);
            const headlen = 10;
            overlayCtx.beginPath();
            overlayCtx.moveTo(target.x, target.y);
            overlayCtx.lineTo(target.x - headlen * Math.cos(angle - Math.PI / 6), target.y - headlen * Math.sin(angle - Math.PI / 6));
            overlayCtx.lineTo(target.x - headlen * Math.cos(angle + Math.PI / 6), target.y - headlen * Math.sin(angle + Math.PI / 6));
            overlayCtx.lineTo(target.x, target.y);
            overlayCtx.fillStyle = 'rgba(0,255,128,0.95)';
            overlayCtx.fill();
        }
    }
}

function getNearestBreadToPlayer() {
    const px = pos.x + PLAYER_WIDTH / 2;
    const py = pos.y + PLAYER_HEIGHT / 2;
    let best = null;
    let minD = Infinity;
    for (let b of breads) {
        const d = Math.hypot(px - b.x, py - b.y);
        if (d < minD) {
            minD = d;
            best = b;
        }
    }
    return best;
}

function showHelperArrow() {
    helperActive = true;
    drawOverlay();
    if (helperTimeout) clearTimeout(helperTimeout);
    helperTimeout = setTimeout(() => {
        helperActive = false;
        drawOverlay();
    }, 3000);
}

/* === GAME LOOP === */
function gameLoop() {
    if (isModalOpen) {
        requestAnimationFrame(gameLoop);
        return;
    }

    let dx = 0;
    let dy = 0;

    // Arrow keys or WASD
    if (keys.ArrowUp || keys.w) dy -= SPEED;
    if (keys.ArrowDown || keys.s) dy += SPEED;
    if (keys.ArrowLeft || keys.a) dx -= SPEED;
    if (keys.ArrowRight || keys.d) dx += SPEED;

    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        dx = (dx / magnitude) * SPEED;
        dy = (dy / magnitude) * SPEED;
    }

    // Apply movement
    if (dx !== 0 || dy !== 0) {
        player.classList.add('walking');
        movePlayer(dx, dy);
    } else {
        player.classList.remove('walking');
    }

    checkInteractions();
    // Update overlay each frame if visible so player arrow and highlights move with player
    if (overlayVisible) drawOverlay();
    requestAnimationFrame(gameLoop);
}

/* === PHYSICS === */
function movePlayer(dx, dy) {
    const nextX = pos.x + dx;
    const nextY = pos.y + dy;

    // Boundary check
    if (nextX < 0 || nextX > container.offsetWidth - PLAYER_WIDTH) dx = 0;
    if (nextY < 0 || nextY > container.offsetHeight - PLAYER_HEIGHT) dy = 0;

    // Collision detection - test separately for sliding
    if (!checkCollision(pos.x + dx, pos.y)) pos.x += dx;
    if (!checkCollision(pos.x, pos.y + dy)) pos.y += dy;

    // Update position
    player.style.left = pos.x + 'px';
    player.style.top = pos.y + 'px';
}

function checkCollision(x, y) {
    const pRect = { x, y, w: PLAYER_WIDTH, h: PLAYER_HEIGHT };

    for (let obs of obstacles) {
        if (
            pRect.x < obs.x + obs.w &&
            pRect.x + pRect.w > obs.x &&
            pRect.y < obs.y + obs.h &&
            pRect.y + pRect.h > obs.y
        ) {
            return true;
        }
    }
    return false;
}

/* === INTERACTION SYSTEM === */
function checkInteractions() {
    let closestBread = null;
    let minDistance = Infinity;

    const px = pos.x + PLAYER_WIDTH / 2;
    const py = pos.y + PLAYER_HEIGHT / 2;

    for (let bread of breads) {
        const dist = Math.sqrt(Math.pow(px - bread.x, 2) + Math.pow(py - bread.y, 2));
        
        if (dist < INTERACTION_DISTANCE && dist < minDistance) {
            closestBread = bread;
            minDistance = dist;
        }
    }

    if (closestBread) {
        activeItem = closestBread.id;
        promptBox.style.display = 'block';
        // Highlight the bread
        closestBread.element.style.filter = 'brightness(1.3) drop-shadow(0 0 8px rgba(255,215,0,0.8))';
    } else {
        activeItem = null;
        promptBox.style.display = 'none';
        // Remove all highlights
        breads.forEach(b => {
            b.element.style.filter = 'none';
        });
    }
}

/* === UI LOGIC === */
function openModal(id) {
    const data = projects[id];
    document.getElementById('modal-title').innerHTML = data.title;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal-tech').innerText = '🛠️ ' + data.tech;
    
    document.getElementById('modal-overlay').style.display = 'flex';
    isModalOpen = true;
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    isModalOpen = false;
    // Reset keys
    Object.keys(keys).forEach(key => keys[key] = false);
}

// Click outside to close
document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') {
        closeModal();
    }
});

// Start the game
init();
