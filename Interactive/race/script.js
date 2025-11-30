// --- CONFIGURATION ---
// Reduced from 400 to 150 (Approx 2.5 seconds race)
const RACE_DURATION = 150; 

let frameCount = 0;
let isRacing = false;
let gameLoopId;

const players = [
    { 
        id: 'p1-wrapper', name: 'DevRunner', color: '#4facfe', 
        currentPos: 50, speedTier: 0,
        project: { title: "E-Commerce Core API", desc: "High-load Node.js & MongoDB backend handling 50k req/s." } 
    },
    { 
        id: 'p2-wrapper', name: 'DesiGnarl', color: '#ff4757', 
        currentPos: 50, speedTier: 0,
        project: { title: "Neo-Bank UX Case Study", desc: "Complete mobile app redesign in Figma with advanced prototyping." } 
    },
    { 
        id: 'p3-wrapper', name: 'SysAdminOps', color: '#ff9f43', 
        currentPos: 50, speedTier: 0,
        project: { title: "AWS Auto-Scaling Pipeline", desc: "Terraform & Jenkins setup for zero-downtime deployments." } 
    }
];

// --- DOM REFERENCES ---
const uiLayer = document.getElementById('ui-layer');
const startBtn = document.getElementById('start-btn');
const finishLine = document.getElementById('finish-line');
const leaderboard = document.getElementById('leaderboard');
const resultsGrid = document.getElementById('results-grid');
// NEW REFERENCE: The intro section
const characterIntro = document.getElementById('character-intro');

const bgLayers = {
    cloudsBack: document.querySelector('.clouds-back'),
    mountains: document.querySelector('.mountains'),
    ground: document.querySelector('.ground-track')
};


// --- INITIALIZATION ---
startBtn.addEventListener('click', startRace);

function startRace() {
    isRacing = true;
    
    // Fade out UI overlay
    uiLayer.style.opacity = '0';
    setTimeout(() => { uiLayer.style.display = 'none'; }, 500);

    // NEW: Smoothly hide the character intro section
    characterIntro.classList.add('hidden-fade');
    
    // Start race animations
    document.body.classList.add('running');
    
    // --- ASSIGN SPEED TIERS ---
    // Fast: 6, Medium: 4, Slow: 2.5
    const speedTiers = [6, 4, 2.5]; 
    speedTiers.sort(() => Math.random() - 0.5); // Shuffle

    players.forEach((p, index) => {
        p.speedTier = speedTiers[index];
        p.currentPos = 50; // Reset position
    });
    
    gameLoop();
}

// --- MAIN GAME LOOP ---
function gameLoop() {
    if (!isRacing) return;

    frameCount++;

    // 1. Move Backgrounds
    updateParallax(bgLayers.cloudsBack, 3);
    updateParallax(bgLayers.mountains, 8);
    updateParallax(bgLayers.ground, 20); 

    // 2. Update Player Positions
    players.forEach(p => {
        const currentSpeed = p.speedTier + (Math.random() * 0.5); 
        p.currentPos += currentSpeed;

        // Cap max distance so winner doesn't disappear too early
        const maxScreen = window.innerWidth * 0.85;
        if(p.currentPos > maxScreen) p.currentPos = maxScreen;

        document.getElementById(p.id).style.left = p.currentPos + "px";
    });

    // 3. Check Timer
    if (frameCount > RACE_DURATION) {
        endRaceSequence();
    } else {
        gameLoopId = requestAnimationFrame(gameLoop);
    }
}

function updateParallax(element, speedBase) {
    let currentPos = parseFloat(getComputedStyle(element).backgroundPositionX) || 0;
    element.style.backgroundPositionX = (currentPos - speedBase) + "px";
}


// --- END GAME SEQUENCE ---
function endRaceSequence() {
    isRacing = false;
    cancelAnimationFrame(gameLoopId);

    players.sort((a, b) => b.currentPos - a.currentPos);

    // Animate Finish Line In
    finishLine.style.transition = "right 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    finishLine.style.right = "20%";

    // Sprint players past line
    players.forEach((p, index) => {
        const el = document.getElementById(p.id);
        el.style.transition = `left 0.6s ease-in ${index * 0.1}s`; 
        el.style.left = "120%"; 
    });

    // Show Leaderboard
    setTimeout(() => {
        document.body.classList.remove('running');
        displayLeaderboard();
    }, 1000);
}


// --- GENERATE LEADERBOARD ---
function displayLeaderboard() {
    leaderboard.classList.remove('hidden');
    resultsGrid.innerHTML = '';

    players.forEach((p, index) => {
        const rank = index + 1;
        let medal = rank === 1 ? '👑' : (rank === 2 ? '🥈' : '🥉');
        const delay = index * 0.1;

        const html = `
            <div class="results-card rank-${rank}" style="animation-delay: ${delay}s">
                <div class="rank-badge">${medal}</div>
                <div class="card-info">
                    <h3>${p.project.title}</h3>
                    <div class="runner-id" style="color: ${p.color}">Runner: ${p.name}</div>
                    <p>${p.project.desc}</p>
                </div>
            </div>
        `;
        resultsGrid.innerHTML += html;
    });

    leaderboard.scrollIntoView({ behavior: 'smooth' });
}