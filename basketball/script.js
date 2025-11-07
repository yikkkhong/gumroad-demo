document.addEventListener('DOMContentLoaded', function() {
    const basketball = document.getElementById('basketball');
    const hoop = document.getElementById('hoop');
    const resetBtn = document.getElementById('reset-btn');
    const portfolio = document.getElementById('portfolio');
    const court = document.querySelector('.basketball-court');
    
    // Create drag indicator elements
    const dragIndicator = document.createElement('div');
    dragIndicator.className = 'drag-indicator';
    const arrowHead = document.createElement('div');
    arrowHead.className = 'arrow-head';
    const powerMeter = document.createElement('div');
    powerMeter.className = 'power-meter';
    const powerMeterFill = document.createElement('div');
    powerMeterFill.className = 'power-meter-fill';
    const dragEffect = document.createElement('div');
    dragEffect.className = 'drag-effect';
    
    powerMeter.appendChild(powerMeterFill);
    document.body.appendChild(powerMeter);
    document.body.appendChild(dragEffect);
    
    // Physics constants
    const GRAVITY = 0.4;
    const FRICTION = 0.98;
    const BOUNCE = 0.7;
    const SHOOT_POWER_MULTIPLIER = 0.2;
    const MAX_DRAG_DISTANCE = 200; // Maximum drag distance for power calculation
    
    // Ball state
    let isDragging = false;
    let isShooting = false;
    let velocityX = 0;
    let velocityY = 0;
    let initialLeft = 200;
    let initialBottom = 50;
    let startX, startY, startTime, dragDistance;
    
    // Set initial position
    resetBall();
    
    // Basketball drag events
    basketball.addEventListener('mousedown', startDrag);
    basketball.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    resetBtn.addEventListener('click', resetBall);
    
    function startDrag(e) {
        if (isShooting) return;
        
        isDragging = true;
        basketball.classList.add('dragging');
        
        const ballRect = basketball.getBoundingClientRect();
        
        // Set start position to the center of the ball
        startX = ballRect.left + ballRect.width / 2;
        startY = ballRect.top + ballRect.height / 2;
        startTime = Date.now();
        
        // Store initial position
        initialLeft = parseFloat(basketball.style.left || initialLeft);
        initialBottom = parseFloat(basketball.style.bottom || initialBottom);
        
        // Reset velocities
        velocityX = 0;
        velocityY = 0;
        
        // Show power meter
        powerMeter.style.display = 'block';
        
        // Add drag indicator to the court
        court.appendChild(dragIndicator);
        dragIndicator.appendChild(arrowHead);
        
        // Position drag effect at the ball
        updateDragEffect(startX, startY);
        
        e.preventDefault();
    }
    
    function updateDragEffect(x, y) {
        // Calculate distance from start point
        const dx = x - startX;
        const dy = y - startY;
        dragDistance = Math.min(Math.sqrt(dx * dx + dy * dy), MAX_DRAG_DISTANCE);
        
        // Update power meter
        const powerPercent = (dragDistance / MAX_DRAG_DISTANCE) * 100;
        powerMeterFill.style.width = `${powerPercent}%`;
        
        // Position power meter above the ball
        const ballRect = basketball.getBoundingClientRect();
        powerMeter.style.bottom = (window.innerHeight - ballRect.top + 15) + 'px';
        powerMeter.style.left = (ballRect.left + ballRect.width / 2 - 50) + 'px';
        
        // Position drag effect
        dragEffect.style.left = x + 'px';
        dragEffect.style.top = y + 'px';
        
        // Update drag indicator
        if (dragDistance > 10) {
            const angle = Math.atan2(dy, dx);
            const length = Math.min(dragDistance, 150);
            
            dragIndicator.style.width = length + 'px';
            dragIndicator.style.transform = `rotate(${angle}rad)`;
            dragIndicator.style.left = (startX) + 'px';
            dragIndicator.style.top = (startY) + 'px';
            
            // Show drag effect
            dragEffect.style.opacity = '0.7';
            dragEffect.style.transform = `translate(-50%, -50%) scale(${length / 100})`;
        } else {
            dragIndicator.style.width = '0';
            dragEffect.style.opacity = '0';
        }
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        
        // Calculate distance from start point
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), MAX_DRAG_DISTANCE);
        
        // Update drag effect and power meter (ball stays in place)
        updateDragEffect(
            startX + (deltaX / distance) * Math.min(distance, MAX_DRAG_DISTANCE),
            startY + (deltaY / distance) * Math.min(distance, MAX_DRAG_DISTANCE)
        );
        
        e.preventDefault();
    }
    
    function endDrag(e) {
        if (!isDragging) return;
        
        isDragging = false;
        basketball.classList.remove('dragging');
        
        // Get end position
        const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
        const endY = e.type.includes('mouse') ? e.clientY : e.changedTouches[0].clientY;
        
        // Calculate drag vector (inverted for shooting in opposite direction)
        const dragDistanceX = startX - endX;
        const dragDistanceY = startY - endY;
        
        // Limit maximum drag distance and calculate power
        const distance = Math.min(Math.sqrt(dragDistanceX * dragDistanceX + dragDistanceY * dragDistanceY), MAX_DRAG_DISTANCE);
        
        if (distance > 10) { // Minimum drag threshold
            isShooting = true;
            
            // Calculate angle (in radians)
            const angle = Math.atan2(dragDistanceY, dragDistanceX);
            
            // Calculate power (0 to 1)
            const power = Math.min(distance / MAX_DRAG_DISTANCE, 1);
            
            // Calculate speed based on power (with minimum speed)
            const minSpeed = 10;
            const maxSpeed = 25;
            const speed = minSpeed + (power * (maxSpeed - minSpeed));
            
            // Set velocity (shoot in opposite direction of drag)
            velocityX = Math.cos(angle) * speed;
            velocityY = Math.sin(angle) * speed;
            
            // Start animation
            requestAnimationFrame(updateBallPosition);
        } else {
            // If not enough drag, don't shoot
            isShooting = false;
            resetBall();
        }
        
        // Clean up drag elements
        if (dragIndicator.parentNode === court) {
            court.removeChild(dragIndicator);
        }
        powerMeter.style.display = 'none';
        dragEffect.style.opacity = '0';
        
        e.preventDefault();
    }
    
    function checkBasket() {
        if (!isShooting) return;
        
        const ballRect = basketball.getBoundingClientRect();
        const rim = document.querySelector('.rim').getBoundingClientRect();
        
        // Ball dimensions
        const ballRadius = ballRect.width / 2;
        const ballCenterX = ballRect.left + ballRadius;
        const ballBottom = ballRect.bottom;
        const ballTop = ballRect.top;
        
        // Rim dimensions and position
        const rimLeft = rim.left;
        const rimRight = rim.right;
        const rimTop = rim.top;
        const rimBottom = rim.bottom;
        const rimWidth = rim.width;
        
        // Check if ball is within the rim's horizontal boundaries
        const isInRimX = ballCenterX > rimLeft && ballCenterX < rimRight;
        
        // Check if ball is passing through the rim vertically
        const isPassingThrough = 
            (ballTop < rimBottom && ballBottom > rimTop) && // Ball is overlapping with rim vertically
            isInRimX; // And horizontally
        
        // Check if ball is coming from above the rim (prevents multiple triggers)
        const isComingFromAbove = (ballRect.top + velocityY) < rimTop;
        
        // Check if ball is moving downward (positive Y velocity in our coordinate system)
        const isMovingDownward = velocityY > 0;
        
        // Score if ball is passing through the rim from above
        if (isPassingThrough && (isComingFromAbove || isMovingDownward)) {
            // Prevent multiple triggers
            if (!basketball.dataset.scored) {
                basketball.dataset.scored = 'true';
                scoreBasket();
                // Reset the flag after a short delay
                setTimeout(() => {
                    basketball.dataset.scored = '';
                }, 1000);
            }
        }
    }
    
    function scoreBasket() {
        isShooting = false;
        basketball.classList.add('shooting');
        
        // Add some visual feedback
        basketball.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            basketball.style.display = 'none';
            showPortfolio();
        }, 500);
    }
    
    function showPortfolio() {
        // Create celebration effect
        createConfetti();
        
        // Show portfolio after a short delay
        setTimeout(() => {
            portfolio.classList.remove('hidden');
            document.querySelector('.game-section').style.display = 'none';
        }, 1500);
    }
    
    function createConfetti() {
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        document.body.appendChild(celebration);
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            celebration.appendChild(confetti);
            
            // Animate confetti
            const animation = confetti.animate([
                { top: '-10px', opacity: 1, transform: `rotate(0deg)` },
                { top: '100vh', opacity: 0, transform: `rotate(${Math.random() * 720}deg)` }
            ], {
                duration: 2000 + Math.random() * 3000,
                easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
            });
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
        
        // Remove celebration element after animation
        setTimeout(() => {
            celebration.remove();
        }, 5000);
    }
    
    function updateBallPosition() {
        if (!isShooting) return;
        
        // Apply gravity
        velocityY += GRAVITY;
        
        // Apply friction
        velocityX *= FRICTION;
        
        // Get current position
        let left = parseFloat(basketball.style.left || initialLeft);
        let bottom = parseFloat(basketball.style.bottom || initialBottom);
        
        // Update position
        left += velocityX;
        bottom -= velocityY; // Subtract because Y increases downward in CSS
        
        // Get court boundaries
        const courtRect = court.getBoundingClientRect();
        const ballSize = basketball.offsetWidth;
        
        // Check floor collision
        if (bottom <= 0) {
            bottom = 0;
            velocityY = -velocityY * BOUNCE;
            velocityX *= 0.9; // Slight horizontal friction on bounce
            
            // Stop the ball if it's moving very slowly
            if (Math.abs(velocityY) < 0.5 && Math.abs(velocityX) < 0.5) {
                isShooting = false;
                return;
            }
        }
        
        // Check wall collisions
        if (left <= 0) {
            left = 0;
            velocityX = -velocityX * BOUNCE;
        } else if (left >= courtRect.width - ballSize) {
            left = courtRect.width - ballSize;
            velocityX = -velocityX * BOUNCE;
        }
        
        // Update ball position
        basketball.style.left = left + 'px';
        basketball.style.bottom = bottom + 'px';
        
        // Check for basket
        checkBasket();
        
        // Continue animation if still shooting
        if (isShooting) {
            requestAnimationFrame(updateBallPosition);
        }
    }
    
    function resetBall() {
        isShooting = false;
        isDragging = false;
        velocityX = 0;
        velocityY = 0;
        
        // Ensure ball is within court boundaries
        const courtRect = court.getBoundingClientRect();
        const ballSize = basketball.offsetWidth;
        const padding = 5;
        
        let newLeft = initialLeft;
        let newBottom = initialBottom;
        
        // Constrain to court with padding
        newLeft = Math.max(padding, Math.min(courtRect.width - ballSize - padding, newLeft));
        newBottom = Math.max(padding, Math.min(courtRect.height - ballSize - padding, newBottom));
        
        basketball.style.left = newLeft + 'px';
        basketball.style.bottom = newBottom + 'px';
        basketball.style.display = 'block';
        basketball.classList.remove('shooting');
        basketball.style.transform = 'scale(1)';
        
        // Reset power meter
        powerMeterFill.style.width = '0%';
        powerMeter.style.display = 'none';
        
        // Remove drag indicator if it exists
        if (dragIndicator.parentNode === court) {
            court.removeChild(dragIndicator);
        }
        
        // Hide drag effect
        dragEffect.style.opacity = '0';
    }
});