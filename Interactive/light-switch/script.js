// --- Data ---
const portfolioItems = [
    {
        title: "The Noir Collection",
        type: "Fashion Editorial",
        image: "",
        desc: "A monochromatic exploration of shadow and silhouette in modern street style.",
        year: "2024"
    },
    {
        title: "Ceramic Void",
        type: "Product Design",
        image: "",
        desc: "Hand-crafted pottery emphasizing negative space and ergonomic utility.",
        year: "2023"
    },
    {
        title: "Neon Horizons",
        type: "Digital Art",
        image: "",
        desc: "Cyberpunk landscapes rendered in real-time using Unreal Engine 5.",
        year: "2024"
    },
    {
        title: "Botanical Synthetics",
        type: "Installation",
        image: "",
        desc: "Merging organic plant matter with recycled plastic polymers.",
        year: "2022"
    },
    {
        title: "Type & Texture",
        type: "Brand Identity",
        image: "",
        desc: "A bold typographic system for a Swiss architecture firm.",
        year: "2023"
    }
];

// --- State ---
let isLightOn = true; // Start ON so user sees something
let currentIndex = 0;

// --- Elements ---
const switchBtn = document.getElementById('main-switch');
const wallShadow = document.getElementById('wall-shadow');
const darknessOverlay = document.getElementById('darkness-overlay');
const contentContainer = document.getElementById('content-container');
const projectCard = document.getElementById('project-card');

// --- Render Function ---
function renderProject(index) {
    const item = portfolioItems[index];
    projectCard.innerHTML = `
        <div class="flex flex-col md:flex-row h-[500px]">
            <div class="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                <img src="${item.image}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105">
                <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold tracking-wider uppercase">
                    ${item.type}
                </div>
            </div>
            
            <div class="w-full md:w-1/2 p-10 flex flex-col justify-center bg-[#fafafa]">
                <div class="w-12 h-1 bg-black mb-6"></div>
                <h2 class="font-serif text-4xl font-bold mb-4 text-slate-900 leading-tight">${item.title}</h2>
                <p class="font-sans text-slate-500 leading-relaxed mb-8">${item.desc}</p>
                
                <div class="mt-auto flex justify-between items-end border-t border-slate-200 pt-6">
                    <span class="font-mono text-xs text-slate-400">Project No. 0${index + 1}</span>
                    <span class="font-serif italic text-slate-600">${item.year}</span>
                </div>
            </div>
        </div>
    `;
}

// --- Interaction Logic ---
function toggleLight() {
    if (isLightOn) {
        // TURN OFF
        isLightOn = false;
        
        // 1. Animate Switch
        switchBtn.classList.remove('on');
        switchBtn.classList.add('off');

        // 2. Make Room Dark
        darknessOverlay.style.opacity = '1'; // Full black on right
        wallShadow.style.opacity = '0.8';   // Dim the wall on left
        
        // 3. Hide Content (so it can be swapped unseen)
        contentContainer.style.opacity = '0';
        contentContainer.classList.remove('flicker-on');

    } else {
        // TURN ON
        isLightOn = true;
        
        // 1. Advance Project Index (Loop)
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        renderProject(currentIndex);

        // 2. Animate Switch
        switchBtn.classList.remove('off');
        switchBtn.classList.add('on');

        // 3. Light up Room
        darknessOverlay.style.opacity = '0';
        wallShadow.style.opacity = '0';

        // 4. Reveal Content with Flicker
        // Small timeout to ensure darkness is gone before flicker starts
        setTimeout(() => {
            contentContainer.style.opacity = '1';
            contentContainer.classList.remove('flicker-on');
            void contentContainer.offsetWidth; // Trigger reflow
            contentContainer.classList.add('flicker-on');
        }, 100);
    }
}

// --- Init ---
// Render first project immediately
renderProject(0);

// Listeners
switchBtn.addEventListener('click', toggleLight);