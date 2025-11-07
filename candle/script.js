// Sample posts data
const posts = [
    {
        title: "Sunset Photography",
        excerpt: "Capturing the beauty of golden hour in nature.",
        image: "images/pexels-pixabay-462023.jpg",
        content: "This collection features stunning sunset photography from various locations around the world. Each image captures the unique colors and atmosphere of golden hour, showcasing the beauty of nature's daily finale."
    },
    {
        title: "Urban Architecture",
        excerpt: "Modern cityscapes and structural designs.",
        image: "images/pexels-da-na-461418424-34621273.jpg",
        content: "Explore the fascinating world of urban architecture through these photographs of skyscrapers, bridges, and innovative building designs that shape our city skylines."
    },
    {
        title: "Abstract Art",
        excerpt: "Expressive colors and forms in digital medium.",
        image: "images/pexels-steve-1269968.jpg",
        content: "A series of digital abstract artworks that play with color, form, and texture to evoke emotion and stimulate the imagination without representing physical reality."
    },
    {
        title: "Culinary Creations",
        excerpt: "Artistic food presentation and recipes.",
        image: "images/pexels-sylwester-ficek-154797634-34535224.jpg",
        content: "Discover the art of culinary presentation with these beautifully plated dishes that are as pleasing to the eye as they are to the palate. Includes recipes and plating techniques."
    },
    {
        title: "Nature's Patterns",
        excerpt: "Fractals and repetitions in the natural world.",
        image: "images/pexels-peter-xie-371876898-34613670.jpg",
        content: "This series explores the fascinating patterns found throughout nature - from the microscopic structure of snowflakes to the grand spirals of galaxies, revealing the mathematical beauty in our world."
    }
];

// DOM elements
const torch = document.getElementById('torch');
const waterBucket = document.getElementById('water-bucket');
const flame = document.querySelector('.flame');
const smoke = document.querySelector('.smoke');
const postContainer = document.querySelector('.post-container');
const postModal = document.getElementById('post-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalBody = document.getElementById('modal-body');
const currentPostSpan = document.getElementById('current-post');
const totalPostsSpan = document.getElementById('total-posts');

// State variables
let isDraggingTorch = false;
let isDraggingBucket = false;
let isCandleLit = false;
let smokeTimeout = null;
let currentPostIndex = 0;

// Initialize
totalPostsSpan.textContent = posts.length;
updatePostDisplay();

// Make torch draggable
torch.addEventListener('mousedown', startDragTorch);
document.addEventListener('mousemove', dragTorch);
document.addEventListener('mouseup', stopDragTorch);

// Make water bucket draggable
waterBucket.addEventListener('mousedown', startDragBucket);
document.addEventListener('mousemove', dragBucket);
document.addEventListener('mouseup', stopDragBucket);

// Touch events for mobile
torch.addEventListener('touchstart', startDragTorch);
document.addEventListener('touchmove', dragTorch);
document.addEventListener('touchend', stopDragTorch);

waterBucket.addEventListener('touchstart', startDragBucket);
document.addEventListener('touchmove', dragBucket);
document.addEventListener('touchend', stopDragBucket);

// Post interaction
postContainer.addEventListener('click', showPostModal);
closeModal.addEventListener('click', hidePostModal);

// Functions
function startDragTorch(e) {
    isDraggingTorch = true;
    torch.style.cursor = 'grabbing';
    e.preventDefault();
}

function dragTorch(e) {
    if (!isDraggingTorch) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX && clientY) {
        torch.style.position = 'fixed';
        torch.style.left = (clientX - 40) + 'px';
        torch.style.top = (clientY - 40) + 'px';
        torch.style.zIndex = 1000;
        
        // Check if torch is close to candle wick
        const candleRect = document.querySelector('.candle').getBoundingClientRect();
        const torchRect = torch.getBoundingClientRect();
        
        const distance = Math.sqrt(
            Math.pow(candleRect.left + candleRect.width/2 - (torchRect.left + torchRect.width/2), 2) +
            Math.pow(candleRect.top - (torchRect.top + torchRect.height), 2)
        );
        
        if (distance < 80 && !isCandleLit) {
            lightCandle();
        }
    }
}

