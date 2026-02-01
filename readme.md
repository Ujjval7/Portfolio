Here’s a complete prompt you can copy‑paste into another AI / code generator.

---

```text
You are an expert React + Tailwind CSS front-end developer.

Build a complete, production-quality **portfolio website** as a **React app** with the following requirements.

====================================
GENERAL REQUIREMENTS
====================================
- Use **React** (assume project is created with Create React App or Vite).
- Use **Tailwind CSS** for all styling.
- Use **Framer Motion** for most animations.
- All **content data** (about, experience, projects, skills, education, contact) must live in **JSON files** under `src/data/`, and **all components must import from those JSON files**. No hardcoded profile/project text inside components except labels like “Projects”, “Skills” etc.
- Generate **realistic sample data** in each JSON file so the app looks complete; I will replace it later.
- Implement a **dark / light theme toggle**, with theme saved in `localStorage`.
- Implement a **custom animated mouse cursor** (desktop only).
- Implement **smooth scrolling** and **scroll-based animations** for sections and cards.
- Use **React Icons** for all icons.

====================================
FOLDER & FILE STRUCTURE
====================================

Create this structure inside `src/`:

src/
  App.jsx
  index.jsx (or index.js)
  index.css

  components/
    layout/
      Header.jsx
      Footer.jsx
      CustomCursor.jsx

    sections/
      Hero.jsx          // Intro/About section
      Experience.jsx
      Projects.jsx
      Skills.jsx
      Education.jsx
      Contact.jsx

    ui/
      Card.jsx
      Button.jsx
      SectionTitle.jsx
      ThemeToggle.jsx
      Tooltip.jsx
      RotatingText.jsx
      SocialLinks.jsx

    animations/
      FadeIn.jsx
      SlideIn.jsx
      StaggerContainer.jsx

  context/
    ThemeContext.jsx

  hooks/
    useScrollSpy.js
    useIntersectionObserver.js
    useLocalStorage.js

  utils/
    constants.js
    animations.js

  styles/
    customCursor.css

  data/
    about.json
    experience.json
    projects.json
    skills.json
    education.json
    contact.json

====================================
TAILWIND & GLOBAL STYLES
====================================
- Configure Tailwind with:
  - `darkMode: 'class'`
  - Content paths pointing to `./src/**/*.{js,jsx,ts,tsx}`.
- In `index.css`:
  - Add `@tailwind base; @tailwind components; @tailwind utilities;`
  - Enable `scroll-behavior: smooth;`
  - Set base font family (e.g. an imported Google Font).
  - Add basic `body` styles and ensure dark mode background/text colors work.

====================================
THEME CONTEXT
====================================
File: `context/ThemeContext.jsx`

- Create a React context to manage `theme` = `'light' | 'dark'`.
- Default: read from `localStorage` if present; otherwise detect `prefers-color-scheme`, else `'light'`.
- Provide a `toggleTheme()` function.
- Apply a `class="dark"` on `<html>` or `<body>` based on theme.
- Export a `useTheme()` hook for easier use.

====================================
CUSTOM HOOKS
====================================

1) `useLocalStorage.js`
- Hook signature: `const [value, setValue] = useLocalStorage(key, defaultValue)`
- Persist value to `localStorage` whenever it changes.

2) `useScrollSpy.js`
- Use Intersection Observer to track which section is in viewport.
- Will watch elements by IDs: `home`, `experience`, `projects`, `skills`, `education`, `contact`.
- Returns the currently active section ID as a string.
- Used by `Header` to highlight active icon.

3) `useIntersectionObserver.js`
- Generic hook that:
  - Takes options: `threshold`, `rootMargin` etc.
  - Returns `[ref, isInView]`.
- Used by animation wrappers (FadeIn, SlideIn, etc.) to start animations when the element scrolls into view.

====================================
UTILS
====================================

File: `utils/constants.js`
- Export `NAV_ITEMS`: array of navigation items with IDs and icon names:
  - `{ id: 'home', label: 'Home', icon: <icon component> }`
  - `{ id: 'experience', label: 'Experience', icon: ... }`
  - `{ id: 'projects', label: 'Projects', icon: ... }`
  - `{ id: 'skills', label: 'Skills', icon: ... }`
  - `{ id: 'education', label: 'Education', icon: ... }`
  - `{ id: 'contact', label: 'Contact', icon: ... }`
- Use icons from `react-icons` (e.g., `FaHome`, `FaBriefcase`, `FaCode`, `FaTools`, `FaGraduationCap`, `FaEnvelope`).

- Optionally export constants for animation durations and easing.

File: `utils/animations.js`
- Define and export reusable **Framer Motion** variants:
  - `fadeInUp`, `fadeInDown`, `slideInLeft`, `slideInRight`, `scaleIn`
  - `staggerContainer`, `staggerItem`
- Each variant should have `hidden` and `visible` states.

====================================
CUSTOM CURSOR
====================================

File: `styles/customCursor.css`
- Define styles for:
  - Small main cursor dot.
  - Larger “follower” circle that lags behind the cursor.
  - Click ripple effect.
- Hide the default cursor on desktop (`cursor: none;`) and show custom elements.
- On mobile / touch devices, disable custom cursor and keep default.

File: `components/layout/CustomCursor.jsx`
- Use React and Framer Motion to:
  - Track mouse position (`clientX`, `clientY`).
  - Render:
    - A small dot that follows exactly at mouse position.
    - A larger circle that smoothly follows with a delay (for a trailing effect).
  - On `mousedown`, trigger a quick “ripple”/scale animation.
  - When hovering over interactive elements (`a`, `button`, `[role="button"]`), enlarge the follower or change its color.

- Detect touch devices and do not render custom cursor there.

====================================
LAYOUT COMPONENTS
====================================

1) `Header.jsx`
- Fixed or sticky at the top.
- Semi-transparent background with blur for a “glass” effect.
- Contains:
  - Left side: optionally name or logo (small).
  - Center or right: **icon-only navigation** using `NAV_ITEMS`.
  - Each nav icon:
    - Has a **Tooltip** showing the section label (About, Experience, etc.).
    - On click: **smooth scrolls** to the corresponding section with ID.
    - Highlight the icon for the **active section** using `useScrollSpy()`.
  - Right side: `ThemeToggle` button (sun/moon icon).

- On click of nav items:
  - Animate active state (e.g., scale, color change with Framer Motion).

2) `Footer.jsx`
- Place at bottom with:
  - Short copyright text.
  - Reuse `SocialLinks` component to show:
    - GitHub
    - Gmail
    - LinkedIn
    - Twitter
    - Resume
  - Hover animations on icons (scale/rotate/color).

3) `CustomCursor.jsx`
- Already described above; included in `App.jsx` so it’s always active.

====================================
UI COMPONENTS
====================================

1) `Button.jsx`
- Reusable button using Tailwind.
- Props: `variant` (`primary`, `secondary`, `outline`), `size` (`sm`, `md`, `lg`), `onClick`, `children`, `icon`, `className`.
- Use Framer Motion for hover/tap animations (slight scale).

2) `Card.jsx`
- Reusable card wrapper:
  - Rounded corners, shadow, padding.
  - Support dark/light mode.
  - Hover: slight lift (`translateY` -1 or -2) and stronger shadow.
- Used for experience, projects, education items, etc.

3) `SectionTitle.jsx`
- Common section heading with:
  - Title text.
  - Optional subtitle.
  - Decorative underline or accent line with animation.
- Use Framer Motion with small slide/fade-in when it scrolls into view.

4) `ThemeToggle.jsx`
- Uses `useTheme()` from `ThemeContext`.
- Renders a toggle button with a sun/moon icon (from `react-icons`).
- On click, toggles theme and animates icon (rotation or slide).

5) `Tooltip.jsx`
- Simple tooltip that:
  - Appears on hover near the icon.
  - Has small fade/scale animation.
- Used in Header for nav icons.

6) `RotatingText.jsx`
- Takes array of strings (job titles) as prop.
- Cycles through them one by one with:
  - Fade out old text, fade in new text OR
  - Slide up/out + slide in.
- Loop continuously with a delay (e.g., 2–3 seconds).
- Pull its data from `about.json` (rotatingTitles).

7) `SocialLinks.jsx`
- Reads from `contact.json` `socialLinks`.
- Renders icons with links:
  - `github`, `linkedin`, `twitter`, `gmail`, `resume`.
- Props for layout: horizontal/vertical, size, color, etc.
- Use tooltips or accessible labels (aria-label).

====================================
ANIMATION WRAPPERS
====================================

1) `FadeIn.jsx`
- A wrapper component that:
  - Uses Framer Motion + Intersection Observer (via `useIntersectionObserver`) to fade children in when they appear in the viewport.
  - Accept props: `delay`, `direction` (`up`, `down`, `left`, `right`), `className`.

2) `SlideIn.jsx`
- Similar to `FadeIn`, but primarily slides elements from one direction with optional fade.

3) `StaggerContainer.jsx`
- Motion container that:
  - Applies `staggerContainer` variants.
  - Children automatically use `staggerItem` variant.
  - Used for card grids (Experience, Projects, Skills, Education items).

====================================
SECTION COMPONENTS
====================================

Each section should be wrapped in a `<section id="...">` with an ID matching NAV_ITEMS:
- Hero (id="home")
- Experience (id="experience")
- Projects (id="projects")
- Skills (id="skills")
- Education (id="education")
- Contact (id="contact")

Use `SectionTitle` at the top of each (except maybe Hero).

------------------------------------
1) Hero.jsx (Intro/About section)
------------------------------------
- Uses data from `about.json` and `contact.json`.
- Layout:
  - Profile image on left (desktop) or top (mobile).
  - Right side: 
    - Name
    - Rotating job titles (using `RotatingText`).
    - Short tagline and bio.
    - Two buttons:
      - “Download Resume” (link from `contact.json.socialLinks.resume`).
      - “Contact Me” (scroll to `#contact`).
