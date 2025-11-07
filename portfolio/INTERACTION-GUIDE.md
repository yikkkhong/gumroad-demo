# 🎮 Portfolio Interaction Guide

## New Interactive Features

Your portfolio now has enhanced interactivity with scroll-based rotation and clickable project cards.

---

## 🖱️ How to Use

### 1. **Scroll to Rotate** (Center Circle)

**Location**: The center circle that says "Scroll to Rotate"

**How it works**:
1. Hover your mouse over the center circle
2. The circle will glow and scale up slightly
3. Use your mouse wheel to scroll up/down
4. The orbit will rotate based on your scroll direction
5. Auto-rotation pauses while you scroll
6. After 2 seconds of no scrolling, auto-rotation resumes

**Visual Feedback**:
- ✨ Circle glows brighter on hover
- 🔄 Orbit rotates smoothly with scroll
- ⏸️ Auto-rotation pauses during interaction

---

### 2. **Click Projects** (Photo Cards)

**Location**: Any of the 10 project cards in the orbit

**How it works**:
1. Hover over any project card
2. Card scales up and shows project details
3. Click the card to open project details
4. Currently shows an alert (customize this!)

**Visual Feedback**:
- 🔍 Card scales to 108% on hover
- 💫 Enhanced glow effect
- 👆 Cursor changes to pointer
- 📉 Slight scale down on click (active state)

---

## 🛠️ Customization Options

### Change Scroll Sensitivity

**File**: `js/script.js` (Line 41)

```javascript
const scrollSpeed = 0.5; // Adjust this value
```

- **Lower value** (0.2-0.4): Slower, more precise rotation
- **Higher value** (0.6-1.0): Faster rotation

---

### Change Auto-Resume Delay

**File**: `js/script.js` (Line 49)

```javascript
this.scrollTimeout = setTimeout(() => {
    this.orbitRing.style.animationPlayState = 'running';
}, 2000); // Change 2000 (milliseconds)
```

- 1000 = 1 second
- 2000 = 2 seconds (current)
- 3000 = 3 seconds

---

### Customize Project Click Action

**File**: `js/script.js` (Lines 167-177)

Choose one of these options:

#### **Option 1: Navigate to Project Page**
```javascript
window.location.href = `project-${index + 1}.html`;
```

#### **Option 2: Open in New Tab**
```javascript
window.open(`project-${index + 1}.html`, '_blank');
```

#### **Option 3: Go to Gallery**
```javascript
window.location.href = 'gallery.html';
```

#### **Option 4: Open Modal** (requires modal implementation)
```javascript
openProjectModal(projectTitle, projectCategory);
```

#### **Option 5: Scroll to Section**
```javascript
document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
```

---

## 📄 Creating Project Detail Pages

If you want individual project pages:

### 1. Create Project Files

Create files named:
- `project-1.html`
- `project-2.html`
- `project-3.html`
- etc.

### 2. Use This Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project 1 - Your Name</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">Your Name</div>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="gallery.html" class="nav-link">Gallery</a></li>
            </ul>
        </div>
    </nav>

    <!-- Project Content -->
    <section style="padding: 8rem 2rem;">
        <div class="container">
            <h1>Project Title</h1>
            <p>Project description and details...</p>
            
            <!-- Add your project images, videos, descriptions -->
            
            <a href="index.html" class="view-more-btn">
                <span>← Back to Home</span>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <!-- Copy footer from index.html -->
    </footer>
</body>
</html>
```

### 3. Update JavaScript

Uncomment this line in `js/script.js`:
```javascript
window.location.href = `project-${index + 1}.html`;
```

---

## 🎨 Styling the Center Circle

### Change Center Circle Size

**File**: `css/style.css` (Lines 250-251)

```css
.orbit-center {
    width: 200px;   /* Change size */
    height: 200px;
}
```

### Change Hover Effect

**File**: `css/style.css` (Lines 264-268)

```css
.orbit-center:hover {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%);
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 80px rgba(99, 102, 241, 0.5);
}
```

### Change Center Text

**File**: `index.html` (Lines 48-49)

```html
<h3>Scroll to Rotate</h3>
<p>Hover & Scroll Here</p>
```

---

## 🔧 Advanced Features

### Add Click Counter

Track how many times projects are clicked:

```javascript
let clickCount = 0;

