# Whack-a-Portfolio 🐹🔨

A gamified, interactive portfolio website where visitors play "Whack-a-Mole" to discover your skills, projects, and contact information.

This project uses vanilla HTML, CSS, and JavaScript to create a realistic, fun, and engaging user experience.

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

### 🎮 Features
* **Interactive Gameplay:** Whack moles to open content sections.
* **Realistic Physics:** Moles react to hits ("hurt" face) and visual "POW" effects appear on impact.
* **Custom Cursor:** A hammer cursor that swings when you click.
* **Dynamic Difficulty:** The game gets slightly faster as your score increases.
* **Responsive Modals:** Content appears in clean, accessible pop-up windows.

---

### 📂 File Structure
The project consists of three core files:

1.  **`index.html`**: Contains the game structure, mole elements, and the modal content (text/info).
2.  **`style.css`**: Handles the visual theming, animations, custom cursor, and layout.
3.  **`script.js`**: Manages the game loop, hit detection, score tracking, and modal logic.

---

### 🚀 How to Run
Since this project uses pure Vanilla JS, no build tools (like Webpack, React, or Node.js) are required.

1.  Clone or download this repository.
2.  Ensure `index.html`, `style.css`, and `script.js` are in the same folder.
3.  Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

---

### 🛠️ How to Customize
You can easily adapt this template for your own portfolio.

#### 1. Changing the Content (Text & Info)
Open `index.html` and look for the `` section at the bottom.
* Edit the text inside `<div id="modal-about">`, `<div id="modal-projects">`, etc.
* You can add standard HTML (images, links, lists) inside these divs.

#### 2. Changing the Mole Labels
To change what the moles say on their chests:
* In `index.html`, find the `.mole` elements.
* Update the text inside `<div class="mole-label">YOUR_TEXT</div>`.
* *Note:* Keep the text short (e.g., "BLOG", "CV", "DEMOS") to fit the design.

#### 3. Adjusting Game Speed
Open `script.js` and find the `peep()` function.
* Modify `minTime` and `maxTime` to make the moles appear faster or slower.

```javascript
// Example: Slower game for easier reading
const minTime = 1000; 
const maxTime = 2000;