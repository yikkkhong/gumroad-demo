### ARCHAEOLOGY PORTFOLIO WEBSITE

A unique, interactive portfolio website where visitors act as archaeologists. To view your work, they must "clean" the dust off ancient artifacts using a scratch-off mechanic.


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


---

### 1. PROJECT STRUCTURE

This project consists of three main files:

1. index.html  -> The skeleton of the website (Sidebar + Excavation Zone).
2. style.css   -> The visual design, colors, rock shapes, and layout.
3. script.js   -> The logic for the scratch-off effect and inventory management.

---

### 2. HOW TO INSTALL / RUN

This is a static website, meaning you do not need a server or Node.js to run it locally.

1. Create a new folder on your computer (e.g., "My_Portfolio").
2. Create three text files inside that folder:
   - index.html
   - style.css
   - script.js
3. Paste the code provided in the previous step into the respective files.
4. Double-click "index.html" to open it in your web browser (Chrome, Firefox, Safari, etc.).

---

### 3. HOW TO CUSTOMIZE

### Changing Portfolio Content
To add your own projects, open 'script.js' and look for the `portfolioItems` array at the top. It looks like this:

const portfolioItems = [
    {
        title: "Your Project Title",
        desc: "Description of the project...",
        tag: "Category"
    },
    ...
];

You can add as many items as you want. The sidebar will update automatically.

### Changing the Rock Shape
The shape of the artifact is defined in 'style.css' using `clip-path`. Look for the `#artifact-container` section:

clip-path: polygon(20% 0%, 90% 5%, ...);

You can use online "CSS Clip-Path Generators" to create new custom shapes (triangles, hexagons, shards) and paste the code there.

### Adjusting "Cleaning Difficulty"
If you want to make it easier or harder to reveal the project, open 'script.js' and find the `checkCompletion` function. Look for this line:

if (percentCleared > 50) { ... }

Change "50" to a lower number (e.g., 30) to make it reveal faster, or higher (e.g., 80) to require more thorough cleaning.

---

### 4. FEATURES

* **Sidebar Inventory:** Automatically tracks which artifacts have been discovered and which are still hidden.
* **Scratch-Off Effect:** Uses HTML5 Canvas to simulate wiping dust off a surface.
* **Touch Support:** Works on mobile devices (touchscreens) as well as mouse-driven desktops.
* **Auto-Reveal:** The remaining dust fades away automatically once the user has cleaned enough of the surface.

---

### 5. TROUBLESHOOTING

* **Images not loading?** Since this version uses CSS shapes and colors, there are no external images to break.
* **Sidebar text is wrong?** Make sure you reload the page after saving changes in `script.js`.
* **Cursor not aligned?** If the scratching happens away from your mouse pointer, ensure the browser zoom is set to 100% and that the CSS styles for the canvas position are set to absolute (which they are in the provided code).