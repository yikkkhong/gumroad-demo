# MyOS Browser Portfolio Template

A sleek, retro-inspired browser-themed portfolio template designed to showcase your work in a modern, interactive environment. This template features a macOS-style interface with terminal aesthetics, making it perfect for developers and creative professionals.


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


## 🎨 Features
- **Browser-Style Interface**: Tabbed navigation mimicking a modern web browser with customizable tabs
- **Responsive Design**: Optimized for desktop and mobile viewing with flexible grid layouts
- **Dark Theme**: Eye-friendly neon-accented interface with cyan highlights
- **Search Functionality**: Dynamic project filtering via the address bar
- **Project Showcase**: Grid-based project display with hover effects
- **Contact Form**: Built-in contact section for visitor engagement
- **Smooth Animations**: Fade-in transitions and hover effects throughout
- **Monospace Typography**: Professional Fira Code font for a developer-focused aesthetic

## 📋 Included Sections
- **Home**: Hero section with welcome message and call-to-action
- **About**: Personal introduction with skill tags (HTML5, CSS3, JavaScript, React)
- **Projects**: Grid showcase of portfolio projects with search filtering
- **Contact**: Message form for inquiries

## 🛠️ Technical Stack
- **HTML5**: Semantic markup with proper document structure
- **CSS3**: Custom properties, grid layouts, and animations
- **Vanilla JavaScript**: DOM manipulation and interactive features
- **Google Fonts**: Fira Code monospace typeface

## 🚀 Quick Start
1. Extract the template files
2. Open `index.html` in a modern web browser
3. Customize the content in each section with your own information
4. Modify colors in the `:root` CSS variables to match your brand
5. Update project cards with your portfolio pieces
6. Deploy to your web hosting


## ✏️ Customization Guide
### Update Portfolio Content
- Edit section titles and descriptions directly in the HTML
- Replace project cards with your own work in the Projects section
- Update the About section with your bio and skills

### Customize Colors
All colors are defined as CSS variables in `style.css`:
```css
:root {
    --accent: #00d2d3;        /* Main highlight color */
    --bg-dark: #2d2d35;       /* Primary background */
    --bg-light: #3a3a45;      /* Secondary background */
    --text-main: #f5f6fa;     /* Main text color */
}
```

### Add More Projects
Duplicate a project card in the HTML and update:
- The `data-name` attribute with searchable keywords
- Card header with project number
- Title and description


## 📱 Browser Support
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 💡 Tips & Tricks
- Use the search bar to test project filtering functionality
- The address bar accepts keywords to dynamically filter projects
- Tab switching automatically resets search filters
- Footer displays simulated system stats that update every 3 seconds

## 🐛 Troubleshooting
**Projects not filtering?** Make sure your search keywords match the `data-name` attribute values in the project cards.

**Styling looks off?** Clear your browser cache and hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R).

**Form not submitting?** The contact form is currently a UI prototype. Connect it to a backend service to enable email functionality.

## 📝 Notes
This is a frontend-only template. To add functionality like form submissions or dynamic content loading, you'll need to integrate with a backend service or API.