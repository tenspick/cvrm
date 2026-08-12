# CVRM Degree College — Complete Codebase Documentation

> **Welcome, Developer!**  
> This document is designed to explain **every single line, file, class, method, style, and script** in this repository pin-to-pin. Whether you are a senior developer or a complete beginner taking your first steps in web development, this guide will explain **how this website works under the hood** in clear, simple, and detailed terms.

---

## Table of Contents

1. [Project Overview & Architecture](#1-project-overview--architecture)
2. [Beginner's Cheat Sheet: Core Concepts Used](#2-beginners-cheat-sheet-core-concepts-used)
3. [Directory & File Map](#3-directory--file-map)
4. [HTML Architecture & Structure](#4-html-architecture--structure)
5. [JavaScript Engine & Modules (Pin-to-Pin)](#5-javascript-engine--modules-pin-to-pin)
   - [5.1 `js/main.js` — Application Orchestrator](#51-jsmainjs--application-orchestrator)
   - [5.2 `js/navigation.js` — Glassmorphic Sticky Header](#52-jsnavigationjs--glassmorphic-sticky-header)
   - [5.3 `js/preloader.js` — Cinematic Intro Controller](#53-jspreloaderjs--cinematic-intro-controller)
   - [5.4 `js/particles.js` — Canvas 2D Particle Text Engine](#54-jsparticlesjs--canvas-2d-particle-text-engine)
   - [5.5 `js/animations.js` — GSAP & ScrollTrigger Animations](#55-jsanimationsjs--gsap--scrolltrigger-animations)
   - [5.6 `js/scroll-effects.js` — Hero Zoom & Parallax Effects](#56-jsscroll-effectsjs--hero-zoom--parallax-effects)
6. [CSS Design System & Stylesheets](#6-css-design-system--stylesheets)
   - [6.1 `css/global.css` — Tokens & Global Rules](#61-cssglobalcss--tokens--global-rules)
   - [6.2 `css/home.css` — Hero & Interactive Grids](#62-csshomecss--hero--interactive-grids)
7. [Automation & Build Scripts](#7-automation--build-scripts)
   - [7.1 `update_site.js` — Node.js Maintenance Script](#71-update_sitejs--nodejs-maintenance-script)
8. [SEO & Deployment Rules](#8-seo--deployment-rules)
9. [Step-by-Step Execution Lifecycle](#9-step-by-step-execution-lifecycle)
10. [Beginner's How-To Guide](#10-beginners-how-to-guide)

---

## 1. Project Overview & Architecture

The **CVRM Degree College** website is a high-performance, cinematic, multi-page web application. It combines traditional server-rendered HTML pages with modern desktop-grade animation capabilities:

- **Frontend Tech Stack**: HTML5, Vanilla CSS3 (Custom Properties / Design Tokens), ES6+ JavaScript (Object-Oriented Architecture).
- **Animation Libraries**:
  - **GSAP (GreenSock Animation Platform)**: Handles precise timeline control, fading, scaling, clip-path reveals, magnetic buttons, and 3D tilt cards.
  - **GSAP ScrollTrigger**: Triggers animations dynamically as the user scrolls down the page.
  - **Lenis Smooth Scroll**: Intercepts native browser scrolling to provide smooth, inertia-based scrolling across desktop and mobile devices.
  - **SplitType**: Splits text headlines into lines or characters for staggered typography reveals.
  - **HTML5 Canvas 2D**: Powers a particle text generator during the initial cinematic loading intro.
- **Node.js Utilities**: Custom automation script (`update_site.js`) to generate and sync shared elements (footers, headers, course details) across all subpages automatically.

---

## 2. Beginner's Cheat Sheet: Core Concepts Used

If you are new to programming, here are the essential concepts used throughout this codebase:

### 1. The DOM (Document Object Model)
When the browser loads an HTML page, it builds a tree structure called the DOM. JavaScript accesses and updates elements on screen through DOM methods like:
- `document.getElementById('id_name')`: Finds a single HTML element by its `id`.
- `document.querySelectorAll('.class_name')`: Finds all elements matching a CSS class.
- `element.classList.add('active')` / `element.classList.remove('active')`: Adds or removes CSS classes dynamically.

### 2. Object-Oriented Programming (Classes)
Instead of putting all JavaScript in one giant mess, this project divides functionality into **Classes** (`App`, `Navigation`, `CinematicIntro`, `ParticleTextEngine`, `AnimationEngine`, `ScrollEffects`).
```javascript
class App {
  constructor() {
    // Setting up initial variables
  }
  init() {
    // Running initialization logic
  }
}
```

### 3. Asynchronous JavaScript (Promises & Async/Await)
Animations take time to complete. We use `async` and `await` with JavaScript `Promise` objects to tell the browser: *"Wait for animation sequence #1 to complete before starting animation sequence #2."*

### 4. HTML5 `<canvas>` and 2D Context
An HTML `<canvas>` element is a blank digital canvas where JavaScript can draw pixels, shapes, and text frame-by-frame (usually 60 or 120 times per second) using `requestAnimationFrame`.

### 5. CSS Custom Properties (Variables)
Instead of hardcoding color hex codes (like `#b59438`) across 10 different files, we define variables in `:root` inside `css/global.css`:
```css
:root {
  --color-gold: #b59438;
}
```
Whenever we need that color, we write `color: var(--color-gold);`. Changing it in `:root` updates the entire site instantly.

---

## 3. Directory & File Map

Here is how the project folder structure is organized:

```
cvrm/
├── index.html                 # Main Homepage
├── document.md                # Comprehensive Codebase Documentation (This File)
├── update_site.js             # Node.js site update and template script
├── robots.txt                 # Search engine crawler instructions
├── sitemap.xml                # XML sitemap for SEO indexers
├── .htaccess                  # Apache server configuration (Redirects, headers, MIME types)
├── _redirects                 # Netlify routing & SSL force redirects
├── js/
│   ├── main.js                # App entry point (orchestrates all modules)
│   ├── navigation.js          # Sticky header & mobile menu controller
│   ├── preloader.js           # Cinematic loading screen flow controller
│   ├── particles.js           # Canvas particle text animation engine
│   ├── animations.js          # GSAP scroll reveals, counters, tilt, magnetic buttons
│   └── scroll-effects.js      # Scroll-tied parallax and hero scale dynamics
├── css/
│   ├── global.css             # Design tokens, baseline reset, typography, utilities
│   ├── home.css               # Homepage-specific component layout and styling
│   ├── about.css              # About Us page styles
│   ├── admissions.css         # Admissions portal styles
│   ├── contact.css            # Contact page styles
│   ├── departments.css        # Academic department styles
│   ├── facilities.css         # Campus facilities grid styles
│   ├── gallery.css            # Lightbox & photo gallery styles
│   ├── leadership.css         # Faculty & leadership page styles
│   ├── placements.css         # Placement statistics and recruiter styles
│   └── programs.css           # Degree course pages styles
├── about/                     # About Us section HTML
├── admissions/                # Admissions HTML & subpages
├── contact/                   # Contact Us HTML
├── departments/               # Academic Departments HTML
├── facilities/                # Campus Facilities HTML
├── gallery/                   # Photo Gallery HTML
├── leadership/                # Leadership HTML
├── placements/                # Career Placements HTML
└── programs/                  # Degree Course HTML files (B.Com, BBA, B.Sc, B.A)
```

---

## 4. HTML Architecture & Structure

Every HTML page (starting with `index.html`) is structured with high attention to performance and SEO:

1. **Meta Header Tags**:
   - `<meta charset="UTF-8">` & `<meta name="viewport">`: Ensures proper character rendering and mobile responsiveness.
   - `Open Graph (og:)` & `Twitter Card` tags: Provides rich previews (title, image, description) when links are shared on WhatsApp, LinkedIn, Twitter, or Facebook.
   - `JSON-LD Schema (<script type="application/ld+json">)`: Injects structured metadata directly into the page so search engines understand CVRM as a recognized Educational Institution in Venkatagirikota, Andhra Pradesh.

2. **Core DOM Containers**:
   - `#preloader`: Fullscreen black overlay containing `<canvas id="preloader-canvas">`.
   - `#main-nav`: Sticky header bar containing the logo, navigation links, and mobile hamburger toggle.
   - `<main>`: Main body content split into semantic `<section>` tags (Hero, Programs, Stats, Facilities, FAQ, CTA).
   - `<footer>`: Shared multi-column footer containing location, quick links, social media channels, and copyright information.

---

## 5. JavaScript Engine & Modules (Pin-to-Pin)

Let's break down each JavaScript module line-by-line so you understand how every single function works.

---

### 5.1 `js/main.js` — Application Orchestrator

The [`js/main.js`](file:///c:/Users/tejan/OneDrive/Desktop/imbuumainn/cvrm/js/main.js) file acts as the master brain of the application. It creates a master class called `App`.

#### Key Methods in `App`:

```javascript
class App {
  constructor() {
    this.lenis = null;
    this.animationEngine = null;
    this.scrollEffects = null;
    this.isHomepage = document.body.classList.contains('page-home');
  }
```
- **`initLenis()`**:
  Checks if the `Lenis` smooth scroll library is loaded. Initializes `Lenis` with an easing curve `Math.min(1, 1.001 - Math.pow(2, -10 * t))` for butter-smooth scrolling. Hooks `Lenis` scroll updates directly into `gsap.ticker` so scroll triggers update perfectly with screen refresh rates.
  
- **`initAnimations()`**:
  Instantiates `AnimationEngine` and `ScrollEffects`, then calls `AnimationEngine.initMagneticButtons()` and `AnimationEngine.initTiltCards()` to activate hover interactions across buttons and cards.

- **`pageEntrance()`**:
  Creates a `gsap.timeline()` to animate the hero text sequentially:
  1. Fade + slide up small label (`.hero-label`).
  2. Fade + slide up main headline (`h1, .hero-title`).
  3. Fade + slide up subtitle paragraph.
  4. Fade + slide up buttons.
  5. Fade in scroll indicator arrow at the bottom.

- **`initLazyLoading()`**:
  Uses browser native `IntersectionObserver` to find images with `data-src`. Images only load network data when they scroll within 200px of the viewport, reducing initial page load time significantly.

- **`initAccordions()`**:
  Listens for click events on `.faq-question` elements. Toggles `.active` class to expand answers while collapsing open accordions.

- **`initGallery()`**:
  Implements a modal lightbox:
  - Clicking a gallery thumbnail gets its `src` and displays it inside `#lightbox`.
  - Configures Next/Previous arrows, backdrop click-to-close, and keyboard listeners (`Escape` to close, `ArrowLeft` / `ArrowRight` to navigate).
  - Handles category filter buttons (`.filter-btn`), showing/hiding matching `.gallery-item` elements with GSAP scale transitions.

- **`init()`**:
  Calls all initialization functions sequentially. Executed as soon as the DOM fires `DOMContentLoaded`:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
```

---

### 5.2 `js/navigation.js` — Glassmorphic Sticky Header

The [`js/navigation.js`](file:///c:/Users/tejan/OneDrive/Desktop/imbuumainn/cvrm/js/navigation.js) module handles header navigation behaviors.

#### Key Methods in `Navigation`:

```javascript
class Navigation {
  constructor() {
    this.nav = document.getElementById('main-nav');
    this.hamburger = document.getElementById('nav-hamburger');
    this.mobileMenu = document.getElementById('nav-mobile');
    this.lastScrollY = 0;
    this.scrollThreshold = 50;
    this.isMenuOpen = false;
  }
```

- **`handleScroll()`**:
  - If vertical scroll distance (`window.scrollY`) > `50px`, adds `.scrolled` class to `#main-nav`, applying a translucent blur background (glassmorphism).
  - Smart Hide on Scroll: When scrolling down past `300px`, adds `.hidden` class to hide navbar for distraction-free reading. When scrolling up, removes `.hidden` to re-reveal navbar immediately.

- **`toggleMobileMenu()` / `closeMobileMenu()`**:
  - Toggles `.active` on hamburger icon (transforms 3 bars into an 'X').
  - Toggles `.open` on mobile menu overlay.
  - Sets `document.body.style.overflow = 'hidden'` to lock screen scrolling when mobile menu is active.
  - Updates `aria-expanded` attributes for accessibility screen readers.

- **`setActivePage()`**:
  Compares `window.location.pathname` with navbar link `href` attributes. Automatically highlights the current active page in gold.

---

### 5.3 `js/preloader.js` — Cinematic Intro Controller

The [`js/preloader.js`](file:///c:/Users/tejan/OneDrive/Desktop/imbuumainn/cvrm/js/preloader.js) module controls the intro sequence when a user opens the website.

#### Key Execution Flow:
1. **Session Check**: Checks `sessionStorage.getItem('cvrm-intro-played')`. If the user has already seen the intro during their current browsing session, it immediately calls `skipIntro()` to avoid annoying repeating animation.
2. **Font Synchronization**: `await document.fonts.load('700 48px "Playfair Display"')` ensures custom serif fonts are fully rendered before canvas sampling begins.
3. **Sequential Particle Messaging**:
   - Phrase 1: *"Transforming Potential Into Excellence"*
   - Phrase 2: *"Ambition Into Achievement"*
   - Phrase 3: *"Students Into Leaders"*
   - Title Reveal: *"CVRM DEGREE COLLEGE"*
   - Final Fade: *"WELCOME"*
4. **Transition Out (`transitionOut()`)**:
   Animates preloader container with scale zoom (`scale(1.2)`), opacity fade (`opacity: 0`), and Gaussian blur (`blur(20px)`), then dispatches a custom event:
   ```javascript
   document.dispatchEvent(new CustomEvent('introComplete'));
   ```

---

### 5.4 `js/particles.js` — Canvas 2D Particle Text Engine

The [`js/particles.js`](file:///c:/Users/tejan/OneDrive/Desktop/imbuumainn/cvrm/js/particles.js) module is a custom physics engine built from scratch on HTML5 Canvas.

#### How It Works (Step-by-Step):

```
Text String  ──>  Offscreen Canvas  ──>  Pixel Sampling (getImageData)  ──>  Particle Coordinates Array  ──>  Physics Animation Loop
```

1. **`resize()`**:
   Scales canvas resolution by `window.devicePixelRatio` (DPR) so particles look ultra-sharp on 4K & Retina displays.

2. **`sampleTextPixels(text, fontSize, maxParticles)`**:
   - Draws text string onto an invisible in-memory offscreen canvas.
   - Reads raw pixel RGBA bytes using `octx.getImageData()`.
   - Loops through pixel data in a grid gap. Every pixel with alpha opacity > 128 is logged as a `{x, y}` coordinate.

3. **`createParticles(targetPositions)`**:
   Creates an array of particle objects. Each particle starts at a random screen position `(Math.random() * width, Math.random() * height)` and stores its assigned text coordinate `(targetX, targetY)`.

4. **Particle Phases & Motion Physics**:
   - **`formText(duration)`**: Particles accelerate from random positions towards their text targets using smooth Quartic easing curves (`easeOutQuart`). Math sine wave turbulence is added during transit for organic flow.
   - **`holdText(duration)`**: Particles vibrate slightly using subtle floating noise math: `Math.sin(elapsed * 0.002 + noiseOffset) * 0.5`.
   - **`dissolveText(duration)`**: Particles drift upward and scatter outwards like golden smoke, fading alpha to zero.

5. **`render()`**:
   Clears canvas frame using `clearRect()`. Loops through particles drawing filled circles `ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)`. Adds a soft golden glow aura around larger particles.

---

### 5.5 `js/animations.js` — GSAP & ScrollTrigger Animations

The [`js/animations.js`](file:///c:/Users/tejan/OneDrive/Desktop/imbuumainn/cvrm/js/animations.js) module provides high-level animation helpers.

#### Features & Mechanics:

1. **Scroll-Triggered Reveals**:
   - `.reveal`: Elements slide up `50px` and fade in as they scroll into view.
   - `.reveal-left` / `.reveal-right`: Elements slide horizontally `80px` from left or right into position.
   - `.reveal-scale`: Elements scale up from `0.85` to `1.0`.

2. **SplitType Text Animations**:
   - Finds elements with `data-split="lines"`. Uses `SplitType` library to wrap lines into HTML spans. Animates lines upward from `110%` y-offset with staggered delays (`stagger: 0.08`).
   - Finds elements with `data-split-chars`. Splits words into individual letters, rotating them into view along 3D space (`rotateX: -90` to `0`).

3. **Numeric Counter Animations (`[data-counter]`)**:
   When scrolled into view, counts up numbers (e.g., `1000+` Students, `95%` Placements) smooth-stepping from 0 to target value using `gsap.to()` updates.

4. **Interactive 3D Tilt Cards (`initTiltCards()`)**:
   Listens to mouse movement over cards (`.tilt-card`). Calculates mouse offset relative to card center `(x - 0.5)` and rotates card along 3D axes (`rotateX`, `rotateY`) up to 10 degrees. Resets smoothly on `mouseleave`.

5. **Magnetic Buttons (`initMagneticButtons()`)**:
   Listens to mouse movement over buttons (`.magnetic-btn`). Pulls the button physical center slightly toward the cursor position `(x * 0.3, y * 0.3)`. Snaps back like rubber band elasticity on `mouseleave`.

---

### 5.6 `js/scroll-effects.js` — Hero Zoom & Parallax Effects

The `js/scroll-effects.js` file handles high-level scroll interactions, tying hero section scaling, background parallax depth shifting, and horizontal scroll sections directly to the page scrollbar velocity.

---

## 6. CSS Design System & Stylesheets

### 6.1 `css/global.css` — Tokens & Global Rules

The [`css/global.css`](file:///c:/Users/tejan/OneDrive/Desktop/imbuumainn/cvrm/css/global.css) stylesheet defines the core visual tokens:

- **Colors**:
  - `--color-gold`: `#b59438` (Primary brand accent)
  - `--color-gold-light`: `#c9a84c`
  - `--color-bg`: `#ffffff` (Clean light background canvas)
  - `--color-white`: `#0a0a12` (High-contrast rich dark text color)
  - `--color-gray`: `#555566` (Subtle body copy text)
- **Fluid Typography**:
  Uses CSS `clamp()` functions (e.g., `clamp(2.5rem, 5vw, 4.5rem)`). Headlines automatically scale down on mobile screens and scale up on widescreen desktop displays without requiring dozens of media queries.
- **Glassmorphism Utilities**:
  ```css
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  ```

---

### 6.2 `css/home.css` — Hero & Interactive Grids

The [`css/home.css`](file:///c:/Users/tejan/OneDrive/Desktop/imbuumainn/cvrm/css/home.css) stylesheet formats homepage specific UI components:

- **Hero Section**: Full height viewport layout with background radial gradients, typography spacing, and scroll indicator bounce keyframes.
- **Program Cards**: Grid container displaying academic courses with hover transformation elevation (`translateY(-8px)`), border glow shifts, and icon container highlights.
- **Stats Counter Bar**: Grid section displaying key metrics with gold gradient numbers and clean divider lines.

---

## 7. Automation & Build Scripts

### 7.1 `update_site.js` — Node.js Maintenance Script

The [`update_site.js`](file:///c:/Users/tejan/OneDrive/Desktop/imbuumainn/cvrm/update_site.js) file is a utility tool written in Node.js. It saves developers from manually copying and pasting repetitive HTML code across subdirectories.

#### Code Explanation:
```javascript
const fs = require('fs');
const path = require('path');
const baseDir = process.cwd();
```
1. Loads Node.js filesystem (`fs`) and path resolution (`path`) modules.
2. Defines `processDir(dir)` function that recursively walks through all subdirectories (`about/`, `programs/`, `admissions/`, `facilities/`, `departments/`, `gallery/`, etc.).
3. Reads every `.html` file.
4. Uses JavaScript Regular Expressions (`replace(/<div class="footer-bottom">[\s\S]*?<\/footer>/g, ...)` to find outdated footer blocks and replace them with the standard, updated multi-column footer HTML template across all pages automatically.

---

## 8. SEO & Deployment Rules

### 8.1 High-End VKota Local & Course-Focused SEO Keywords Integration
The entire repository is optimized for high-end local search intent across all major browsers (Googlebot, Bingbot, Yahoo, DuckDuckGo, Safari/Applebot, Chromium, Firefox, Opera):

- **Meta Keywords Tag**: Injected with 90+ high-priority VKota SEO keywords across all 24+ `.html` files (`best degree college in VKota`, `best degree college in V Kota`, `best degree college in Venkatagirikota`, `CVRM Degree College VKota`, `BCA college in VKota`, `B.Com college in VKota`, `B.Sc college in VKota`, `BBA college in VKota`, `BA college in VKota`, `degree admission 2026 VKota`, `best college near me VKota`, etc.).
- **Rich JSON-LD Microdata (`<script type="application/ld+json">`)**:
  - `alternateName`: Array covering `CVRM Degree College VKota`, `CVRM Degree College V Kota`, `CVRM Degree College V.Kota`, `CVRM Degree College Venkatagirikota`, `CVRM College VKota`.
  - `areaServed`: Explicitly targets `VKota`, `V Kota`, `V.Kota`, `Venkatagirikota`, `Chittoor`, `Andhra Pradesh`.
  - `hasOfferCatalog`: Lists full course offerings for BCA (AI & DS), B.Com, BBA, B.Sc (MPC, BZC, CS), and BA.
  - `FAQPage Schema`: Contains questions & answers targeting local search queries like *"Which is the best degree college in VKota?"* and *"How to apply for degree college admission 2026 in VKota?"*.
- **On-Page Semantic Content**: Dedicated `.vkota-seo-section` in `index.html` featuring course highlights, local intent cards, and keyword tag clouds for both users and search crawlers.
- **Site-Wide Footer Links**: `update_site.js` automatically propagates keyword-rich footer copy across all pages.

### 8.2 Server & Indexing Configurations
- **`robots.txt`**: Grants search engines (`Googlebot`, `Bingbot`) full crawling permissions across all public assets and links to `sitemap.xml`.
- **`sitemap.xml`**: Lists canonical site URLs (`https://www.cvrmcollege.com/`, `/about/about.html`, `/programs/programs.html`, `/admissions/admissions.html`, etc.) along with 2026 modification timestamps, priority weighting (`1.0`, `0.9`, `0.85`), and update frequencies.
- **`.htaccess`**:
  - Enables `mod_rewrite` for clean URLs.
  - Forces security headers: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`.
  - Forces HTTPS secure connections (`RewriteCond %{HTTPS} off`).
  - Sets browser caching rules (`Cache-Control: max-age=31536000` for images, fonts, JS, and CSS).
- **`_redirects`**: Serves as the fallback configuration for Netlify cloud hosting, ensuring `https://cvrmcollege.com/*` automatically redirects to `https://www.cvrmcollege.com/:splat 301!`.

---

## 9. Step-by-Step Execution Lifecycle

Here is what happens inside the browser from the moment a user types `cvrmcollege.com`:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Step 1: HTML, CSS & Script Download                                    │
│ Browser parses index.html, loads global.css & downloads JS scripts.    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Step 2: DOMContentLoaded Event Fires                                  │
│ Navigation & CinematicIntro instances are initialized.                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Step 3: Cinematic Intro Preloader Starts                               │
│ Checks sessionStorage. If first visit, ParticleTextEngine samples     │
│ text pixels on canvas & plays particle sequence. Locks body scroll.    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Step 4: Intro Completes & Fires 'introComplete' Event                   │
│ Preloader zooms & blurs out. Body scroll unlocks.                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Step 5: App Class Takes Control                                        │
│ Lenis smooth scroll activates. GSAP timelines animate Hero elements    │
│ (title, subtitle, CTA buttons) into view.                              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Step 6: User Scroll & Interaction Loop                                 │
│ - Navigation bar adds backdrop blur & auto-hides on downward scroll.   │
│ - GSAP ScrollTrigger reveals text, split-lines, counters & images.      │
│ - Hovering mouse over buttons/cards activates magnetic & tilt effects.  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Beginner's How-To Guide

### How do I change the main gold brand color?
Open `css/global.css`, go to line 18, and change `--color-gold: #b59438;` to your preferred hex color code. All text accents, button glows, and particle effects will update across the entire site automatically.

### How do I edit the preloader text message?
Open `js/preloader.js`, find lines 40-52, and change the text strings inside `this.engine.showText('Your Text Here', mainSize)`.

### How do I add a new page to the website?
1. Create a new folder (e.g., `events/`).
2. Inside that folder, create `index.html`.
3. Copy the header `<nav>` and `<footer>` from `index.html`.
4. Run `node update_site.js` in your terminal to ensure footers and links sync perfectly!

---

> **Documentation Complete!**  
> You now have a complete, pin-to-pin understanding of the entire CVRM Degree College codebase. Happy coding!
