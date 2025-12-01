document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuration ---
    const introText = "Welcome, Traveler. I am the Summoned Architect of this realm. Browse the archives to see my skills, or initiate a quest contract.";
    const typingSpeed = 40; // Milliseconds per character
    const typeDestination = document.getElementById('typing-text');
    
    // --- Typewriter Effect Function ---
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < introText.length) {
            typeDestination.innerHTML += introText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // Start the typing effect
    typeWriter();

    // --- Menu Navigation Logic ---
    const buttons = document.querySelectorAll('.menu-btn');
    const panels = document.querySelectorAll('.panel');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Play a subtle beep sound effect (Optional Logic placeholder)
            // console.log("Sound: Blip");

            // 2. Remove active class from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            
            // 3. Add active class to clicked button
            btn.classList.add('active');

            // 4. Hide all panels
            panels.forEach(p => p.classList.remove('active-panel'));

            // 5. Show the target panel
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-panel');

            // 6. Dynamic Dialogue Update (Optional immersion)
            updateDialogue(targetId);
        });
    });

    // Change dialogue based on section
    function updateDialogue(section) {
        typeDestination.innerHTML = ""; // Clear text
        charIndex = 0;
        let newText = "";

        switch(section) {
            case 'stats':
                newText = "Accessing User Profile... High intelligence stats detected.";
                break;
            case 'quests':
                newText = "Loading Quest Log... These are the battles I have won.";
                break;
            case 'skills':
                newText = "Opening Spellbook... These are the technologies I command.";
                break;
            case 'contact':
                newText = "Initiating Summoning Ritual... Ready to accept new contracts.";
                break;
        }

        // Quick internal function to type the new text
        let localIndex = 0;
        function playLocalType() {
             if (localIndex < newText.length) {
                typeDestination.innerHTML += newText.charAt(localIndex);
                localIndex++;
                setTimeout(playLocalType, typingSpeed);
            }
        }
        playLocalType();
    }

    // --- Hover Effects for Interactivity ---
    // Add a random glitch effect to the "Summon" button occasionally
    const summonBtn = document.querySelector('.action-btn');
    setInterval(() => {
        if(Math.random() > 0.9) {
            summonBtn.style.transform = `translate(${Math.random()*2}px, ${Math.random()*2}px)`;
            setTimeout(() => summonBtn.style.transform = 'none', 100);
        }
    }, 1000);
});