- Animations:
  - Profile image: scale+fade in.
  - Name: slide from left.
  - Rotating titles: continuous animation.
  - Buttons: small bounce or scale on hover.

------------------------------------
2) Experience.jsx
------------------------------------
- Data from `experience.json`.
- Display as either:
  - Vertical timeline OR
  - Grid/list of `Card`s.
- Each experience item includes:
  - Company name, logo (optional), role, period, location.
  - Short description.
  - Responsibilities (bullet list).
  - Achievements (bullet list).
  - Technologies (tags).
- Animations:
  - Use `StaggerContainer` and `FadeIn`/`SlideIn`:
    - Items fade/slide up when section first enters view.
  - Hover on each card:
    - Slight lift and shadow.

------------------------------------
3) Projects.jsx
------------------------------------
- Data from `projects.json`.
- Grid of project cards:
  - Image/thumbnail.
  - Title.
  - Short description.
  - Tech stack tags.
  - Links: GitHub, Live Demo (if present).
- Optionally a simple filter by category (e.g. “All / Web App / Utility”).
- Animations:
  - Use `StaggerContainer`.
  - Hover:
    - Image subtle zoom.
    - Card lifts.
  - Optional click to open a modal or expand to show `longDescription` and `highlights`.

------------------------------------
4) Skills.jsx
------------------------------------
- Data from `skills.json`.
- Display categories:
  - frontend
  - backend
  - databases
  - tools
