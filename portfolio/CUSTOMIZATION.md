# 🎨 Customization Cheat Sheet

Quick reference for common customizations.

---

## 🎨 Colors

**File**: `css/style.css` (Lines 2-12)

```css
:root {
    --primary-color: #6366f1;      /* Main buttons, accents */
    --secondary-color: #8b5cf6;    /* Hover states */
    --accent-color: #ec4899;       /* Special highlights */
    --dark-bg: #0f172a;            /* Section backgrounds */
    --darker-bg: #020617;          /* Page background */
    --light-text: #f1f5f9;         /* Main text */
    --gray-text: #94a3b8;          /* Secondary text */
    --card-bg: #1e293b;            /* Card backgrounds */
}
```

**Popular Color Schemes**:
```css
/* Blue Professional */
--primary-color: #3b82f6;
--secondary-color: #2563eb;

/* Purple Creative */
--primary-color: #a855f7;
--secondary-color: #9333ea;

/* Green Tech */
--primary-color: #10b981;
--secondary-color: #059669;

/* Orange Bold */
--primary-color: #f97316;
--secondary-color: #ea580c;
```

---

## 🪐 Orbit Settings

### Speed
**File**: `css/style.css` (Line 266)
```css
animation: rotateOrbit 60s linear infinite;
                      ↑
                    Change this
```
- Slower: `90s` or `120s`
- Faster: `30s` or `45s`

### Size
**File**: `css/style.css` (Lines 258-259)
```css
.orbit-ring {
    width: 800px;   /* Orbit diameter */
    height: 800px;
}
```

### Tilt Angle (Möbius Effect)
**File**: `css/style.css` (Line 282)
```css
transform: translate(-50%, -50%) rotateX(75deg);
                                         ↑
                                    Change this (0-90deg)
```
- More flat: `60deg`
- More tilted: `85deg`

**IMPORTANT**: If you change this angle, also update the card counter-rotation:
```css
/* Line 311-320: Change -75deg to match (use negative value) */
rotateX(-75deg)  /* Must match orbit angle but negative */
```

### Card Size
**File**: `css/style.css` (Lines 305-306)
```css
.orbit-item {
    width: 200px;   /* Card width (portrait) */
    height: 280px;  /* Card height (portrait) */
}
```
**Tip**: Keep aspect ratio around 5:7 for portrait orientation.

---

## 📝 Text Content

### Hero Title
**File**: `index.html` (Lines 26-29)
```html
<h1 class="hero-title">
    <span class="title-line">Creative</span>
    <span class="title-line">Portfolio</span>
</h1>
```

### Hero Subtitle
**File**: `index.html` (Line 30)
```html
<p class="hero-subtitle">Showcasing Excellence in Design & Innovation</p>
```

### Section Titles
**File**: `index.html`
```html
<!-- Line 39 -->
<h2 class="section-title">Featured Works</h2>

<!-- Line 164 -->
<h2 class="section-title">About Me</h2>

<!-- Line 192 -->
<h2 class="section-title">Get In Touch</h2>
```

---

## 🖼️ Images

### Project Images (Orbit)
**File**: `index.html` (Lines 50-149)
```html
<img src="images/project1.jpg" alt="Project 1">
              ↑                      ↑
         Change path          Change description
```

### About Image
**File**: `index.html` (Line 180)
```html
<img src="images/about.jpg" alt="About Me">
```

### Gallery Images
**File**: `gallery.html` (Lines 48-207)
```html
<img src="images/project1.jpg" alt="Project 1">
```

---

## 🏷️ Project Info

### Orbit Projects
**File**: `index.html` (Lines 50-149)
```html
<div class="project-overlay">
    <h4>Project Title 1</h4>        ← Project name
    <p>Design & Development</p>     ← Category
</div>
```

### Gallery Projects
**File**: `gallery.html` (Lines 48-207)
```html
<div class="gallery-item" data-category="design">  ← Filter category
    <div class="gallery-card">
        <img src="images/project1.jpg" alt="Project 1">
        <div class="gallery-overlay">
            <h3>Project Title 1</h3>              ← Project name
            <p>Design & Development</p>           ← Description
        </div>
    </div>
</div>
```

