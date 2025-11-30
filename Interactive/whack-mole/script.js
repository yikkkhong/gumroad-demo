const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const moles = document.querySelectorAll('.mole');
const cursor = document.querySelector('.cursor');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtns = document.querySelectorAll('.close-modal');
const startButton = document.getElementById('start-btn');

let lastHole;
let timeUp = false;
let score = 0;
let isGameActive = false;

// --- Custom Cursor Logic ---
// Move hammer with mouse
window.addEventListener('mousemove', e => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});

// Hammer swing animation on click
window.addEventListener('mousedown', () => {
    cursor.classList.add('bonk');
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('bonk');
});

// --- Game Mechanics ---

// Helper: Get random time between min and max milliseconds
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Helper: Pick a random hole that isn't the same as the last one
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// The core loop: make a mole pop up
function peep() {
    // Varies speed based on score to make it harder over time
    const minTime = Math.max(600, 1000 - (score * 20));
    const maxTime = Math.max(1000, 1800 - (score * 30));
    
    const time = randomTime(minTime, maxTime);
    const hole = randomHole(holes);
    
    hole.classList.add('up');

    setTimeout(() => {
        // Only remove if it wasn't whacked already
        if(!hole.querySelector('.mole').classList.contains('whacked')) {
             hole.classList.remove('up');
        }
       
        if (!timeUp && isGameActive) {
            peep();
        } else {
             // Game Over state
             startButton.innerText = "Play Again?";
             isGameActive = false;
        }
    }, time);
}


function startGame() {
    if(isGameActive) return;

    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    isGameActive = true;
    startButton.innerText = "Game in progress...";
    
    // Reset any stuck moles
    holes.forEach(hole => hole.classList.remove('up'));
    moles.forEach(mole => mole.classList.remove('whacked'));

    peep();
    
    // Game lasts 20 seconds
    setTimeout(() => {
        timeUp = true;
    }, 20000);
}


function bonk(e) {
    if(!e.isTrusted) return; // Anti-cheat

    const mole = this;
    const hole = mole.parentElement;

    // Prevent double hits on sinking mole
    if(mole.classList.contains('whacked') || !hole.classList.contains('up')) return;

    // 1. Update Score
    score++;
    scoreBoard.textContent = score;
    
    // 2. Visual Feedback: "POW" effect at click location
    createHitEffect(e.clientX, e.clientY);

    // 3. Mole Reaction: Change appearance state
    mole.classList.add('whacked');

    // 4. Pause game loop briefly to show reaction
    isGameActive = false; 

    // Wait 500ms for the user to see the hit, then open content
    setTimeout(() => {
        hole.classList.remove('up');
        mole.classList.remove('whacked');
        
        const sectionId = mole.getAttribute('data-section');
        openModal(sectionId);
    }, 500);
}

// Creates the "POW" starburst graphic
function createHitEffect(x, y) {
    const pow = document.createElement('div');
    pow.classList.add('hit-pow');
    document.body.appendChild(pow);
    // Center the effect on the click
    pow.style.top = `${y - 40}px`;
    pow.style.left = `${x - 40}px`;

    // Remove element after animation finishes
    pow.addEventListener('animationend', function() {
        this.remove();
    });
}


// --- Modal Handling ---

function openModal(sectionId) {
    const modalToShow = document.getElementById(`modal-${sectionId}`);
    
    // Hide default cursor, enable normal cursor for reading
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';

    modalOverlay.classList.add('active');
    // Ensure other modals are closed
    document.querySelectorAll('.modal-content').forEach(m => m.classList.remove('active'));
    modalToShow.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.querySelectorAll('.modal-content').forEach(m => m.classList.remove('active'));

    // Restore game cursor
    cursor.style.display = 'block';
    document.body.style.cursor = 'none';

    // Resume game if time remains
    if(!timeUp) {
        isGameActive = true;
        peep();
    }
}


// Event Listeners
moles.forEach(mole => mole.addEventListener('mousedown', bonk)); // Use mousedown for faster response
closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) closeModal();
});