- For each skill:
  - Show name.
  - Icon (based on icon name; use `react-icons`).
  - Optionally show proficiency as percentage using a simple bar or ring.
- Layout:
  - Could be separate cards per category with tags inside.
- Animations:
  - Category cards slide in from sides.
  - Each skill tag pops in (scale+fade) with stagger.

------------------------------------
5) Education.jsx
------------------------------------
- Data from `education.json`.
- Show:
  - Degrees array:
    - Institution, logo, degree, field, period, GPA, description, achievements.
  - Certifications array:
    - Name, issuer, date, credential URL/ID, icon.
- Layout:
  - Degrees may be in a timeline or simple vertical cards.
  - Certifications as badges/cards under degrees.
- Animations:
  - Alternating slide-in directions for each degree (left/right).
  - Certifications pop/fade in with slight delay.

------------------------------------
6) Contact.jsx
------------------------------------
- Data from `contact.json`.
- Show:
  - Location, email, optionally phone.
  - Statement like “Open to opportunities”.
  - A small contact form (optional but recommended):
    - Name, Email, Message, Submit button.
    - If using a service like Formspree, read endpoint from `contact.json.contactForm.formspreeEndpoint`.
  - Reuse `SocialLinks` to show GitHub, LinkedIn, Twitter, Gmail, Resume.
  - A “Copy Email” button with tooltip “Copied!” when clicked.

- Animations:
  - Section title fade/slide in.
  - Form elements slide up.
  - Social icons scale on hover.

====================================
HEADER NAV + SCROLL BEHAVIOR
====================================
- Header icons should:
  - Use `NAV_ITEMS` from `constants.js`.
  - Use `Tooltip` to show text label on hover.
  - On click: scroll smoothly to the corresponding section element ID.
  - Use `useScrollSpy` so the currently visible section’s icon is highlighted (different color/background/scale).
- On mobile:
  - Optionally use a hamburger menu that opens a small menu with the same icons (or text+icons).

====================================
DATA FILES (JSON) – STRUCTURE
====================================

Create these **with sample data** (not empty). Example structures:

1) `about.json`
{
  "name": "Sample Name",
  "profileImage": "/images/profile.jpg",
  "rotatingTitles": [
    "Software Developer",
    ".NET Developer",
    "Full Stack Developer",
    "Web Developer",
    "Backend Engineer"
  ],
  "tagline": "Short punchy tagline here",
  "bio": "A few sentences about experience and focus.",
  "location": "City, Country",
  "available": true
}