**Available Categories**:
- `design`
- `development`
- `branding`
- `photography`
- `illustration`

---

## 👤 Personal Info

### Name/Logo
**Files**: `index.html` & `gallery.html` (Line 13)
```html
<div class="logo">Your Name</div>
```

### Contact Info
**File**: `index.html` (Lines 199-217)
```html
<p>your.email@example.com</p>
<p>+1 (555) 123-4567</p>
<p>Your City, Country</p>
```

### About Bio
**File**: `index.html` (Lines 166-173)
```html
<p class="about-text">
    Your bio text here...
</p>
```

### Skills
**File**: `index.html` (Lines 174-180)
```html
<span class="skill-tag">UI/UX Design</span>
<span class="skill-tag">Web Development</span>
<!-- Add more as needed -->
```

### Social Links
**Files**: `index.html` & `gallery.html` (Footer)
```html
<a href="#" class="social-link">LinkedIn</a>
<a href="#" class="social-link">Twitter</a>
<a href="#" class="social-link">Instagram</a>
<a href="#" class="social-link">Behance</a>
```

---

## 🔘 Buttons

### View More Button
**File**: `index.html` (Line 154)
```html
<a href="gallery.html" class="view-more-btn">
    <span>View Full Gallery</span>
```

### Button Colors
**File**: `css/style.css` (Line 388)
```css
.view-more-btn {
    background: var(--gradient-1);  ← Change gradient
}
```

---

## 📱 Responsive Breakpoints

**File**: `css/style.css` (Lines 768-807)

### Tablet (max-width: 968px)
```css
@media (max-width: 968px) {
    .hero-title { font-size: 3.5rem; }
    .orbit-ring { width: 600px; height: 600px; }
}
```

### Mobile (max-width: 640px)
```css
@media (max-width: 640px) {
    .hero-title { font-size: 2.5rem; }
    .orbit-ring { width: 400px; height: 400px; }
}
```

---

## 🎭 Animations

### Orbit Rotation
**File**: `css/style.css` (Lines 268-271)
```css
@keyframes rotateOrbit {
    from { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(0deg); }
    to { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(360deg); }
}
```

### Fade In Speed
**File**: `css/style.css` (Lines 150-158)
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

---

## 🔤 Fonts

### Change Font Family
**File**: `css/style.css` (Line 24)
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

**Popular Alternatives**:
```css
/* Modern Sans */
font-family: 'Inter', 'Helvetica Neue', sans-serif;

/* Classic Serif */
font-family: 'Georgia', 'Times New Roman', serif;

/* Monospace */
font-family: 'Courier New', 'Courier', monospace;
```

**Using Google Fonts**:
1. Add to `<head>` in HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
```

2. Update CSS:
```css
font-family: 'Poppins', sans-serif;
```

---

## 🎯 Quick Tweaks

### Navbar Transparency
**File**: `css/style.css` (Line 46)
```css
background: rgba(15, 23, 42, 0.8);  ← Change 0.8 (0-1)
```

### Card Border Radius
**File**: `css/style.css` (Line 330)
```css
border-radius: 15px;  ← Change roundness
```

### Shadow Intensity
**File**: `css/style.css` (Line 331)
```css
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);  ← Change 0.5 (0-1)
```

### Hover Scale Effect
**File**: `css/style.css` (Line 336)
```css
transform: scale(1.05);  ← Change scale (1.0-1.2)
```

---

## 💡 Pro Tips

1. **Test After Each Change**: Make one change at a time and refresh
2. **Use Browser DevTools**: Right-click → Inspect to test live
3. **Keep Backups**: Save original files before major changes
4. **Mobile First**: Always test on mobile after desktop changes
5. **Consistency**: Keep colors and spacing consistent throughout

---

## 🔍 Finding Elements

Use browser DevTools (F12) to:
1. Right-click any element → Inspect
2. See the CSS class name
3. Search for that class in `style.css`
4. Make your changes

---

**Happy Customizing! 🎨**
