// This file contains all the resume data that can be easily customized
export const resumeData = {
  personal: {
    name: "John Doe",
    title: "Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "www.johndoe.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
  },
  
  about: {
    summary: "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love creating beautiful, user-friendly interfaces and solving complex problems.",
    highlights: [
      "5+ years of professional experience",
      "Led teams of 5+ developers",
      "Built applications serving 100K+ users",
      "Open source contributor"
    ]
  },
  
  experience: [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "Jan 2021",
      endDate: "Present",
      description: "Leading development of enterprise-scale web applications",
      achievements: [
        "Architected and built a microservices platform serving 100K+ daily users",
        "Reduced application load time by 60% through optimization",
        "Mentored 5 junior developers and conducted code reviews",
        "Implemented CI/CD pipeline reducing deployment time by 80%"
      ]
    },
    {
      id: 2,
      company: "Digital Solutions Co.",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "Jun 2019",
      endDate: "Dec 2020",
      description: "Developed and maintained multiple client-facing applications",
      achievements: [
        "Built 10+ responsive web applications using React and Node.js",
        "Integrated third-party APIs and payment gateways",
        "Improved test coverage from 40% to 85%",
        "Collaborated with designers to implement pixel-perfect UIs"
      ]
    },
    {
      id: 3,
      company: "StartUp Labs",
      position: "Junior Developer",
      location: "New York, NY",
      startDate: "Jan 2018",
      endDate: "May 2019",
      description: "Contributed to various web development projects",
      achievements: [
        "Developed features for e-commerce platform",
        "Fixed 100+ bugs and improved application stability",
        "Participated in agile development process",
        "Learned modern web development best practices"
      ]
    }
  ],
  
  education: [
    {
      id: 1,
      school: "University of California",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      startDate: "2014",
      endDate: "2018",
      gpa: "3.8/4.0",
      achievements: [
        "Dean's List all semesters",
        "President of Computer Science Club",
        "Completed senior project on Machine Learning"
      ]
    },
    {
      id: 2,
      school: "Online Certifications",
      degree: "Various Professional Certifications",
      location: "Online",
      startDate: "2018",
      endDate: "Present",
      achievements: [
        "AWS Certified Solutions Architect",
        "Google Cloud Professional Developer",
        "Advanced React Patterns - Frontend Masters"
      ]
    }
  ],
  
  skills: {
    technical: [
      { name: "JavaScript/TypeScript", level: 95 },
      { name: "React/Next.js", level: 90 },
      { name: "Node.js/Express", level: 85 },
      { name: "Python", level: 80 },
      { name: "SQL/NoSQL", level: 85 },
      { name: "AWS/Cloud", level: 75 },
      { name: "Docker/Kubernetes", level: 70 },
      { name: "Git/CI/CD", level: 90 }
    ],
    soft: [
      "Team Leadership",
      "Problem Solving",
      "Communication",
      "Agile/Scrum",
      "Project Management",
      "Mentoring"
    ]
  },
  
  projects: [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Full-featured online shopping platform with payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://github.com/johndoe/ecommerce",
      highlights: [
        "Handles 10K+ daily transactions",
        "Real-time inventory management",
        "Advanced search and filtering"
      ]
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Collaborative project management tool with real-time updates",
      technologies: ["React", "Firebase", "Material-UI"],
      link: "https://github.com/johndoe/taskapp",
      highlights: [
        "Real-time collaboration",
        "Drag-and-drop interface",
        "Team analytics dashboard"
      ]
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Beautiful weather application with forecasts and maps",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      link: "https://github.com/johndoe/weather",
      highlights: [
        "7-day forecast",
        "Interactive weather maps",
        "Location-based alerts"
      ]
    }
  ]
};
