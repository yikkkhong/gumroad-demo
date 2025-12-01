#                   THE LEGEND OF CODER | RPG PORTFOLIO                        #


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
This is an interactive Portfolio Website disguised as a retro RPG game. Instead of scrolling through a standard resume, visitors (players) must explore an island, unlock "chests" (projects), and defeat the "Bug King" (Boss) using coding skills they acquire along the way.

It features a fully functional map exploration engine, a turn-based battle system, and a hidden questline.

### 2. FEATURES
* **Open World Exploration:** A 20x20 grid map with trees, water, bridges, and hidden paths.
* **Resume System:** Projects and skills are locked inside Treasure Chests. Opening them unlocks new abilities.
* **Turn-Based Combat:** A classic JRPG battle interface with HP bars, animations, and skill selection.
* **Secret Quest:** The final Boss is immune to normal attacks. Players must solve a riddle to find the "Holy Sword."
* **Zero-Asset Design:** All graphics (Hero, Boss, Trees, Swords) are rendered using SVG code within CSS. No external image downloads required.

### 3. CONTROLS
* **[ARROW KEYS]**: Move the character (Up, Down, Left, Right).
* **[SPACE] / [ENTER]**: Interact with objects / Confirm in menus / Attack in battle.

### 4. GAME GUIDE (WALKTHROUGH)
To "beat" the portfolio and hire the developer, the user must:

1.  **Collect Experience:** Find and open all 3 Treasure Chests scattered on the map to view the projects.
2.  **The Roadblock:** Attempting to fight the Boss (Right side) immediately will result in 0 Damage.
3.  **The Hint:** Read the **Orange Sign** near the bridge. It hints at a weapon in the "Deep South-West".
4.  **The Hidden Path:** Travel to the bottom-left corner of the map. Look for a path cutting through the dense forest.
5.  **The Holy Sword:** Interact with the sword at the end of the path to learn `sudo rm -rf /`.
6.  **Victory:** Return to the bridge, cross it, and delete the Boss.

### 5. INSTALLATION
1.  Create a new folder on your computer.
2.  Create three files inside: `index.html`, `style.css`, and `script.js`.
3.  Paste the provided code into the respective files.
4.  Open `index.html` in any web browser (Chrome, Edge, Firefox, Safari).

### 6. CUSTOMIZATION GUIDE

#### > How to edit my Projects/Skills?
Open `script.js` and look for the `const chestData` array (around line 30).
Modify the `title`, `desc` (Description), and `skill` properties.

Example:
{ 
  id: 0, 
  title: "MY NEW PROJECT", 
  desc: "I built a cool app using Vue.js.", 
  skill: { name: "Vue Slash", dmg: 45 } 
}

#### > How to change the Secret Password?
Open `script.js` and find `const secretSkill`. You can rename `sudo rm -rf /` to anything you want (e.g., "Full Stack Attack").

#### > How to edit the Map?
Open `script.js` and find `const mapLayout`.
The numbers represent tiles:
* 0 = Water (Block)
* 1 = Grass (Walkable)
* 2 = Tree (Block)
* 3 = Chest
* 4 = Slime Enemy
* 5 = Bridge
* 7 = Signpost
* 8 = Holy Sword
* 9 = Boss

### 7. CREDITS
* **Font:** "Press Start 2P" by CodeMan38 (via Google Fonts).

#                        THANKS FOR PLAYING!                                   #