# AI Company Landing Page Template

A modern, responsive landing page for an AI platform with interactive animations and glassmorphism design.


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


## Features

- **Interactive Particles**: Canvas-based particle animation with mouse interaction
- **Typing Effect**: Animated text cycling through multiple phrases
- **Scroll Animations**: Elements reveal and fade in as you scroll
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- **Smooth Interactions**: Hover effects, navbar scroll transitions, animated counters

## File Structure

```
ai-company/
├── index.html       # HTML markup
├── style.css        # All styling and animations
├── script.js        # JavaScript interactivity
└── README.md        # Documentation
```

## Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --accent-primary: #00f2ff;    /* Main color (cyan) */
    --accent-secondary: #7000ff;  /* Secondary color (purple) */
    --bg-color: #050507;          /* Background */
    --text-main: #ffffff;         /* Text color */
}
```

### Fonts
```css
:root {
    --font-main: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'Fira Code', monospace;
}
```

### Animation Speed
In `style.css`:
```css
:root {
    --transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

In `script.js`, adjust timing values:
```javascript
let typeSpeed = 100;           /* Typing speed (ms per character) */
const mouse = { radius: 150 }; /* Particle interaction radius */
```

### Content
Edit text, headings, and links directly in `index.html`. The structure includes:
- Hero section with CTA buttons
- Features grid (3 cards)
- Code example section
- Stats section with counters
- Call-to-action box
- Footer with links

## Browser Support

Chrome, Firefox, Safari, Edge (all modern versions)

## Quick Start

1. Replace "CompanyName" with your company name in `index.html`
2. Update colors in `style.css` CSS variables
3. Modify text content in `index.html`
4. Open in a browser or deploy to your server

## Notes

- Particle animation is GPU-accelerated for smooth performance
- Mobile navigation hides links (shows hamburger menu placeholder)
- All animations use CSS transitions for best performance
- Fully self-contained — no external libraries required
