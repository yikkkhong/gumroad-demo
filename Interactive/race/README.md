# Portfolio Race

A high-performance, gamified portfolio website template. Three unique characters race against a parallax background to determine the order in which your projects are displayed.

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

# Features
- **Gamified Experience**: Users watch a short, exciting race (~2.5 seconds) instead of scrolling through a static list.
- **Parallax Scrolling**: Multi-layered backgrounds (clouds, mountains, ground) move at different speeds to create a 3D depth effect.
- **Distinct Ranking Logic**: Uses a "Speed Tier" system to ensure the winner is clearly ahead of the others visually.
- **CSS Art Characters**: No images required for the runners—they are built entirely with CSS gradients and shapes.
- **Responsive Design**: Works on desktop and mobile screens

# File Structure
You should have the following three files in the same folder:
- **index.html**: The main structure of the website, containing the game stage and the hidden leaderboard.
- **style.css**: Contains all the styling, animations (bobbing, dust trails), character designs, and the "glassmorphism" UI.
- **script.js**: Handles the game loop, the parallax math, the randomization of speed tiers, and the leaderboard generation

# How to Use
Click "START RACE" button to play!

# How to Customize (Important!)

1. Changing Project Content
Open script.js and look for the players array at the top of the file

2. Changing Race Duration
Modify RACE_DURATION (Lower number = Shorter race. Higher number = Longer race)

3. Adjusting Speed Gaps
If you want the gap between the winner and loser to be even bigger (or smaller), look for the speedTiers array in the startRace function

