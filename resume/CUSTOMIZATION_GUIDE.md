# 📝 Customization Guide

This guide will walk you through customizing every aspect of your animated resume template.

## 🎯 Quick Start Customization

### 1. Personal Information (5 minutes)

Open `src/data/resumeData.js` and update the `personal` section:

```javascript
personal: {
  name: "Your Full Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, State",
  website: "www.yourwebsite.com",
  linkedin: "linkedin.com/in/yourprofile",
  github: "github.com/yourusername",
}
```

### 2. About Section (10 minutes)

Update your summary and highlights:

```javascript
about: {
  summary: "Write a compelling 2-3 sentence summary about yourself...",
  highlights: [
    "Your key achievement #1",
    "Your key achievement #2",
    "Your key achievement #3",
    "Your key achievement #4"
  ]
}
```

### 3. Work Experience (15 minutes)

Add your work history:

```javascript
experience: [
  {
    id: 1,  // Keep unique IDs
    company: "Company Name",
    position: "Your Position",
    location: "City, State",
    startDate: "Jan 2021",
    endDate: "Present",  // or "Dec 2023"
    description: "Brief role description",
    achievements: [
      "Achievement with metrics (e.g., Increased sales by 50%)",
      "Another achievement",
      "One more achievement"
    ]
  },
  // Add more positions...
]
```

### 4. Education (10 minutes)

```javascript
education: [
  {
    id: 1,
    school: "University Name",
    degree: "Bachelor of Science in Computer Science",
    location: "City, State",
    startDate: "2014",
    endDate: "2018",
    gpa: "3.8/4.0",  // Optional
    achievements: [
      "Dean's List",
      "Relevant coursework or honors",
      "Clubs or activities"
    ]
  }
]
```

### 5. Skills (10 minutes)

Update technical skills with proficiency levels (0-100):

```javascript
skills: {
  technical: [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    // Add your skills...
  ],
  soft: [
    "Leadership",
    "Communication",
    // Add your soft skills...
  ]
}
```

### 6. Projects (15 minutes)

Showcase your best work:

```javascript
projects: [
  {
    id: 1,
    name: "Project Name",
    description: "Brief description of what the project does",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/yourusername/project",
    highlights: [
      "Key feature or achievement",
      "Impact or results",
      "Technical challenge solved"
    ]
  }
]
```

## 🎨 Visual Customization

### Change Color Scheme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Replace with your brand colors
        50: '#f0f9ff',   // Lightest
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',  // Main color
        600: '#0284c7',  // Darker
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',  // Darkest
      },
    },
  },
}
```

**Popular Color Schemes:**

**Purple Theme:**
```javascript
500: '#a855f7',  // Main purple
600: '#9333ea',  // Darker purple
```

**Green Theme:**
```javascript
500: '#10b981',  // Main green
600: '#059669',  // Darker green
```

**Red/Pink Theme:**
```javascript
500: '#ec4899',  // Main pink
600: '#db2777',  // Darker pink
```

### Change Background Gradient

In `src/index.css`:

```css
@layer base {
  body {
    /* Change these colors */
    @apply bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 min-h-screen;
  }
}
```

### Modify Glass Effect

In `src/index.css`:

```css
.glass-effect {
  @apply bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl;
  @apply dark:bg-gray-800/70 dark:border-gray-700/20;
  /* Adjust opacity (70), blur (lg), border opacity (20) */
}
```

### Customize Dark Mode Colors

The template includes a fully functional dark mode. To customize dark mode colors:

**In component files:**
```javascript
// Add dark: variants to any color class
className="text-gray-900 dark:text-white"
className="bg-blue-100 dark:bg-blue-900/20"
```

**In `src/index.css`:**
```css
body {
  @apply bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen;
  @apply dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-900 dark:to-gray-900;
}
```

**Dark mode is automatically:**
- Toggled via the moon/sun button
- Saved in localStorage (persists across sessions)
- Applied to all components

## ⚡ Animation Customization

### Adjust Animation Speed

In component files, modify `transition` durations:

```javascript
// Slower animation
transition={{ duration: 1.0 }}  // Default is 0.6

// Faster animation
transition={{ duration: 0.3 }}
```

### Change Animation Delays

```javascript
// Longer delay before animation starts
transition={{ duration: 0.6, delay: 0.5 }}

