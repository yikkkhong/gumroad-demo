# 🎭 Tissue Box Showcase Template

An interactive, eye-catching showcase template featuring a crying person pulling tissues from a box. Each tissue reveals your content in a delightful, memorable way. Perfect for portfolios, product showcases, or any creative presentation!

## ✨ Features

- **Interactive Animation**: Click or drag tissues to reveal content
- **Crying Person Character**: Animated character with tears and movement
- **Smooth Transitions**: Beautiful CSS animations and effects
- **Confetti Celebration**: Special effects when all tissues are revealed
- **Fully Responsive**: Works on desktop, tablet, and mobile
- **Easy Customization**: Simple configuration for your own content
- **Sound Effects**: Subtle audio feedback (Web Audio API)
- **Reset Functionality**: Start over anytime with the reset button

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Click or drag the tissues upward to reveal content
3. Watch the crying person and enjoy the animations!

## 🎨 Customization Guide

### Changing Content

Edit the `showcaseContent` array in `script.js`:

```javascript
const showcaseContent = [
    {
        icon: "🎨",                    // Your emoji or icon
        title: "Your Title",           // Main heading
        description: "Your description" // Details
    },
    // Add more items...
];
```

### Customizing Colors

In `style.css`, search and replace these color values:

- **Primary Color**: `#667eea` (purple)
- **Secondary Color**: `#764ba2` (dark purple)
- **Accent Color**: `#ff6b9d` (pink)
- **Background**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Changing Box Label

In `index.html`, find the `.box-label` section:

```html
<div class="box-label">
    <span class="box-title">My Showcase</span>
    <span class="box-subtitle">Pull to reveal</span>
</div>
```

### Adjusting Number of Tissues

Simply add or remove objects from the `showcaseContent` array. The template automatically adjusts!

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Use Cases

- **Portfolio**: Showcase your projects and skills
- **Product Launch**: Reveal product features one by one
- **Team Introduction**: Present team members creatively
- **Service Offerings**: Display your services
- **Event Highlights**: Share event moments
- **Educational Content**: Present learning modules
- **Marketing Campaigns**: Create engaging presentations

## 🛠️ Technical Details

### Files Structure

```
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
```

### Key Technologies

- **HTML5**: Semantic structure
- **CSS3**: Advanced animations and transforms
- **Vanilla JavaScript**: No dependencies required
- **Web Audio API**: Sound effects
- **Touch Events**: Mobile support

## 💡 Tips for Best Results

1. **Use High-Quality Emojis**: They look great as icons
2. **Keep Descriptions Short**: 1-2 sentences work best
3. **Test on Mobile**: Drag interactions work beautifully on touch screens
4. **Customize Colors**: Match your brand identity
5. **Add More Tissues**: 6-10 items create the best experience

## 🎭 Animation Details

- **Person Bobbing**: Continuous gentle movement
- **Tears Falling**: Animated tear drops
- **Tissue Pull**: Smooth upward motion with rotation
- **Confetti Effect**: Celebratory particles
- **Floating Particles**: Background ambiance

## 🔧 Advanced Customization

### Changing Person's Appearance

Edit the `.person` styles in `style.css`:
- Skin tone: `.head { background: #ffd1a3; }`
- Clothing: `.body { background: #ff6b9d; }`
- Size: Adjust width/height values

### Modifying Box Design

Edit `.tissue-box` and related classes:
- Box color: `.box-top { background: ... }`
- Box size: `.tissue-box { width: ...; height: ...; }`
- Border radius for different shapes

### Custom Sound Effects

Replace the `playPullSound()` function in `script.js` with your own audio files:

```javascript
playPullSound() {
    const audio = new Audio('your-sound.mp3');
    audio.play();
}
```

## 📄 License

Free to use for personal and commercial projects. Attribution appreciated but not required!

## 🌟 Credits

Created with ❤️ for creative showcases and memorable presentations.

---

**Enjoy your interactive tissue box showcase! Make it your own and wow your audience! 🎉**
