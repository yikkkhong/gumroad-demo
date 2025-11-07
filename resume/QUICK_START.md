# 🚀 Quick Start Guide

Welcome! This guide will get you up and running in **under 10 minutes**.

## ⚡ Super Quick Setup

### Step 1: Install Dependencies (2 minutes)

Open your terminal in the project folder and run:

```bash
npm install
```

Wait for the installation to complete.

### Step 2: Start the Development Server (1 minute)

```bash
npm run dev
```

Your browser should automatically open to `http://localhost:3000`

If it doesn't, manually open your browser and go to that address.

### Step 3: Edit Your Information (5 minutes)

Open the file: `src/data/resumeData.js`

This file contains ALL your resume information. Update it with your details:

```javascript
export const resumeData = {
  personal: {
    name: "Your Name Here",        // ← Change this
    title: "Your Job Title",       // ← And this
    email: "your@email.com",       // ← And this
    // ... update all fields
  },
  // ... update other sections
};
```

**Save the file** and watch your changes appear instantly in the browser! 🎉

## 📝 What to Update

### Must Update:
1. ✅ Personal info (name, email, phone, etc.)
2. ✅ About section (your summary)
3. ✅ Work experience
4. ✅ Education
5. ✅ Skills
6. ✅ Projects

### Optional Updates:
- Change colors (see CUSTOMIZATION_GUIDE.md)
- Modify animations
- Add/remove sections
- Change layout

## 🎨 Change Colors Quickly

Want to change the color scheme? 

Open `tailwind.config.js` and find this section:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // ← Change this hex color
    600: '#0284c7',  // ← And this one
  },
}
```

**Popular color options:**
- Purple: `#a855f7` and `#9333ea`
- Green: `#10b981` and `#059669`
- Pink: `#ec4899` and `#db2777`
- Orange: `#f97316` and `#ea580c`

## 🌐 Deploy Your Resume

### Option 1: Netlify (Easiest)

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder
4. Done! Your resume is live 🎉

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts

### Option 3: GitHub Pages

1. Build your project:
   ```bash
   npm run build
   ```

2. Push the `dist` folder to your GitHub repository's `gh-pages` branch

## 🆘 Common Issues

### "npm: command not found"
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org)

### Port 3000 is already in use
**Solution:** The dev server will automatically use a different port (3001, 3002, etc.)

### Changes not showing up
**Solution:** 
1. Save the file (Ctrl+S or Cmd+S)
2. Refresh your browser (F5)
3. If still not working, stop the server (Ctrl+C) and run `npm run dev` again

### Animations not smooth
**Solution:** This is normal during development. Build the production version (`npm run build`) for optimal performance.

## 📚 Need More Help?

- **Full documentation:** See `README.md`
- **Customization guide:** See `CUSTOMIZATION_GUIDE.md`
- **Support:** Email [your-support-email@example.com]

## ✨ Pro Tips

1. **Keep it simple:** Don't overcomplicate your resume
2. **Use metrics:** Include numbers in your achievements (e.g., "Increased sales by 50%")
3. **Test on mobile:** Open on your phone to see how it looks
4. **Get feedback:** Show it to friends before publishing
5. **Update regularly:** Keep your resume current

## 🎯 Next Steps

1. ✅ Update all your information
2. ✅ Customize colors to match your brand
3. ✅ Test on different devices
4. ✅ Build and deploy
5. ✅ Share your awesome resume!

---

**Congratulations!** You now have a professional, animated resume that will impress recruiters and clients! 🎉

Need help? Don't hesitate to reach out: [your-email@example.com]
