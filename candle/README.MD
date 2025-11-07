# Commercial License Agreement

## Creative Candle Showcase Template 

This template is available for purchase and commercial use under the following terms:

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

Images are used for preview purposes only and are **not included in the final download package**.

## License
This template is free to use for personal and commercial purposes. You can modify and distribute it as you see fit.

## Support
If you have any questions or need assistance, please feel free to ask in the comments section below.

## Creative Candle Showcase
An interactive web experience where users can light a candle to reveal creative posts in the smoke. This template provides a unique and engaging way to showcase content.

## Features
Interactive Candle: Realistic candle with flickering flame animation

- **Draggable Tools**:
    - Torch to light the candle
    - Water bucket to extinguish the flame

- **Animated Smoke**: Curved smoke effects that drift to the right

- **Post Display**: Content appears within the smoke after 3 seconds

- **Modal View**: Click on smoke to view full post details

- **Post Cycling**: Extinguish and relight to view next post

- **Responsive Design**: Works on both desktop and mobile devices

## File Structure:
creative-candle-showcase/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
└── README.md           # This file

## Installation
1. Download or clone the project files
2. Ensure all three files (index.html, styles.css, script.js) and one folder (images) are in the same directory
3. Open index.html in a web browser

No additional dependencies or build process required!

## How to Use
### Basic Interaction
- Light the Candle: Drag the torch to the candle wick
- Wait for Smoke: After 3 seconds, smoke will appear with a post preview
- View Post: Click on the smoke to read the full post in a modal
- Extinguish: Drag the water bucket to the flame to put it out
- Repeat: Relight to view the next post in sequence

### Customizing Content
- To add your own posts, modify the posts array in script.js:
- Put images in images folder

```javascript
const posts = [
    {
        title: "Your Post Title",
        excerpt: "Brief description of your post",
        image: "Image description or URL",
        content: "Full content of your post here..."
    },
    // Add more posts as needed
];
```

### Styling Customization
- Key CSS variables you can modify in styles.css:
- Colors: Update color scheme in the body and component styles
- Sizes: Adjust candle, smoke, and post container dimensions
- Animations: Modify timing and effects in the @keyframes sections

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Mobile Support
- Touch events for dragging tools
- Responsive layout adapts to screen size
- Gesture-friendly interface

### Technical Details
- Pure HTML, CSS, and JavaScript (no frameworks required)
- CSS animations for smooth performance
- Event delegation for efficient DOM handling
- Modular code structure for easy maintenance