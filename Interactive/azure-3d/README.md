# The Night Of Code Portfolio #


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


### 1. OVERVIEW
It is a high-fidelity, interactive web portfolio inspired by the visual style of Makoto Shinkai anime backgrounds. Unlike standard websites, it functions as a lightweight graphical engine using only HTML, CSS, and Vanilla JavaScript.

The scene features a 2.5D parallax depth effect where the user controls the camera angle with their mouse. It includes a physics-based particle system (sakura petals), procedural vegetation (grass), and dynamic water reflections.

### 2. KEY FEATURES
* **Cinematic Parallax Effect:** A smooth, damped mouse-follow camera with "Overscan" rendering, the user controls the camera angle with their mouse.
* **Procedural Generation:** Stars, clouds, grass blades, and fireflies are generated via JavaScript, creating a unique scene every reload.
* **Physics Simulation:** * **Sakura Petals:** Each petal has independent wind resistance, rotation, and sway logic.
    * **Grass:** 500+ individual blades sway with CSS animations.
* **Visual Effects:**
    * **Water Reflection:** Real-time reflection using CSS transforms and masking.
    * **Glassmorphism:** Frosted glass UI cards for project displays.
    * **Atmosphere:** Fog, noise grain, and vignette overlays for a film-like look.
* **Zero-Asset Dependency:** All graphics (Torii gate, Moon, Petals) are drawn using CSS shapes and SVG paths embedded in the code. No external images are needed.

### 3. FILE STRUCTURE
Ensure your folder looks exactly like this:

/project-folder
  |-- index.html      # The scene structure and SVG definitions
  |-- style.css       # Visuals, animations, and lighting engine
  |-- script.js       # Physics logic, generation, and parallax inputs
  |-- README.md      # This file

### 4. INSTALLATION & RUNNING
1.  Create a folder named `Azure_Shrine`.
2.  Create the three files listed above inside that folder.
3.  Paste the provided code into each file respectively.
    * **Note:** Ensure you used the *latest* versions of the code (the ones with the "Overscan/Black Edge Fix").
4.  Double-click `index.html` to open it in Chrome, Firefox, Safari, or Edge.

### 5. CONFIGURATION & CUSTOMIZATION

#### > Changing Project Info (The Cards)
Open `index.html` and look for the comment ``.
You can edit the text inside the `.info-card` divs:
* Change `<h2>NEON COMMERCE</h2>` to your project name.
* Change `<span>REACT</span>` to your technologies.

#### > Adjusting Performance
If the site runs slowly on older computers, open `script.js` and lower the numbers in the `CONFIG` object at the top:
* `starCount`: Reduce to 50.
* `grassCount`: Reduce to 50.
* `petalCount`: Reduce to 10.

#### > Adjusting Mouse Sensitivity
Open `script.js` and change `mouseSmoothness` inside `CONFIG`:
* `0.05` = Very heavy, cinematic feel (Slow).
* `0.2` = Snappy, responsive feel (Fast).

### 6. LICENSE & CREDITS
* **Fonts:** "Cinzel" and "Noto Serif JP" via Google Fonts.