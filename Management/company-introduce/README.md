# Company Introduce Website Template

A small, reusable template for company introduction websites. This repository contains a minimal static demo (HTML, CSS, JS) used for layout and styling experiments. The current content uses an investment company ('Invest' / Apex Capital) as example content — replace copy, logos, and images for your company.


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


**Demo background image**
- **CSS line**: Use the following line in your stylesheet to set a demo background image:

```
background-image: url('images/image.png'); /* Local demo image: place your image at images/image.png or change this path */
```

Note: The template can use a local demo image placed at `images/image.png`. If you prefer a different filename or folder, update the path in `style.css` accordingly. Replace demo images with properly licensed assets before releasing to production.

**Files in this folder**
- `index.html` — demo HTML page
- `style.css` — styles (place the `background-image` line here)
- `script.js` — demo JavaScript
- `README.md` — this file

**Run / Preview**
- Open `index.html` in your browser to use the website

**Notes**
- Keep external demo assets out of production bundles.
- If you need help replacing the demo image with a licensed asset or adding a fallback color, ask and I can update `style.css`.

### Features
- **Responsive layout**: Mobile-first CSS with a flexible grid for hero, cards, and footer.
- **Hero section**: Large header with CTA buttons and overlay for readable text on images.
- **Navigation**: Sticky/top navigation and smooth anchor links to page sections.
- **Stats / counters**: Simple numeric highlights to showcase metrics.
- **Contact form**: Lightweight HTML form (no backend) for demo; replace with your form handler.

### Customization (Quick Tips)
- **Change text & copy**: Edit `index.html` — headings, paragraphs, and button labels are plain HTML.
- **Replace logo**: Swap the `.logo` content in `index.html` or add an image tag there.
- **Swap the demo background image**: Edit `style.css` and replace the demo `background-image` URL. Add a fallback color and sensible background properties, for example:

```css
:root{--brand:#0b66ff;--bg:#f5f7fb}
.hero{background-image: url('images/image.png'); /* local demo image */
	background-size: cover;
	background-position: center;
	background-color: var(--bg); /* fallback color */
}
```

- **Change colors**: Update the `--brand` and other CSS variables in `style.css` to match your company palette.
- **Fonts**: Edit or remove the Google Fonts link in `index.html` to use your preferred fonts or local ones.
- **Form handling**: Replace the demo form action with your endpoint or integrate a service (Formspree, Netlify Forms, etc.).
