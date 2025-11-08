# Commercial License Agreement

# Basketball Portfolio Unlocker

An interactive basketball game where you can unlock a portfolio by shooting hoops! Built with vanilla JavaScript, HTML, and CSS.

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

## Image Credits
All demo images used in this template are from [Pexels](https://www.pexels.com)  
and are free to use under the Pexels License: https://www.pexels.com/license  

> **Note**: Demo images are included for preview purposes only. Please replace them with your own images before using this template in production.

## Features
- 🏀 Realistic basketball physics with gravity, friction, and bounce
- 🎯 Angry Birds-style drag and shoot mechanics
- 🎨 Smooth animations and visual feedback
- 🎉 Confetti celebration when scoring a basket
- 📱 Responsive design that works on desktop and mobile devices
- 🔄 Reset functionality to start over

## How to Play

1. **Drag** the basketball to aim
2. **Release** to shoot
3. Score a basket to **unlock the portfolio**
4. Click "Reset Ball" to try again

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript (ES6+)
- No external dependencies

## Customization

You can easily customize the game by modifying these variables in `script.js`:

```javascript
// Physics constants
const GRAVITY = 0.4;          // Adjust gravity strength
const FRICTION = 0.98;        // Adjust friction (0.9-1.0)
const BOUNCE = 0.7;           // Adjust bounciness (0.0-1.0)
const MAX_DRAG_DISTANCE = 200; // Maximum drag distance for power
```

## Portfolio Customization

Customize the portfolio section in `index.html` to showcase your personal or client information:

### 1. Update About Section
```html
<div class="about">
    <h2>About Me</h2>
    <p>Your professional introduction goes here. Highlight your experience, skills, and what makes you unique.</p>
</div>
```

### 2. Update Skills
Add or modify skills in the skills section:
```html
<div class="skills">
    <h2>Skills</h2>
    <ul>
        <li>Web Development</li>
        <li>UI/UX Design</li>
        <li>Mobile Development</li>
        <li>Project Management</li>
        <!-- Add more skills as needed -->
    </ul>
</div>
```

### 3. Update Projects
Add your projects to the project grid:
```html
<div class="project-grid">
    <div class="project">
        <h3>Project Title</h3>
        <p>Project description and key features.</p>
        <a href="#" class="project-link">View Project</a>
    </div>
    <!-- Add more project items as needed -->
</div>
```

### 4. Styling
Customize the look in `style.css`:
```css
/* Portfolio section */
.portfolio-section {
    background: #ffffff;
    color: #333333;
    /* Add your custom styles */
}

/* Project cards */
.project {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    transition: transform 0.3s ease;
}

.project:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
```

### 5. Add Social Links
Add social media links to your profile:
```html
<div class="social-links">
    <a href="#" class="social-icon">LinkedIn</a>
    <a href="#" class="social-icon">GitHub</a>
    <a href="#" class="social-icon">Twitter</a>
</div>
```

## Customizing Project Images
### How to Change Project Images

1. **Prepare Your Images**
   - Recommended size: At least 600x400px for optimal quality
   - Supported formats: JPG, PNG, or WebP

2. **Add Images to Your Project**
   - Place your images in the `images` folder
   - You can replace the existing images or add new ones

3. **Update Image References**
   In `index.html`, update the image sources in the project cards:
   ```html
   <div class="project">
       <img src="images/your-image.jpg" alt="Project Title">
       <div class="project-content">
           <h3>Your Project Title</h3>
           <p>Your project description here.</p>
           <a href="#" class="project-link">View Project</a>
       </div>
   </div>
   ```

### Image Styling (Optional)

You can customize how images appear in `style.css`:
```css
.project img {
    width: 100%;
    height: 200px; /* Adjust height as needed */
    object-fit: cover; /* This ensures images cover the area while maintaining aspect ratio */
    object-position: center; /* Centers the image within the container */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome for Android

## Acknowledgments

- Inspired by classic basketball games
- Built with ❤️ for fun and learning