2) `experience.json`
[
  {
    "id": 1,
    "company": "Company Name",
    "logo": "/images/company1-logo.png",
    "role": "Full Stack Developer",
    "period": "Jan 2022 - Present",
    "duration": "2 years",
    "location": "Remote",
    "description": "Short overview of role.",
    "responsibilities": [
      "Responsibility 1",
      "Responsibility 2"
    ],
    "achievements": [
      "Achievement 1",
      "Achievement 2"
    ],
    "technologies": ["React", ".NET", "SQL Server"]
  }
]

3) `projects.json`
[
  {
    "id": 1,
    "title": "Project Title",
    "description": "Short project summary.",
    "longDescription": "Longer description for expanded view.",
    "image": "/images/project1.jpg",
    "technologies": ["React", "Node.js", "Tailwind CSS"],
    "category": "Web Application",
    "featured": true,
    "githubLink": "https://github.com/example",
    "liveLink": "https://example.com",
    "startDate": "2023-01",
    "endDate": "2023-06",
    "highlights": [
      "Highlight 1",
      "Highlight 2"
    ]
  }
]

4) `skills.json`
{
  "frontend": [
    { "name": "React", "icon": "FaReact", "proficiency": 90, "yearsOfExperience": 3 },
    { "name": "JavaScript", "icon": "SiJavascript", "proficiency": 85, "yearsOfExperience": 4 }
  ],
  "backend": [
    { "name": ".NET Core", "icon": "SiDotnet", "proficiency": 85, "yearsOfExperience": 3 }
  ],
  "databases": [
    { "name": "SQL Server", "icon": "SiMicrosoftsqlserver", "proficiency": 80, "yearsOfExperience": 3 }
  ],
  "tools": [
    { "name": "Git", "icon": "FaGitAlt", "proficiency": 85, "yearsOfExperience": 4 }
  ]
}

5) `education.json`
{
  "degrees": [
    {
      "id": 1,
      "institution": "University Name",
      "logo": "/images/university-logo.png",
      "degree": "Bachelor of Science in Computer Science",
      "field": "Computer Science",
      "period": "2016 - 2020",
      "gpa": "3.8/4.0",
      "location": "City, Country",
      "description": "Summary of coursework / focus.",
      "achievements": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ],
  "certifications": [
    {
      "id": 1,
      "name": "Certification Name",
      "issuer": "Issuer Name",
      "date": "2022-06",
      "credentialId": "ABC123",
      "credentialUrl": "https://example.com/cert",
      "icon": "SiMicrosoft",
      "description": "Short cert description."
    }
  ]
}

6) `contact.json`
{
  "email": "your.email@example.com",
  "phone": "+1234567890",
  "location": "City, Country",
  "availability": "Open to opportunities",
  "socialLinks": {
    "github": {
      "url": "https://github.com/yourusername",
      "username": "@yourusername",
      "icon": "FaGithub"
    },
    "linkedin": {
      "url": "https://linkedin.com/in/yourusername",
      "username": "Your Name",
      "icon": "FaLinkedin"
    },
    "twitter": {
      "url": "https://twitter.com/yourusername",
      "username": "@yourusername",
      "icon": "FaTwitter"
    },
    "gmail": {
      "url": "mailto:your.email@gmail.com",
      "email": "your.email@gmail.com",
      "icon": "SiGmail"
    },
    "resume": {
      "url": "https://your-resume-link.com",
      "downloadUrl": "/downloads/resume.pdf",
      "icon": "FaFileDownload"
    }
  },
  "contactForm": {
    "enabled": true,
    "formspreeEndpoint": "https://formspree.io/f/your-form-id"
  }
}

====================================
APP ENTRY (App.jsx)
====================================
- Wrap app with `ThemeProvider`.
- Render:
  - `<CustomCursor />`
  - `<Header />`
  - Main content with sections in order:
    - `<Hero />`
    - `<Experience />`
    - `<Projects />`
    - `<Skills />`
    - `<Education />`
    - `<Contact />`
  - `<Footer />`

- Ensure sections have enough padding and look good on mobile, tablet, and desktop.

====================================
OUTPUT FORMAT
====================================
- Provide **all necessary React component code and JSON files**, not just a high-level description.
- Organize code by files exactly as specified.
- Use clear, readable Tailwind classNames.
- Make sure app runs without errors when placed into a standard React + Tailwind setup.

END OF SPEC
```

---

After you generate the project with this prompt, I’ll replace the sample data in the JSON files with my real GitHub, Gmail, LinkedIn, Twitter, resume link, and other info.