// Stagger children animations
transition={{ staggerChildren: 0.2 }}  // Default is 0.1
```

### Disable Specific Animations

Remove or comment out animation props:

```javascript
// Before (animated)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>

// After (no animation)
<div>
```

### Custom Animation Variants

Add new animations in component files:

```javascript
const customVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -10 
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8 }
  }
};
```

## 📐 Layout Customization

### Change Maximum Width

In `src/App.jsx`:

```javascript
// Current: max-w-6xl (1280px)
<div className="max-w-6xl mx-auto">

// Wider: max-w-7xl (1536px)
<div className="max-w-7xl mx-auto">

// Narrower: max-w-5xl (1024px)
<div className="max-w-5xl mx-auto">
```

### Adjust Spacing

```javascript
// Increase padding
<div className="px-4 py-8 md:py-12">  // Current
<div className="px-6 py-12 md:py-16">  // More spacious

// Decrease padding
<div className="px-2 py-4 md:py-6">  // More compact
```

### Modify Card Borders

In component files:

```javascript
// Current: rounded-2xl or rounded-3xl
className="rounded-2xl"

// More rounded
className="rounded-3xl"

// Less rounded
className="rounded-xl"

// Sharp corners
className="rounded-lg"
```

## 🖼️ Add Profile Photo

Replace the initials avatar in `Header.jsx`:

```javascript
// Current: Initials
<div className="w-full h-full rounded-full bg-white flex items-center justify-center text-5xl font-bold text-gradient">
  {data.name.split(' ').map(n => n[0]).join('')}
</div>

// Replace with image
<img 
  src="/path/to/your/photo.jpg" 
  alt={data.name}
  className="w-full h-full rounded-full object-cover"
/>
```

## 🔧 Add/Remove Sections

### Remove a Section

In `src/App.jsx`, comment out or delete:

```javascript
// <Projects data={resumeData.projects} />
```

### Add a New Section

1. Create new component `src/components/NewSection.jsx`:

```javascript
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const NewSection = ({ data }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="mb-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
      >
        New Section Title
      </motion.h2>
      
      <div className="glass-effect rounded-2xl p-6">
        {/* Your content here */}
      </div>
    </section>
  );
};

export default NewSection;
```

2. Add data to `resumeData.js`:

```javascript
export const resumeData = {
  // ... existing data
  newSection: {
    // Your data here
  }
};
```

3. Import and use in `App.jsx`:

```javascript
import NewSection from './components/NewSection';

// In the return statement
<NewSection data={resumeData.newSection} />
```

## 🌐 Multi-Language Support

Create language files:

```javascript
// src/data/resumeData.en.js
export const resumeDataEN = { /* English data */ };

// src/data/resumeData.es.js
export const resumeDataES = { /* Spanish data */ };
```

Add language switcher in `App.jsx`:

```javascript
const [language, setLanguage] = useState('en');
const data = language === 'en' ? resumeDataEN : resumeDataES;
```

## 📱 Mobile Optimization

### Adjust Mobile Breakpoints

In component files, modify responsive classes:

```javascript
// Current
className="text-4xl md:text-6xl"

// Larger mobile text
className="text-5xl md:text-6xl"

// Smaller mobile text
className="text-3xl md:text-6xl"
```

### Hide Elements on Mobile

```javascript
className="hidden md:block"  // Hide on mobile
className="md:hidden"         // Show only on mobile
```

## 🎭 Advanced Customizations

### Add Parallax Effect

Install react-scroll-parallax:

```bash
npm install react-scroll-parallax
```

Wrap your app and add parallax elements.

### Add Page Transitions

Use Framer Motion's AnimatePresence for route transitions.

### Add Contact Form

Create a new Contact component with form handling.

### Add Blog Section

Create a blog component and integrate with a CMS or markdown files.

## 💾 Save Your Customizations

After customizing:

1. **Test thoroughly** on different screen sizes
2. **Build the project**: `npm run build`
3. **Test the production build**: `npm run preview`
4. **Deploy** to your hosting platform

## 🆘 Troubleshooting

### Animations not working?
- Check that Framer Motion is installed
- Verify `useInView` hook is imported correctly

### Colors not changing?
- Run `npm run dev` to restart the dev server
- Clear browser cache

### Layout broken?
- Check for missing closing tags
- Verify TailwindCSS classes are spelled correctly

### Build errors?
- Delete `node_modules` and run `npm install` again
- Check for syntax errors in your customizations

---

Need more help? Check the main README.md
