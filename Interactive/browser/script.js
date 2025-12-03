document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tabs = document.querySelectorAll('.tab:not(.new-tab)');
    const pages = document.querySelectorAll('.page');
    const addressInput = document.getElementById('address-input');
    const projectList = document.getElementById('project-list');
    const projectCards = document.querySelectorAll('.project-card');
    const noResultMsg = document.getElementById('no-result');
    const btnGo = document.getElementById('btn-go');

    // 1. Tab Switching Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active status from all
            tabs.forEach(t => t.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));

            // Activate current tab
            tab.classList.add('active');
            
            // Get target page ID
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Update Simulated URL
            // If user was searching, reset URL on tab switch
            addressInput.value = `portfolio/${targetId}`;
            
            // Reset search filter if switching to Projects tab
            if(targetId === 'projects') {
                resetSearch();
            }
        });
    });

    // 2. Address Bar / Search Logic
    
    function handleSearch() {
        const query = addressInput.value.toLowerCase();
        
        // Auto-switch to "Projects" tab if not already there
        const projectsTab = document.querySelector('[data-target="projects"]');
        if (!projectsTab.classList.contains('active')) {
            projectsTab.click();
            // click() resets input value, so we fill it back with user's query
            addressInput.value = query; 
        }

        let hasResult = false;
        
        projectCards.forEach(card => {
            // Search in Title (h3) and data-name attributes
            const title = card.querySelector('h3').innerText.toLowerCase();
            const tags = card.getAttribute('data-name').toLowerCase();
            
            // Allow default paths (e.g. "portfolio/") to show everything
            if (title.includes(query) || tags.includes(query) || query.includes('portfolio/')) {
                card.style.display = 'block';
                hasResult = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show "No Result" message if nothing found
        if (!hasResult && !query.includes('portfolio/')) {
            noResultMsg.style.display = 'block';
        } else {
            noResultMsg.style.display = 'none';
        }
    }

    // Listen for Enter key
    addressInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Listen for GO button click
    btnGo.addEventListener('click', handleSearch);

    // Helper: Reset search to show all projects
    function resetSearch() {
        projectCards.forEach(card => card.style.display = 'block');
        noResultMsg.style.display = 'none';
    }

    // 3. Dynamic Footer Status (Simulating system stats)
    const loadTime = document.getElementById('load-time');
    setInterval(() => {
        const mem = Math.floor(Math.random() * 50) + 100; // Random memory usage
        loadTime.innerText = `Mem: ${mem}MB | CPU: 12%`;
    }, 3000);
});