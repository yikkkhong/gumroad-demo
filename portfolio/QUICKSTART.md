# ⚡ Quick Start Guide

## 3-Minute Setup

### 1️⃣ Add Your Images (2 minutes)
```
📁 images/
   ├── project1.jpg to project10.jpg  (for Saturn orbit)
   ├── project11.jpg to project15.jpg (for gallery)
   └── about.jpg (your photo)
```

**Image Size**: 1200x900px (4:3 ratio) | **Format**: JPG/PNG | **Max Size**: 500KB

---

### 2️⃣ Update Your Info (1 minute)

Open `index.html` and `gallery.html`, find and replace:

```html
<!-- Line 13 -->
Your Name → [Your Actual Name]

<!-- Contact Section -->
your.email@example.com → [Your Email]
+1 (555) 123-4567 → [Your Phone]
Your City, Country → [Your Location]
```

---

### 3️⃣ Customize Projects

**In `index.html`** - Update each orbit item:
```html
<h4>Project Title 1</h4> → [Your Project Name]
<p>Design & Development</p> → [Your Category]
```

**In `gallery.html`** - Update gallery items:
```html
<h3>Project Title 1</h3> → [Your Project Name]
<p>Design & Development</p> → [Your Description]
data-category="design" → [design/development/branding/photography/illustration]
```

---

## 🎨 Optional Customizations

### Change Colors
Edit `css/style.css` (lines 2-12):
```css
--primary-color: #6366f1;  → [Your Color]
--secondary-color: #8b5cf6; → [Your Color]
```

### Adjust Orbit Speed
Edit `css/style.css` (line 266):
```css
animation: rotateOrbit 60s → [Your Speed]s
```

---

## 🚀 Deploy

### Easiest Options:
1. **Netlify**: Drag & drop folder → Instant live site
2. **GitHub Pages**: Push to repo → Enable Pages → Done
3. **Vercel**: Import repo → One-click deploy

---

## ✅ Pre-Launch Checklist

- [ ] All images added to `/images` folder
- [ ] Personal info updated in both HTML files
- [ ] Project titles and descriptions customized
- [ ] Social media links updated in footer
- [ ] Colors match your brand (optional)
- [ ] Tested on mobile device
- [ ] Tested in different browsers

---

## 🆘 Common Issues

**Orbit not rotating?**
→ Check that `js/script.js` is linked correctly

**Images not showing?**
→ Verify image names match exactly (case-sensitive)

**Mobile looks broken?**
→ Clear cache and refresh

---

## 📚 Need More Help?

See the full **README.md** for:
- Detailed customization options
- SEO optimization
- Advanced features
- Troubleshooting guide

---

**You're ready to launch! 🎉**
