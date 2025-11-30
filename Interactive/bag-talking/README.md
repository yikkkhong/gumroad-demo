# The Traveler's Portfolio 🎒🚶‍♂️

An interactive, narrative-driven portfolio website presented as a "Visual Novel" scene.

Instead of scrolling through a standard list, visitors meet a traveler character on a roadside. By conversing with the character, visitors ask them to rummage through their backpack, revealing portfolio projects one by one as "items."

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

### 🌟 Features

* **Storytelling UI:** Uses a dialogue box with a typewriter text effect and interaction choices.
* **Pure CSS Art:** The character, backpack, and scenery are built entirely using CSS shapes (divs) without any external image files.
* **Interactive Animations:** The character breathes, reaches into the bag, shakes the bag, and physically pulls out items.
* **Gamified Discovery:** Users actively "ask" to see projects, increasing engagement.
* **Responsive:** Works on desktop and mobile screens.

---

### 📂 File Structure

The project relies on three standard files:

1.  **`index.html`**: Contains the scene layers (sky, ground), the character DOM structure, and the dialogue UI.
2.  **`style.css`**: Contains all CSS art for the character, scenery gradients, and animations (rummaging, breathing).
3.  **`script.js`**: Handles the dialogue logic, the "inventory" of projects, and the animation sequencing.

---

### 🚀 How to Run

This is a static, vanilla JavaScript project. No installation or build tools are required.

1.  Download the files (`index.html`, `style.css`, `script.js`).
2.  Place them in the same folder.
3.  Open `index.html` in your web browser.

---

### 🛠️ How to Customize

#### 1. Adding Your Projects
Open `script.js` and locate the `portfolioItems` array at the top. You can add, remove, or edit the objects inside:

```javascript
const portfolioItems = [
    {
        id: 1,
        icon: "💻",              // The emoji shown when pulled out
        title: "My New Website", // The title on the card
        desc: "A description of what you built...",
        stats: "React | Node.js" // Tech stack tags
    },
    // Add more items here...
];