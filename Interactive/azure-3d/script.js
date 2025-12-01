document.addEventListener('DOMContentLoaded', () => {

    // --- SYSTEM CONFIG ---
    const CONFIG = {
        starCount: 200,
        grassCount: 150, // High density grass
        petalCount: 40,
        fireflyCount: 20,
        cloudCount: 5,
        mouseSmoothness: 0.08, // Lower = heavier feel
        maxTilt: 15
    };

    // --- DOM ELEMENTS ---
    const world = document.getElementById('world');
    const starsContainer = document.getElementById('stars');
    const grassContainer = document.getElementById('grass-field');
    const sakuraContainer = document.getElementById('sakura-container');
    const fireflyContainer = document.getElementById('firefly-container');
    const cloudsContainer = document.getElementById('clouds');
    const loader = document.getElementById('loader');

    // --- INITIALIZATION ---
    function init() {
        generateStars();
        generateClouds();
        generateGrass();
        generatePetals();
        generateFireflies();
        
        // Remove loader after "rendering"
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 1000);
        }, 1500);

        // Start Loops
        requestAnimationFrame(renderLoop);
    }

    // --- GENERATORS (The "Detail" Builders) ---

    // 1. Star Field Generator
    function generateStars() {
        for (let i = 0; i < CONFIG.starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random positions
            const x = Math.random() * 100;
            const y = Math.random() * 60; // Top 60% only
            const size = Math.random() * 2 + 1;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            // Random opacity for depth
            star.style.opacity = Math.random();

            starsContainer.appendChild(star);
        }
    }

    // 2. Procedural Cloud Generator
    function generateClouds() {
        for(let i=0; i<CONFIG.cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');
            // Randomize size and position slightly
            const scale = Math.random() * 0.5 + 0.8;
            const top = Math.random() * 30;
            const duration = Math.random() * 60 + 40; // Slow drift
            
            cloud.style.top = `${top}%`;
            cloud.style.transform = `scale(${scale})`;
            cloud.style.animationDuration = `${duration}s`;
            cloud.style.opacity = Math.random() * 0.3 + 0.1;
            
            cloudsContainer.appendChild(cloud);
        }
    }

    // 3. Dynamic Grass System (Individual Blades!)
    function generateGrass() {
        for (let i = 0; i < CONFIG.grassCount; i++) {
            const blade = document.createElement('div');
            blade.classList.add('grass-blade');
            
            // Random position along width
            const left = Math.random() * 100;
            // Random height variety
            const height = Math.random() * 40 + 60; // 60px to 100px
            // Random lean/curve
            const lean = (Math.random() - 0.5) * 20; // -10deg to 10deg
            const delay = Math.random() * 2;

            blade.style.left = `${left}%`;
            blade.style.height = `${height}px`;
            blade.style.transform = `rotate(${lean}deg)`;
            blade.style.animationDelay = `${delay}s`;
            
            // Color variation for depth
            const colorVar = Math.random();
            if(colorVar > 0.7) blade.classList.add('grass-light');
            else if(colorVar < 0.3) blade.classList.add('grass-dark');

            grassContainer.appendChild(blade);
        }
    }

    // 4. Physics-based Sakura Petals
    // Instead of CSS animation only, we update positions in JS for wind simulation
    const petals = [];
    function generatePetals() {
        for (let i = 0; i < CONFIG.petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // SVG Icon
            petal.innerHTML = `<svg viewBox="0 0 30 30"><use href="#icon-petal"></use></svg>`;
            
            const obj = {
                el: petal,
                x: Math.random() * 100, // %
                y: Math.random() * -100, // Start above screen
                z: Math.random() * 200, // 3D depth
                speedX: Math.random() * 0.5 + 0.2,
                speedY: Math.random() * 1 + 0.5,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2,
                wobble: Math.random() * Math.PI * 2
            };
            
            petals.push(obj);
            sakuraContainer.appendChild(petal);
        }
    }

    // 5. Firefly System
    function generateFireflies() {
        for(let i=0; i<CONFIG.fireflyCount; i++){
            const fly = document.createElement('div');
            fly.classList.add('firefly');
            
            const x = Math.random() * 100;
            const y = Math.random() * 80 + 20; // Lower area
            const dur = Math.random() * 4 + 3;
            const delay = Math.random() * 5;
            
            fly.style.left = `${x}%`;
            fly.style.top = `${y}%`;
            fly.style.animationDuration = `${dur}s`;
            fly.style.animationDelay = `${delay}s`;
            
            fireflyContainer.appendChild(fly);
        }
    }

    // --- PHYSICS ENGINE ---
    
    // Parallax State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currRotX = 0;
    let currRotY = 0;

    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        
        // Normalized -1 to 1
        mouseX = (e.clientX - cx) / cx;
        mouseY = (e.clientY - cy) / cy;
        
        targetRotY = mouseX * CONFIG.maxTilt;
        targetRotX = mouseY * -1 * (CONFIG.maxTilt * 0.5); // Less vertical tilt
    });

    // The Main Render Loop
    function renderLoop() {
        // 1. Smooth Camera Physics (Lerp)
        currRotX += (targetRotX - currRotX) * CONFIG.mouseSmoothness;
        currRotY += (targetRotY - currRotY) * CONFIG.mouseSmoothness;
        
        world.style.transform = `rotateY(${currRotY}deg) rotateX(${currRotX}deg)`;

        // 2. Update Petals (Wind Physics)
        petals.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(p.wobble) * 0.3; // Wind sway
            p.rotation += p.rotationSpeed;
            p.wobble += 0.05;

            // Reset if out of bounds
            if (p.y > 110) {
                p.y = -10;
                p.x = Math.random() * 100;
            }
            if (p.x > 110) p.x = -10;

            // Apply styles
            p.el.style.transform = `translate3d(${p.x}vw, ${p.y}vh, ${p.z}px) rotate(${p.rotation}deg)`;
        });

        requestAnimationFrame(renderLoop);
    }

    // --- INTERACTION ---
    document.querySelectorAll('.info-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        card.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });

    init();
});