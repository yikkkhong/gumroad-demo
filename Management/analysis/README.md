# Professional Analysis Website Template

## 📋 Overview

Professional Analysis Website Template is a professional, high-performance front-end dashboard template designed for data analysis firms, SaaS monitoring tools, and AI/ML processing interfaces.

This template focuses on information density, ergonomic design (Dark/Light modes) for long working hours, and real-time performance visualization. It uses a simulated "Analysis Engine" in the Javascript to mimic live data processing without needing a backend.

---

## ✨ Key Features

- **Zero Dependencies**: Built entirely with native HTML5, CSS3, and Vanilla JavaScript. No frameworks (React/Vue) or heavy charting libraries required.

- **Dual Theme System**: Integrated Dark Mode and Light Mode with a toggle button. It uses localStorage to remember the user's preference on page reload.

- **Real-Time Simulation**: 
  - Dynamic bar charts generated via CSS/JS
  - Live latency meter (ping simulation)
  - Fluctuating KPI counters (Operations per second, Data points)
  - Live data table row injection

- **Professional UI/UX**: 
  - Semantic CSS Variables for easy branding changes
  - Monospace fonts (JetBrains Mono) for tabular data precision
  - Responsive Grid/Flexbox layout

---

## 📁 File Structure

| File | Purpose |
|------|---------|
| `index.html` | Contains the semantic structure (Sidebar, KPI Grid, Chart Container, Data Table) |
| `style.css` | Handles all visual design and layout |
| `script.js` | Handles the application logic |

---

## 🎨 Customization Guide

### Changing Colors

1. Open `style.css` and locate the `:root` section at the top
2. Change the Hex codes to match your brand:
   - `--primary`: Main action color (Buttons, Highlights)
   - `--bg-main`: Background color
   - `--text-primary`: Primary text color
   - `--text-secondary`: Secondary text color

### Adjusting Simulation Speed

1. Open `script.js` and look for the `CONFIG` object at the top
2. Modify these values:
   - `refreshRate`: How often the data updates (in milliseconds)
   - `chartBars`: How many bars appear in the main chart

---

## 🚀 Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Toggle between Dark and Light modes using the theme switcher
4. Explore the dashboard and customize as needed

---

## 💡 Tips & Best Practices

- Modify the KPI metrics in `script.js` to match your actual data
- Adjust the chart update frequency based on your processing needs
- Use the CSS variables for a consistent color scheme across themes
- Test the dashboard on various screen sizes for responsiveness
