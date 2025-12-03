// --- PROJECTS DATA ---
const projects = [
    {
        id: 0,
        name: 'AI Analytics Dashboard',
        description: 'Advanced data visualization platform with machine learning predictions. Premium project featuring real-time analytics, interactive dashboards, and cutting-edge technology integration.',
        tech: 'Vue.js, Python, TensorFlow, D3.js',
        featured: true
    },
    {
        id: 1,
        name: 'E-Commerce Platform',
        description: 'Full-stack marketplace solution with real-time inventory management, secure payment processing, and scalable architecture.',
        tech: 'React, Node.js, MongoDB, Stripe',
        featured: false
    },
    {
        id: 2,
        name: 'Mobile App Design System',
        description: 'Comprehensive component library serving 500+ screens across iOS and Android platforms with consistent design language.',
        tech: 'React Native, TypeScript, Figma',
        featured: false
    },
    {
        id: 3,
        name: 'Climate Data Visualization',
        description: 'Interactive mapping platform displaying global climate patterns with real-time data integration and geospatial analysis.',
        tech: 'D3.js, Python, PostGIS',
        featured: false
    },
    {
        id: 4,
        name: 'Real-time Chat Application',
        description: 'Scalable messaging platform with WebSocket infrastructure supporting thousands of concurrent users.',
        tech: 'WebSocket, Express, Redis',
        featured: false
    }
];

// --- CONFIGURATION ---
const SPEED = 12;
const SENSITIVITY = 0.12;
const WALL_LIMIT = 950;

// --- STATE ---
let x = 0;
let z = 0;
let pitch = 0;
let yaw = 0;
const keys = { w: false, a: false, s: false, d: false };

// --- DOM ELEMENTS ---
const cameraPitch = document.getElementById('camera-pitch');
const cameraYaw = document.getElementById('camera-yaw');
const world = document.getElementById('world');
const blocker = document.getElementById('blocker');
const infoOverlay = document.getElementById('info-overlay');
const closeBtn = document.querySelector('.close-btn');
const projectCards = document.querySelectorAll('.project-card, .featured-project');

// --- POINTER LOCK ---
blocker.addEventListener('click', () => {
    document.body.requestPointerLock();
});

document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === document.body) {
        blocker.style.display = 'none';
        document.addEventListener('mousemove', onMouseMove);
    } else {
        blocker.style.display = 'flex';
        document.removeEventListener('mousemove', onMouseMove);
        keys.w = keys.a = keys.s = keys.d = false;
    }
});

function onMouseMove(e) {
    yaw -= e.movementX * SENSITIVITY;
    pitch -= e.movementY * SENSITIVITY;
    pitch = Math.max(-80, Math.min(80, pitch));
}

// --- KEYBOARD ---
document.addEventListener('keydown', e => {
    if (keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = true;
    }
    if (e.key === 'Escape') {
        closeProjectInfo();
    }
});

document.addEventListener('keyup', e => {
    if (keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = false;
    }
});

// --- PROJECT INTERACTION ---
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = parseInt(card.getAttribute('data-project'));
        showProjectInfo(projectId);
    });
});

closeBtn.addEventListener('click', closeProjectInfo);

infoOverlay.addEventListener('click', (e) => {
    if (e.target === infoOverlay) {
        closeProjectInfo();
    }
});

function showProjectInfo(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    document.getElementById('info-title').textContent = project.name;
    document.getElementById('info-description').textContent = project.description;
    document.getElementById('tech-list').textContent = project.tech;
    infoOverlay.classList.remove('hidden');
    
    // Pause movement while info is open
    keys.w = keys.a = keys.s = keys.d = false;
}

function closeProjectInfo() {
    infoOverlay.classList.add('hidden');
}

// --- GAME LOOP ---
function update() {
    requestAnimationFrame(update);

    const yawRad = yaw * (Math.PI / 180);
    let dx = 0;
    let dz = 0;

    // Movement Logic
    if (keys.w) {
        dx -= Math.sin(yawRad) * SPEED;
        dz -= Math.cos(yawRad) * SPEED;
    }
    if (keys.s) {
        dx += Math.sin(yawRad) * SPEED;
        dz += Math.cos(yawRad) * SPEED;
    }
    if (keys.a) {
        dx -= Math.cos(yawRad) * SPEED;
        dz += Math.sin(yawRad) * SPEED;
    }
    if (keys.d) {
        dx += Math.cos(yawRad) * SPEED;
        dz -= Math.sin(yawRad) * SPEED;
    }

    // Collision
    if (x + dx > -WALL_LIMIT && x + dx < WALL_LIMIT) x += dx;
    if (z + dz > -WALL_LIMIT && z + dz < WALL_LIMIT) z += dz;

    // Apply Transforms
    cameraPitch.style.transform = `rotateX(${pitch}deg)`;
    cameraYaw.style.transform = `rotateY(${-yaw}deg)`;
    world.style.transform = `translate3d(${-x}px, 0, ${-z}px)`;
}

update();