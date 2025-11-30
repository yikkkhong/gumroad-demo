// --- Portfolio Data (The items in the bag) ---
const portfolioItems = [
    {
        id: 1,
        icon: "📜", // Using Emojis as "Items"
        title: "Resume / CV",
        desc: "A solid background in Frontend Dev. 3 Years experience. Expert in React and interactive web design.",
        stats: "HTML | CSS | JS"
    },
    {
        id: 2,
        icon: "🎮",
        title: "Mini-Game Engine",
        desc: "A browser-based physics engine I built for web games. Features collision detection and particle effects.",
        stats: "Canvas API | Physics"
    },
    {
        id: 3,
        icon: "🎨",
        title: "Digital Art Gallery",
        desc: "An immersive 3D gallery website created to showcase digital art pieces.",
        stats: "Three.js | WebGL"
    },
    {
        id: 4,
        icon: "📱",
        title: "Social App UI",
        desc: "A sleek, responsive mobile-first UI kit designed for a startup social platform.",
        stats: "Figma | Flutter"
    }
];

// --- State Variables ---
let currentInventory = [...portfolioItems]; // Copy the array
let isAnimating = false;

// --- DOM Elements ---
const dialogueText = document.getElementById('dialogue-text');
const optionsContainer = document.getElementById('options-container');
const traveler = document.getElementById('traveler');
const heldItemEl = document.getElementById('held-item');
const itemCard = document.getElementById('item-card');
const cardTitle = document.getElementById('card-title');
const cardDesc = document.getElementById('card-desc');
const cardStats = document.getElementById('card-stats');

// --- Initialization ---
window.onload = () => {
    typeWriter("Hi there! I'm a developer on a journey. Care to see what I've got packed?", () => {
        showOptions(['intro']);
    });
};

// --- Typewriter Effect ---
function typeWriter(text, callback) {
    dialogueText.innerHTML = "";
    let i = 0;
    const speed = 30; // ms per char

    function type() {
        if (i < text.length) {
            dialogueText.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// --- Option Logic ---
function showOptions(stage) {
    optionsContainer.innerHTML = ""; // Clear old buttons

    if (stage.includes('intro')) {
        createButton("Who are you?", () => handleDialogue('who'));
        createButton("What's in the bag?", () => handleDialogue('bag'));
    } 
    else if (stage.includes('bag_loop')) {
        if (currentInventory.length > 0) {
            createButton("Show me another!", () => pullItemFromBag());
            createButton("That's enough.", () => handleDialogue('end'));
        } else {
            createButton("Empty?", () => handleDialogue('empty'));
        }
    }
}

function createButton(label, onClick) {
    const btn = document.createElement('button');
    btn.innerText = label;
    btn.onclick = onClick;
    optionsContainer.appendChild(btn);
}

// --- Dialogue Handler ---
function handleDialogue(topic) {
    optionsContainer.innerHTML = ""; // Hide buttons while talking

    if (topic === 'who') {
        typeWriter("I'm a creative coder who loves building interactive experiences. I roam the web looking for cool projects!", () => {
            // Return to main options
            createButton("Cool! What's in the bag?", () => handleDialogue('bag'));
        });
    } 
    else if (topic === 'bag') {
        typeWriter("Ah, my trusty backpack. It holds all my best work. Let me dig something out...", () => {
            setTimeout(pullItemFromBag, 500);
        });
    }
    else if (topic === 'empty') {
         typeWriter("Looks like that's everything! Thanks for checking out my gear. Ready to hire me?", () => {
             createButton("Contact Me", () => alert("Email: dev@example.com"));
             createButton("Restart", () => location.reload());
         });
    }
    else if (topic === 'end') {
        typeWriter("Alright! Let me know if you need anything else. Safe travels!", () => {
             createButton("Restart", () => location.reload());
        });
    }
}

// --- The Core Mechanic: Pull Item ---
function pullItemFromBag() {
    if (isAnimating) return;
    if (currentInventory.length === 0) {
        handleDialogue('empty');
        return;
    }

    isAnimating = true;
    optionsContainer.innerHTML = "";
    
    // 1. Animation: Rummage
    traveler.classList.add('rummaging');
    
    // 2. Wait, then show item
    setTimeout(() => {
        // Take first item from array
        const item = currentInventory.shift(); 
        
        // Stop rummaging
        traveler.classList.remove('rummaging');
        
        // Show item icon held in hand
        heldItemEl.innerText = item.icon;
        heldItemEl.classList.add('show');

        // Update Dialogue
        typeWriter(`Ooh, look! It's my ${item.title}!`, () => {
            
            // 3. Transform item into Card
            setTimeout(() => {
                showCard(item);
                heldItemEl.classList.remove('show'); // Hide icon
                isAnimating = false;
            }, 800);
        });

    }, 1500); // Rummage duration
}

// --- Show Details Card ---
function showCard(item) {
    cardTitle.innerText = item.title;
    cardDesc.innerText = item.desc;
    cardStats.innerText = `[ ${item.stats} ]`;
    itemCard.classList.add('active');
}

function closeCard() {
    itemCard.classList.remove('active');
    // After closing, show options to continue
    showOptions(['bag_loop']);
}