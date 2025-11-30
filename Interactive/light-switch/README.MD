# Spotlight | Interactive Light Switch Portfolio

A unique, interactive portfolio template that turns the experience of viewing work into a playful interaction. Users toggle a realistic "studio light" switch to illuminate the room and reveal different projects.

## 📖 Description
This project is a creative departure from standard scroll-based portfolios. It features a split-screen layout:
* **Left Side:** A realistic 3D-styled light switch on a textured wall.
* **Right Side:** A dark room that illuminates with a flicker effect when the switch is toggled, revealing a new project card each time.

It is built with HTML, CSS (utilizing Tailwind CSS), and Vanilla JavaScript.

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


## ✨ Features
* **Interactive Switch:** realistic CSS styling for the switch rocker, screws, and plate with 3D perspective transforms.
* **Atmospheric Lighting:** Dynamic shadow and lighting effects on the wall and content area (dimming/flickering).
* **Dynamic Content Loading:** Projects are cycled through a JavaScript array, allowing for infinite looping without page reloads.
* **Responsive Design:** Adapts layout for mobile (stacked) and desktop (split-screen).
* **Tailwind CSS:** rapidly styled using Tailwind via CDN for easy customization.


## How to Customize
- **Adding Your Projects**: Open script.js. You will see an array called portfolioItems. Simply replace the dummy data with your own
- **Changing Colors**: To change the wall color or the "darkness" level, look at index.html inside the <script> tag for Tailwind config, or edit the CSS variables in style.css


## ⚠️ Image License & Disclaimer
Important Note Regarding Images:
- The images currently used in this demonstration code are sourced from Unsplash for preview purposes only.
- These images are not included in the final ownership of this code.
- If you deploy this website publicly, you must replace the demo image URLs with your own project screenshots or images that you have the license to use

## 📂 Project Structure

```text
/project-folder
  ├── index.html      # Main HTML structure and Tailwind config
  ├── style.css       # Custom CSS for switch realism and animations
  ├── script.js       # Data array and interaction logic
  └── README.md       # Documentation

