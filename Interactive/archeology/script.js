// 1. DATA: Your Items
const portfolioItems = [
    {
        title: "The Golden Icon",
        desc: "A brand identity design for a luxury hotel.",
        tag: "Graphic Design"
    },
    {
        title: "Lost Scripts",
        desc: "Automated Python scripts for data recovery.",
        tag: "Backend Dev"
    },
    {
        title: "Royal Interface",
        desc: "UI/UX Case study for a banking app.",
        tag: "UI Design"
    },
    {
        title: "Clay Tablet",
        desc: "My personal blog built with Markdown.",
        tag: "Content"
    }
];

let currentIndex = 0;
let isRevealed = false;

// 2. SELECTORS
const container = document.getElementById('artifact-container');
const canvas = document.getElementById('dust-layer');
const ctx = canvas.getContext('2d');
const titleEl = document.getElementById('project-title');
const descEl = document.getElementById('project-desc');
const tagEl = document.getElementById('project-tag');
const nextBtn = document.getElementById('next-btn');
const statusText = document.getElementById('status-text');
const inventoryList = document.getElementById('inventory-list');

// 3. INITIALIZATION
function init() {
    loadArtifact(currentIndex);
    renderInventory();
}

function loadArtifact(index) {
    const item = portfolioItems[index];
    
    // Set Content
    titleEl.innerText = item.title;
    descEl.innerText = item.desc;
    tagEl.innerText = item.tag;

    // Reset UI State
    isRevealed = false;
    container.classList.remove('revealed');
    nextBtn.classList.add('hidden');
    statusText.innerText = "Status: Covered in dust";
    
    resetCanvas();
    renderInventory(); // Update sidebar highlights
}

// 4. SIDEBAR INVENTORY LOGIC
function renderInventory() {
    inventoryList.innerHTML = ""; // Clear current list

    portfolioItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('inventory-item');
        
        // Label logic
        if (index === currentIndex) {
            li.classList.add('active');
            li.innerText = `Feature #${index + 1}: Excavating...`;
        } else if (index < currentIndex) {
            li.classList.add('solved');
            li.innerText = `Feature #${index + 1}: ${item.title}`; // Reveal title when done
        } else {
            li.innerText = `Feature #${index + 1}: Unknown`;
        }

        inventoryList.appendChild(li);
    });
}

// 5. CANVAS & DIRT LOGIC
function resetCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Fill with Dirt Color
    ctx.fillStyle = "#5c4d3c"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise (Speckles) for texture
    ctx.fillStyle = "#4a3b2a";
    for(let i=0; i<1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const s = Math.random() * 2 + 1;
        ctx.fillRect(x,y,s,s);
    }
    
    // Set Blend Mode to Erase
    ctx.globalCompositeOperation = 'destination-out';
}

function scratch(x, y) {
    if (isRevealed) return;

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2, false); // Brush Size
    ctx.fill();

    checkCompletion();
}

// 6. COMPLETION CHECK
let throttleTimer;
function checkCompletion() {
    if (throttleTimer) return;
    
    throttleTimer = setTimeout(() => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;
        
        // Scan every 10th pixel to save performance
        for (let i = 3; i < pixels.length; i += 40) {
            if (pixels[i] < 128) {
                transparentPixels++;
            }
        }

        const totalPixelsChecked = pixels.length / 40;
        const percentCleared = (transparentPixels / totalPixelsChecked) * 100;

        if (percentCleared > 50) {
            revealArtifact();
        }
        
        throttleTimer = null;
    }, 150);
}

function revealArtifact() {
    isRevealed = true;
    canvas.style.transition = "opacity 1s";
    canvas.style.opacity = "0";
    container.classList.add('revealed');
    
    statusText.innerText = "Status: Cleaned!";
    nextBtn.classList.remove('hidden');
    
    // Update Sidebar to show the newly revealed title
    // (We trick the render function by incrementing logic visually)
    const currentLi = inventoryList.children[currentIndex];
    currentLi.innerText = `Feature #${currentIndex + 1}: ${portfolioItems[currentIndex].title}`;
    currentLi.classList.add('solved'); 
}

// 7. EVENT LISTENERS
function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

// Mouse
let isDrawing = false;
canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(getPos(e).x, getPos(e).y); });
canvas.addEventListener('mousemove', (e) => { if(isDrawing) scratch(getPos(e).x, getPos(e).y); });
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);

// Touch
canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(getPos(e).x, getPos(e).y); e.preventDefault(); });
canvas.addEventListener('touchmove', (e) => { if(isDrawing) scratch(getPos(e).x, getPos(e).y); e.preventDefault(); });
canvas.addEventListener('touchend', () => isDrawing = false);

// Next Button
nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= portfolioItems.length) {
        alert("All artifacts excavated! Restarting expedition.");
        currentIndex = 0;
    }
    
    // Reset Canvas opacity
    canvas.style.transition = "none";
    canvas.style.opacity = "1";
    
    loadArtifact(currentIndex);
});

// Run
init();