## Image Credits
All demo images used in this template are from [Pexels](https://www.pexels.com)  
and are free to use under the Pexels License: https://www.pexels.com/license  

Images are used for preview purposes only and are **not included in the final download package**.


# 🪐 Saturn Orbit Portfolio Template

A stunning, modern portfolio template featuring a unique Saturn-like orbit animation for showcasing your best work. Built with pure HTML, CSS, and JavaScript - no frameworks required!

## ✨ Features

- **Interactive Möbius Strip Orbit** - Showcase up to 10 projects in a continuous looping 3D orbit
- **Drag & Rotate** - Users can manually control the orbit rotation
- **Vertical Portrait Cards** - Each project card displays in portrait orientation and remains upright
- **Always Upright** - Photos stay correctly oriented throughout the entire rotation
- **Smooth Animations** - Beautiful transitions and visual effects throughout
- **Full Gallery Page** - Display all your projects with category filtering
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Modern Design** - Clean, professional aesthetic with gradient accents
- **Easy to Customize** - Simple structure, well-commented code

## 📁 File Structure

```
portfolio/
│
├── index.html              # Main homepage with Saturn orbit
├── gallery.html            # Full gallery page with filters
│
├── css/
│   └── style.css          # All styles and animations
│
├── js/
│   ├── script.js          # Homepage interactions and orbit controls
│   └── gallery.js         # Gallery filtering and animations
│
└── images/                # Your project images go here
    ├── project1.jpg
    ├── project2.jpg
    ├── ...
    ├── project10.jpg
    ├── project11.jpg
    └── about.jpg
```

## 🚀 Quick Start Guide

### Step 1: Add Your Images

1. Place your project images in the `images/` folder
2. Recommended image specifications:
   - **Project Images**: 800x1200px (2:3 portrait ratio) - vertical orientation
   - **About Image**: 800x800px (square)
   - Format: JPG or PNG
   - Optimized file size: < 500KB each

### Step 2: Customize Content

#### Update Personal Information

Open `index.html` and `gallery.html` and replace:

```html
<!-- Line 13 in both files -->
<div class="logo">Your Name</div>

<!-- Contact section in index.html -->
<p>your.email@example.com</p>
<p>+1 (555) 123-4567</p>
<p>Your City, Country</p>

<!-- Footer in both files -->
<p>&copy; 2024 Your Name. All rights reserved.</p>
```

#### Update Project Information

In `index.html`, find each `.orbit-item` and update:

```html
<div class="orbit-item" data-index="0">
    <div class="project-card">
        <img src="images/project1.jpg" alt="Project 1">
        <div class="project-overlay">
            <h4>Your Project Title</h4>
            <p>Your Project Category</p>
        </div>
    </div>
</div>
```

#### Update About Section

In `index.html`, find the `#about` section and customize:

```html
<p class="about-text">
    Write your bio here...
</p>

<!-- Update skill tags -->
<span class="skill-tag">Your Skill 1</span>
<span class="skill-tag">Your Skill 2</span>
```

### Step 3: Customize Gallery

In `gallery.html`, update each `.gallery-item`:

```html
<div class="gallery-item" data-category="design">
    <div class="gallery-card">
        <img src="images/project1.jpg" alt="Project 1">
        <div class="gallery-overlay">
            <h3>Your Project Title</h3>
            <p>Your Project Description</p>
            <button class="view-project-btn">View Details</button>
        </div>
    </div>
</div>
```

**Available Categories:**
- `design`
- `development`
- `branding`
- `photography`
- `illustration`

You can add more categories by:
1. Adding a new filter button in `gallery.html`
2. Using the category name in `data-category` attribute

### Step 4: Customize Colors

Open `css/style.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #6366f1;      /* Main accent color */
    --secondary-color: #8b5cf6;    /* Secondary accent */
    --accent-color: #ec4899;       /* Additional accent */
    --dark-bg: #0f172a;            /* Dark background */
    --darker-bg: #020617;          /* Darker background */
    --light-text: #f1f5f9;         /* Light text color */
    --gray-text: #94a3b8;          /* Gray text color */
    --card-bg: #1e293b;            /* Card background */
}
```

### Step 5: Adjust Orbit Settings

To change the orbit animation speed, edit `css/style.css`:

```css
/* Line 266 - Change 60s to your preferred duration */
animation: rotateOrbit 60s linear infinite;
```

To adjust the number of projects in the orbit:
1. Add/remove `.orbit-item` elements in `index.html`
2. Update the `data-index` attribute (0-9 for 10 items)
3. Adjust positioning in `css/style.css` (lines 280-289)

## 🎨 Customization Tips

### Change Orbit Size

In `css/style.css`, find `.orbit-ring`:

```css
.orbit-ring {
    width: 800px;    /* Change orbit diameter */
    height: 800px;
}
```

### Adjust 3D Perspective

Modify the tilt angle of the orbit (affects the Möbius strip effect):

```css
.orbit-ring {
    transform: translate(-50%, -50%) rotateX(75deg);  /* Change 75deg */
}
```

**Note**: The cards use `rotateX(-75deg)` to counter-rotate and stay upright. If you change the orbit angle, update the card rotation to match (use negative value).

### Modify Card Sizes

Change project card dimensions:

```css
.orbit-item {
    width: 200px;    /* Card width (portrait) */
    height: 280px;   /* Card height (portrait) */
}
```

**Tip**: Keep the aspect ratio around 5:7 for best portrait display.

### Update Social Links

In both HTML files, find the footer section:

```html
<div class="social-links">
    <a href="https://linkedin.com/in/yourprofile" class="social-link">LinkedIn</a>
    <a href="https://twitter.com/yourhandle" class="social-link">Twitter</a>
    <a href="https://instagram.com/yourhandle" class="social-link">Instagram</a>
    <a href="https://behance.net/yourprofile" class="social-link">Behance</a>
</div>
```

## 📱 Responsive Breakpoints

The template includes responsive design for:
- **Desktop**: > 968px
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

Orbit automatically adjusts size on smaller screens.

## 🔧 Advanced Customization

### Add More Projects to Gallery

1. Copy an existing `.gallery-item` block in `gallery.html`
2. Update the image source and content
3. Set the appropriate `data-category`

### Implement Contact Form

The contact form in `index.html` has a basic handler in `js/script.js`. To make it functional:

1. **Using FormSpree** (Easy):
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
   ```

2. **Using EmailJS** (Free):
   - Sign up at emailjs.com
   - Add their SDK
   - Update the form handler in `js/script.js`

3. **Using Your Backend**:
   - Modify the form submit handler in `js/script.js`
   - Send data to your server endpoint

### Add Project Detail Pages

1. Create individual HTML files for each project (e.g., `project1.html`)
2. Update the project card links:
   ```html
   <a href="project1.html" class="project-card">
   ```

### Enable Image Lazy Loading

Images are already set up for lazy loading. To use it:

1. Change `src` to `data-src` in your image tags:
   ```html
   <img data-src="images/project1.jpg" alt="Project 1">
   ```

2. Add a placeholder:
   ```html
   <img src="images/placeholder.jpg" data-src="images/project1.jpg" alt="Project 1">
   ```

## 🌐 Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be live at `username.github.io/repository-name`

### Option 2: Netlify (Free)

1. Sign up at netlify.com
2. Drag and drop your portfolio folder
3. Your site is live instantly!

### Option 3: Vercel (Free)

1. Sign up at vercel.com
2. Import your GitHub repository
3. Deploy with one click

### Option 4: Traditional Web Hosting

1. Upload all files via FTP
2. Ensure file structure is maintained
3. Access via your domain

## 🎯 SEO Optimization

Add these meta tags to both HTML files in the `<head>` section:

```html
<meta name="description" content="Your portfolio description">
<meta name="keywords" content="your, keywords, here">
<meta name="author" content="Your Name">

<!-- Open Graph for social sharing -->
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Your portfolio description">
<meta property="og:image" content="images/og-image.jpg">
<meta property="og:url" content="https://yourwebsite.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Name - Portfolio">
<meta name="twitter:description" content="Your portfolio description">
<meta name="twitter:image" content="images/twitter-image.jpg">
```

## 🐛 Troubleshooting

### Orbit Not Rotating
- Check that `js/script.js` is properly linked
- Ensure JavaScript is enabled in browser
- Check browser console for errors

### Images Not Loading
- Verify image paths are correct
- Check that images are in the `images/` folder
- Ensure image file names match exactly (case-sensitive)

### Drag Not Working
- Clear browser cache
- Check that JavaScript is not blocked
- Try in a different browser

### Mobile Display Issues
- Ensure viewport meta tag is present
- Check that CSS file is loading
- Test in different mobile browsers

## 📄 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera
- ⚠️ IE11 (limited support)

## 📝 License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## 💡 Tips for Best Results

1. **Image Quality**: Use high-quality, professionally shot images
2. **Consistency**: Keep a consistent style across all project images
3. **Loading Speed**: Optimize images before uploading (use TinyPNG or similar)
4. **Content**: Write clear, concise project descriptions
5. **Testing**: Test on multiple devices and browsers before publishing
6. **Updates**: Keep your portfolio updated with your latest work

## 🆘 Support

If you encounter any issues or have questions:

1. Check this README thoroughly
2. Review the code comments in the files
3. Test in different browsers
4. Check browser console for error messages

## 🎉 You're All Set!

Your Saturn Orbit Portfolio is ready to impress! Remember to:

- ✅ Replace all placeholder content
- ✅ Add your own images
- ✅ Customize colors to match your brand
- ✅ Test on multiple devices
- ✅ Deploy to your hosting platform

**Good luck with your portfolio! 🚀**

---

*Created with ❤️ for creative professionals*
