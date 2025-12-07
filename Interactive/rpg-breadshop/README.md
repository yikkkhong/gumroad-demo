
# RPG Breadshop — Pixel Bakery Interactive Portfolio Template

This is a small single-page interactive demo that presents a pixel-art "bakery" where each bread item opens a project modal. It includes movement, collision, and a visual overlay helper to show interactable areas and obstacles.


### What You Can Do:
- ✅ Use the template for personal portfolio or client projects
- ✅ Modify and customize the template
- ✅ Create derivative works based on the template
- ✅ Use for commercial purposes (such as building a website for a client)

### What You Cannot Do:
- ❌ Resell or redistribute the template as-is
- ❌ Share the source code publicly
- ❌ Create competing products or templates using this source code
- ❌ Claim the template as your own creation
- ❌ Use without purchasing a license


## Contents
- `index.html`: main page and scene markup (breads, player, furniture, modal)
- `css/style.css`: visual styles and layout
- `js/game.js`: game logic (movement, collision, interactions, overlay helpers)

## Controls
- Move: Arrow keys or `W` `A` `S` `D`
- Interact: `Space` (or `E`) when near a bread — opens project modal
- Close modal: `Esc` or click outside
- Toggle visual overlays: `F1` or the `Show Overlays` button (top-right of the game area)
- Helper arrow: press `H` to show a temporary arrow pointing to the nearest bread (3s)

## Debug / UX Overlay
The overlay helps visualize:
- Red translucent rectangles: obstacle colliders (display-case colliders are slightly shrunk so you can stand in front)
- Yellow circles: interaction radius for each bread (configurable via `INTERACTION_DISTANCE` in `js/game.js`)
- Small yellow dots: bread centers (target points used for interaction checks)
- Blue dot: player's center
- Green arrow (when `H` pressed): points from player to nearest bread

Use the overlay to quickly see which areas block movement and where you need to stand to interact. The overlay is non-interactive (won't block clicks) and updates in real time.

## Tuning & Notes for Developers
- Interaction distance: change `INTERACTION_DISTANCE` in `js/game.js` to increase/decrease how close the player must be to interact.
- Display-case collider shrink: in `computeSceneBounds()` the code shrinks `.display-case` colliders with `const shrink = Math.min(30, h * 0.3);`. Adjust that formula to tune how far the collider retreats from the top edge.
- Bread positions: the top-row breads are positioned with inline `style="left: ...; top: ...;"` in `index.html` for quick layout adjustments. You can adjust those numbers, or implement a small layout helper in `js/game.js` for dynamic spacing.
- If a bread still feels unreachable, enable the overlay and verify the yellow interaction circle overlaps accessible floor space. If the circle is mostly inside a red obstacle, reduce the obstacle shrink or move the bread.

## Adding/Editing Items
- Each bread element has a `data-id` which maps to the `projects` object in `js/game.js`. To add a new item:
	1. Add a `.bread` element in `index.html` with a unique `data-id`.
	2. Add the project entry into the `projects` object in `js/game.js`.


## Features

- Movement & Controls: smooth WASD / arrow-key movement with diagonal normalization for consistent speed.
- Collision Detection: axis-aligned bounding-box (AABB) collisions prevent walking through furniture and display cases.
- Interaction System: proximity-based interaction circles — stand near a bread and press `Space` (or `E`) to open a modal.
- Pixel Art Assets: handcrafted CSS-based pixel-art for breads, player, and decor (no external sprites required).
- Modal Project Cards: each bread opens a small modal describing a project (title, description, tech stack).
- Visual Overlay Helper: optional canvas overlay that shows obstacle colliders, interaction radii, bread centers and a helper arrow (toggle with `F1`, arrow with `H`).
- Small footprint: no build step required — pure HTML/CSS/JS and works from a static server or file.

## Customization

You can tune the experience quickly by editing a few values and attributes in the codebase.

- Interaction distance
	- File: `js/game.js`
	- Variable: `INTERACTION_DISTANCE` — increase to require the player to be further from the bread to trigger, decrease to require being closer.
	- Example: `const INTERACTION_DISTANCE = 80;`

- Player speed
	- File: `js/game.js`
	- Variable: `SPEED` — controls how quickly the player moves.

- Display-case collider shrink
	- File: `js/game.js` in `computeSceneBounds()`
	- Code: `const shrink = Math.min(30, h * 0.3);` — adjust the `30` or the `0.3` multiplier to move the collider's top inward so players can stand closer to the front.
	- To make a case fully non-blocking, remove the `.obstacle` class from that element in `index.html`.

- Bread placement
	- File: `index.html`
	- Breads are positioned with inline `style="left: ...; top: ...;"` attributes for quick layout. Edit those numbers to move items visually.
	- Optionally: implement a small JS layout helper to evenly space breads on a row (I can add this if you'd like).

- Per-item collider tuning (optional)
	- Pattern: add a `data-collider-shrink` attribute to an obstacle element and read it in `computeSceneBounds()` to override the global shrink value per-element.
	- Example markup: `<div class="obstacle display-case" data-collider-shrink="18" id="case-left"></div>`
	- Example code (snippet to add):

```js
let shrink = Math.min(30, h * 0.3);
if (el.dataset && el.dataset.colliderShrink) {
	const v = Number(el.dataset.colliderShrink);
	if (!Number.isNaN(v)) shrink = v;
}
y += shrink;
h -= shrink;
```

- Overlay behavior & styling
	- File: `css/style.css` and `js/game.js`
	- You can change overlay colors, opacity and whether it appears by default in `setupOverlay()` (set `overlayVisible = true` to show by default).

- Projects data
	- File: `js/game.js`
	- The `projects` object maps `data-id` values from `index.html` to titles, descriptions and tech stacks. Add or edit entries there to change modal content.

If you'd like, I can add a small on-screen editor (visible when overlays are enabled) that lets you tweak `INTERACTION_DISTANCE`, `SPEED`, and per-obstacle shrink values live and immediately see the overlay update. Want me to add that next?

