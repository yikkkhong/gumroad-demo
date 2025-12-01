#           THE SUMMONED ARCHITECT | RPG PORTFOLIO             #

This is a static portfolio website designed with a retro "Isekai" (Another World) RPG theme. It simulates a game interface on an old CRT monitor. The user plays the role of a "Summoned Architect" (Developer), showcasing skills, projects, and contact info through a game-like status menu.

Theme: Cyber-Fantasy / Pixel Art / Retro JRPG.

### What You Can Do:
✅ Use the template for personal portfolio or client projects
✅ Modify and customize the template
✅ Create derivative works based on the template
✅ Use for commercial purposes (such as building a website for a client)

### What You Cannot Do:
❌ Resell or redistribute the template as-is
❌ Share the source code publicly
❌ Create competing products or templates using this source code
❌ Claim the template as your own creation
❌ Use without purchasing a license

### FEATURES
* **CSS-Only Pixel Art:** The main character sprite is rendered entirely using CSS `box-shadow` (no images required).
* **CRT Simulation:** Scanlines, monitor glow, and screen curvature effects.
* **Typewriter Effect:** Dialogue is typed out letter-by-letter using JavaScript.
* **Interactive Menu:** Switch between "Status", "Quests", "Abilities", and "Summon" without reloading the page.
* **Responsive:** Adapts (mostly) to mobile screens, turning the layout into a vertical scroll.

### TECH STACK
* **HTML5:** Semantic structure.
* **CSS3:** Advanced styling, animations, variables, and box-shadow art.
* **JavaScript (Vanilla):** DOM manipulation and typing logic. No frameworks required.

### FILE STRUCTURE
/project-root
  |-- index.html      # Main structure and content
  |-- style.css       # Visual design, animations, and pixel art
  |-- script.js       # Logic for menus and typing effects
  |-- README.txt      # This file

### HOW TO RUN
1.  Download all three files (`index.html`, `style.css`, `script.js`) into a single folder.
2.  Double-click `index.html` to open it in any modern web browser (Chrome, Firefox, Edge, Safari).
3.  **Note:** An internet connection is required to load the "Press Start 2P" font from Google Fonts.

### CUSTOMIZATION GUIDE

#### > Changing the Text
Open `index.html` to edit the static content:
* **Name/Bio:** Look inside `<div id="stats">`.
* **Projects:** Look inside `<div id="quests">`.
* **Skills:** Look inside `<div id="skills">`.

To change the **Intro Dialogue** (the typing text), open `script.js`:
* Find the variable `const introText = "..."` at the top and replace the string with your own welcome message.

#### > Changing Colors
Open `style.css` and modify the `:root` variables at the top:
* `--bg-color`: Background color of the "void".
* `--accent-green`: Used for selection highlights.
* `--accent-pink`: Used for HP bars and accents.

#### > Editing the Pixel Hero
The character is drawn in `style.css` under the `.hero-sprite` class using `box-shadow`.
* Each line in the `box-shadow` property represents a pixel: `x-offset y-offset color`.
* To change the character, you can use an online "CSS Box Shadow Pixel Art Generator" and paste the resulting code into the `.hero-sprite` class.

### 7. CREDITS
* **Font:** "Press Start 2P" by CodeMan38 (via Google Fonts).