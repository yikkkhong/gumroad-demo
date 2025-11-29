Waterfall Portfolio - The Flow

A physics-based interactive portfolio template featuring a fluid particle simulation where water droplets interact with HTML content blocks.

📂 Project Structure

index.html: The main structure of the page. It contains the text content, navigation, and layout.

style.css: Handles the visual styling, including the custom cursor, glassmorphism effects, and layout spacing.

script.js: Contains the logic for the HTML5 Canvas particle simulation, physics collisions, and mouse interactions.

🚀 How to Run

Download all three files (index.html, style.css, script.js) into the same folder.

Open index.html in any modern web browser.

🛠 Customization

You can tweak the behavior of the animation by editing the CONSTANTS at the top of script.js.

1. Physics & Performance

Look for these variables at the top of script.js:

const PARTICLE_COUNT = 1500;  // How many water droplets? Lower this if it lags.
const GRAVITY = 0.15;         // How fast they fall.
const TERMINAL_VELOCITY = 8;  // Max speed.
const MOUSE_INFLUENCE_RADIUS = 150; // How big is your mouse "force field"?


2. Changing Colors

In script.js inside the Particle.init() method, you will find the color array:

// Current blues and whites
const colors = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#f0f9ff'];


To make a "Matrix" theme, change these to greens:

const colors = ['#00ff00', '#228b22', '#32cd32'];


3. Making Elements Collide

To make a new HTML element interact with the water, simply add the class obs-collider to it in index.html.

<!-- This box will now block the water particles -->
<div class="content-block obs-collider">
    ...content...
</div>


The JavaScript automatically scans for this class on scroll and updates the physics engine.

📦 Dependencies

Tailwind CSS: Loaded via CDN in index.html for rapid styling.

Font Awesome: Loaded via CDN for icons.

Google Fonts: Outfit & Playfair Display.

📄 License

Feel free to use and modify this code for your personal portfolio!