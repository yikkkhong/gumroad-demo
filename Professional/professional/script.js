// 1. Data Source (Edit this to add your own projects/products)
const portfolioItems = [
    {
        id: 1,
        category: 'web',
        title: 'E-Commerce Dashboard',
        description: 'A React-based dashboard for tracking sales and inventory with real-time charts.',
        image: 'https://placehold.co/600x400/2563eb/white?text=Dashboard'
    },
    {
        id: 2,
        category: 'app',
        title: 'Fitness Tracker App',
        description: 'Mobile application designed for iOS to track daily steps and calories burned.',
        image: 'https://placehold.co/600x400/10b981/white?text=Mobile+App'
    },
    {
        id: 3,
        category: 'branding',
        title: 'Coffee Shop Identity',
        description: 'Complete brand overhaul including logo, packaging, and store signage.',
        image: 'https://placehold.co/600x400/f59e0b/white?text=Branding'
    },
    {
        id: 4,
        category: 'web',
        title: 'Travel Blog Template',
        description: 'A lightweight, SEO-optimized blog theme built with plain HTML and CSS.',
        image: 'https://placehold.co/600x400/6366f1/white?text=Travel+Blog'
    },
    {
        id: 5,
        category: 'app',
        title: 'Finance Wallet',
        description: 'Secure digital wallet interface design with dark mode support.',
        image: 'https://placehold.co/600x400/ec4899/white?text=Wallet+UI'
    },
    {
        id: 6,
        category: 'branding',
        title: 'Neon Product Package',
        description: 'Packaging design for a new line of gaming peripherals.',
        image: 'https://placehold.co/600x400/8b5cf6/white?text=Packaging'
    }
];

// 2. Select DOM Elements
const gridContainer = document.getElementById('grid-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('item-modal');
const closeModal = document.querySelector('.close-modal');

// Modal Elements
const modalImg = document.getElementById('modal-image');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

// 3. Render Function
function renderItems(items) {
    gridContainer.innerHTML = ''; // Clear existing items
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', item.id);
        
        card.innerHTML = `
            <div class="card-img-holder">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="card-content">
                <span class="card-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description.substring(0, 50)}...</p>
            </div>
        `;
        
        // Add click event to open modal
        card.addEventListener('click', () => openModal(item));
        gridContainer.appendChild(card);
    });
}

// 4. Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        if (filterValue === 'all') {
            renderItems(portfolioItems);
        } else {
            const filteredItems = portfolioItems.filter(item => item.category === filterValue);
            renderItems(filteredItems);
        }
    });
});

// 5. Modal Functionality
function openModal(item) {
    modal.style.display = 'flex';
    modalImg.src = item.image;
    modalCategory.textContent = item.category;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal if clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initial Render
renderItems(portfolioItems);