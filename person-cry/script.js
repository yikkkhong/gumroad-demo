// ============================================
// CONFIGURATION - CUSTOMIZE YOUR CONTENT HERE
// ============================================

const showcaseContent = [
    {
        icon: "🎨",
        title: "Creative Design",
        description: "Beautiful and modern UI/UX designs that captivate users"
    },
    {
        icon: "💻",
        title: "Web Development",
        description: "Full-stack development with cutting-edge technologies"
    },
    {
        icon: "📱",
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications"
    },
    {
        icon: "🚀",
        title: "Performance",
        description: "Lightning-fast and optimized for the best experience"
    },
    {
        icon: "🎯",
        title: "Strategy",
        description: "Data-driven approach to achieve your business goals"
    },
    {
        icon: "⚡",
        title: "Innovation",
        description: "Cutting-edge solutions for modern challenges"
    },
    {
        icon: "🌟",
        title: "Quality",
        description: "Attention to detail in every aspect of the project"
    },
    {
        icon: "🔒",
        title: "Security",
        description: "Enterprise-grade security and data protection"
    }
];

// ============================================
// MAIN APPLICATION CODE
// ============================================

class TissueShowcase {
    constructor() {
        this.tissues = [];
        this.pulledCount = 0;
        this.isDragging = false;
        this.currentTissue = null;
        this.startY = 0;
        this.currentY = 0;
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.createTissues();
        this.setupEventListeners();
        this.updateCounter();
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 10 + 5 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = Math.random() * 10 + 10 + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    createTissues() {
        const container = document.getElementById('tissuesContainer');
        container.innerHTML = '';
        
        showcaseContent.forEach((content, index) => {
            const tissue = document.createElement('div');
            tissue.className = 'tissue';
            tissue.dataset.index = index;
            
            tissue.innerHTML = `
                <div class="tissue-content">
                    <div class="tissue-icon">${content.icon}</div>
                    <div class="tissue-title">${content.title}</div>
                    <div class="tissue-description">${content.description}</div>
                </div>
            `;
            
            // Stack tissues with slight offset
            tissue.style.top = `${index * 2}px`;
            tissue.style.left = '10px';
            tissue.style.zIndex = showcaseContent.length - index;
            tissue.style.transform = `rotate(${(Math.random() - 0.5) * 5}deg)`;
            
            container.appendChild(tissue);
            this.tissues.push(tissue);
        });
        
        document.getElementById('totalTissues').textContent = showcaseContent.length;
    }
    
    setupEventListeners() {
        const container = document.getElementById('tissuesContainer');
        
        // Mouse events
        container.addEventListener('mousedown', (e) => this.handleStart(e));
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        document.addEventListener('mouseup', (e) => this.handleEnd(e));
        
        // Touch events
        container.addEventListener('touchstart', (e) => this.handleStart(e), { passive: false });
        document.addEventListener('touchmove', (e) => this.handleMove(e), { passive: false });
        document.addEventListener('touchend', (e) => this.handleEnd(e));
        
        // Click event for quick pull
        container.addEventListener('click', (e) => {
            if (!this.isDragging) {
                const tissue = e.target.closest('.tissue');
                if (tissue && !tissue.classList.contains('pulled')) {
                    this.pullTissue(tissue);
                }
            }
        });
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }
    
    handleStart(e) {
        const tissue = e.target.closest('.tissue');
        if (!tissue || tissue.classList.contains('pulled')) return;
        
        this.isDragging = true;
        this.currentTissue = tissue;
        this.currentTissue.classList.add('grabbed');
        
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        this.startY = clientY;
        this.currentY = clientY;
        
        e.preventDefault();
    }
    
    handleMove(e) {
        if (!this.isDragging || !this.currentTissue) return;
        
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        this.currentY = clientY;
        
        const deltaY = this.startY - this.currentY;
        
        if (deltaY > 0) {
            const moveAmount = Math.min(deltaY, 150);
            this.currentTissue.style.transform = `translateY(-${moveAmount}px) rotate(${moveAmount * 0.1}deg)`;
        }
        
        e.preventDefault();
    }
    
    handleEnd(e) {
        if (!this.isDragging || !this.currentTissue) return;
        
        const deltaY = this.startY - this.currentY;
        
        if (deltaY > 80) {
            this.pullTissue(this.currentTissue);
        } else {
            this.currentTissue.style.transform = '';
        }
        
        this.currentTissue.classList.remove('grabbed');
        this.isDragging = false;
        this.currentTissue = null;
    }
    
    pullTissue(tissue) {
        if (tissue.classList.contains('pulled')) return;
        
        tissue.classList.add('pulled');
        this.pulledCount++;
        this.updateCounter();
        
        // Create confetti effect
        this.createConfetti(tissue);
        
        // Play sound effect (optional - can be added)
        this.playPullSound();
        
        // Check if all tissues are pulled
        if (this.pulledCount === showcaseContent.length) {
            setTimeout(() => this.celebrate(), 500);
        }
    }
    
    createConfetti(tissue) {
        const rect = tissue.getBoundingClientRect();
        const colors = ['#ff6b9d', '#667eea', '#764ba2', '#ffd700', '#00d4ff'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = rect.left + rect.width / 2 + 'px';
            confetti.style.top = rect.top + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `translateX(${(Math.random() - 0.5) * 200}px)`;
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }
    
    playPullSound() {
        // Create a simple sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            // Audio not supported or blocked
        }
    }
    
    celebrate() {
        // Create massive confetti explosion
        const colors = ['#ff6b9d', '#667eea', '#764ba2', '#ffd700', '#00d4ff', '#ff6b6b', '#4ecdc4'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-20px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 15 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }, i * 20);
        }
        
        // Show completion message
        this.showCompletionMessage();
    }
    
    showCompletionMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: white;
            padding: 40px 60px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            animation: popIn 0.5s ease-out forwards;
        `;
        
        message.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
            <h2 style="color: #667eea; margin-bottom: 10px; font-size: 28px;">All Revealed!</h2>
            <p style="color: #666; font-size: 16px;">You've discovered everything!</p>
        `;
        
        document.body.appendChild(message);
        
        // Add pop-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            message.style.animation = 'popIn 0.3s ease-in reverse';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
    
    updateCounter() {
        document.getElementById('tissueCounter').textContent = this.pulledCount;
        
        // Animate counter
        const counter = document.querySelector('.counter');
        counter.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 200);
    }
    
    reset() {
        this.pulledCount = 0;
        this.createTissues();
        this.updateCounter();
        
        // Animate reset button
        const btn = document.getElementById('resetBtn');
        btn.style.transform = 'rotate(360deg) scale(0.9)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 300);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TissueShowcase();
});

// ============================================
// CUSTOMIZATION GUIDE
// ============================================
/*
To customize this template for your own use:

1. Edit the showcaseContent array at the top of this file
2. Change the icons (use emoji or icon fonts)
3. Modify titles and descriptions
4. Adjust colors in style.css (search for color values)
5. Change the box label in index.html
6. Add more tissues by adding more objects to showcaseContent

Example custom content:
const showcaseContent = [
    {
        icon: "🎸",
        title: "Your Title",
        description: "Your description here"
    },
    // Add more items...
];

Enjoy your interactive showcase!
*/