card.addEventListener('click', function(e) {
    clickCount++;
    console.log(`Project clicked ${clickCount} times`);
    // Your navigation code here
});
```

### Add Analytics

Track user interactions:

```javascript
card.addEventListener('click', function(e) {
    // Google Analytics example
    gtag('event', 'project_click', {
        'project_name': projectTitle,
        'project_index': index
    });
    
    // Your navigation code here
});
```

### Disable Auto-Rotation

If you want manual control only:

**File**: `css/style.css` (Line 292)

```css
.orbit-ring {
    /* Remove or comment out this line: */
    /* animation: rotateOrbit 60s linear infinite; */
}
```

### Add Keyboard Controls

Add arrow key navigation:

```javascript
document.addEventListener('keydown', (e) => {
    const orbitRing = document.getElementById('orbitRing');
    const currentRotation = parseFloat(orbitRing.style.transform.match(/rotateZ\(([^)]+)deg\)/)?.[1] || 0);
    
    if (e.key === 'ArrowLeft') {
        orbitRing.style.transform = `translate(-50%, -50%) rotateX(75deg) rotateZ(${currentRotation - 36}deg)`;
    } else if (e.key === 'ArrowRight') {
        orbitRing.style.transform = `translate(-50%, -50%) rotateX(75deg) rotateZ(${currentRotation + 36}deg)`;
    }
});
```

---

## 📱 Mobile Behavior

### Touch Scroll

On mobile devices:
- Touch and hold the center circle
- Swipe up/down to rotate
- Works the same as mouse scroll

### Touch Click

- Tap any project card to open details
- First tap shows overlay
- Second tap opens project

---

## 🐛 Troubleshooting

### Scroll Not Working

**Problem**: Scroll doesn't rotate orbit

**Solutions**:
1. Make sure you're hovering over the center circle
2. Check browser console for errors
3. Verify `js/script.js` is loaded
4. Try a different browser

### Projects Not Clickable

**Problem**: Clicking cards does nothing

**Solutions**:
1. Check browser console for errors
2. Verify alert is showing (default behavior)
3. Make sure JavaScript is enabled
4. Check if project detail pages exist (if using navigation)

### Auto-Rotation Not Resuming

**Problem**: Orbit stays paused after scrolling

**Solutions**:
1. Wait the full 2 seconds
2. Check console for errors
3. Refresh the page
4. Clear browser cache

---

## 💡 Best Practices

### 1. **Clear Call-to-Action**
Make it obvious that:
- Center circle is scrollable
- Cards are clickable

### 2. **Provide Feedback**
- Visual changes on hover
- Smooth transitions
- Clear active states

### 3. **Mobile Optimization**
- Test touch interactions
- Ensure cards are large enough to tap
- Consider adding touch instructions

### 4. **Performance**
- Keep scroll sensitivity moderate
- Don't add too many event listeners
- Optimize images for fast loading

---

## 📊 User Flow

```
User lands on page
    ↓
Sees orbit auto-rotating
    ↓
Hovers over center circle
    ↓
Scrolls to explore projects
    ↓
Sees interesting project
    ↓
Clicks project card
    ↓
Views project details
    ↓
Returns to portfolio or continues browsing
```

---

## 🎯 Summary

**New Features**:
- ✅ Scroll-based orbit rotation (center circle)
- ✅ Clickable project cards
- ✅ Auto-rotation pause/resume
- ✅ Enhanced hover effects
- ✅ Better visual feedback

**Removed Features**:
- ❌ Drag-to-rotate (replaced with scroll)

**Benefits**:
- 🎨 More intuitive interaction
- 📱 Better mobile experience
- 🖱️ Clearer user intent (scroll vs click)
- ⚡ Smoother performance

---

*Your portfolio is now more interactive and user-friendly!*
