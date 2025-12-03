document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar Transition
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Animated Counter for Statistics
    const counters = document.querySelectorAll('.stat-item h2');
    // Also select the span specifically for the B+ counter if needed, 
    // but the logic below works for any element with data-target.
    const statsSection = document.querySelector('.stats-bar');
    let started = false; // Flag to ensure animation only happens once

    function startCounting() {
        counters.forEach(counter => {
            // Check if the counter is the one with the inner span, or a direct number
            const targetElement = counter.querySelector('span') || counter;
            const target = +targetElement.getAttribute('data-target');
            const speed = 200; // The lower the slower

            const updateCount = () => {
                const count = +targetElement.innerText;
                const inc = target / speed;

                if (count < target) {
                    targetElement.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    targetElement.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Intersection Observer to trigger counter when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            startCounting();
            started = true;
        }
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(statsSection);
});