function stopDragTorch() {
    if (isDraggingTorch) {
        isDraggingTorch = false;
        torch.style.position = 'static';
        torch.style.cursor = 'grab';
    }
}

function startDragBucket(e) {
    isDraggingBucket = true;
    waterBucket.style.cursor = 'grabbing';
    e.preventDefault();
}

function dragBucket(e) {
    if (!isDraggingBucket) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX && clientY) {
        waterBucket.style.position = 'fixed';
        waterBucket.style.left = (clientX - 40) + 'px';
        waterBucket.style.top = (clientY - 40) + 'px';
        waterBucket.style.zIndex = 1000;
        
        // Check if bucket is close to candle flame
        const flameRect = flame.getBoundingClientRect();
        const bucketRect = waterBucket.getBoundingClientRect();
        
        const distance = Math.sqrt(
            Math.pow(flameRect.left + flameRect.width/2 - (bucketRect.left + bucketRect.width/2), 2) +
            Math.pow(flameRect.top + flameRect.height/2 - (bucketRect.top + bucketRect.height/2), 2)
        );
        
        if (distance < 100 && isCandleLit) {
            extinguishCandle();
        }
    }
}

function stopDragBucket() {
    if (isDraggingBucket) {
        isDraggingBucket = false;
        waterBucket.style.position = 'static';
        waterBucket.style.cursor = 'grab';
    }
}

function lightCandle() {
    isCandleLit = true;
    flame.classList.add('burning');
    
    // After 3 seconds, show smoke and post
    smokeTimeout = setTimeout(() => {
        smoke.classList.add('visible');
        createSmokeParticles();
        postContainer.classList.add('visible');
    }, 3000);
}

function extinguishCandle() {
    isCandleLit = false;
    flame.classList.remove('burning');
    smoke.classList.remove('visible');
    postContainer.classList.remove('visible');
    clearTimeout(smokeTimeout);
    
    // Move to next post
    currentPostIndex = (currentPostIndex + 1) % posts.length;
    updatePostDisplay();
    
    // Don't reset the water bucket position, let it stay where it was dropped
    // Only reset the torch position if needed
    torch.style.position = 'static';
}

function createSmokeParticles() {
    smoke.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('smoke-particle');
        
        const size = Math.random() * 30 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const left = Math.random() * 80 + 10;
        const top = Math.random() * 80 + 10;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        
        const animationDuration = Math.random() * 3 + 2;
        
        // create animation for each particles
        const moveX = Math.random() * 60 + 20; // move right to 20-80px
        const moveY = -Math.random() * 40 - 20; // move up tp 20-60px
        
        particle.style.animation = `floatRight ${animationDuration}s ease-in-out infinite`;
        
        smoke.appendChild(particle);
    }
    
    // add animation go to right
    if (!document.getElementById('smoke-animation')) {
        const style = document.createElement('style');
        style.id = 'smoke-animation';
        style.textContent = `
            @keyframes floatRight {
                0% { 
                    transform: translate(0, 0) scale(1); 
                    opacity: 0.8; 
                }
                50% {
                    transform: translate(${Math.random() * 40 + 20}px, -20px) scale(1.1);
                    opacity: 0.6;
                }
                100% { 
                    transform: translate(${Math.random() * 60 + 40}px, -40px) scale(1.2); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function updatePostDisplay() {
    const post = posts[currentPostIndex];
    const postImage = postContainer.querySelector('.post-image');
    
    postContainer.querySelector('.post-title').textContent = post.title;
    postContainer.querySelector('.post-excerpt').textContent = post.excerpt;
    
    // Clear previous image and create new img element
    postImage.innerHTML = '';
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title;
    postImage.appendChild(img);
    
    currentPostSpan.textContent = currentPostIndex + 1;
}

function showPostModal() {
    if (!isCandleLit) return;
    
    const post = posts[currentPostIndex];
    
    // Clear previous image and create new img element for modal
    modalImage.innerHTML = '';
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title;
    modalImage.appendChild(img);
    
    modalTitle.textContent = post.title;
    modalBody.innerHTML = `<p>${post.content}</p>`;
    
    postModal.classList.add('active');
}

function hidePostModal() {
    postModal.classList.remove('active');
}