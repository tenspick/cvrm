/* ============================================================
   CVRM DEGREE COLLEGE — Navigation System
   Shared across all pages
   ============================================================ */

class Navigation {
  constructor() {
    this.nav = document.getElementById('main-nav');
    this.hamburger = document.getElementById('nav-hamburger');
    this.mobileMenu = document.getElementById('nav-mobile');
    this.lastScrollY = 0;
    this.scrollThreshold = 50;
    this.isMenuOpen = false;

    this.init();
  }

  init() {
    this.bindEvents();
    this.setActivePage();
    this.handleScroll();
  }

  bindEvents() {
    // Scroll effects
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Hamburger toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Close mobile menu on link click
    if (this.mobileMenu) {
      this.mobileMenu.querySelectorAll('.nav-mobile-link').forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class for glassmorphism bg
    if (scrollY > this.scrollThreshold) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }

    // Hide/show on scroll direction (only after 300px)
    if (scrollY > 300) {
      if (scrollY > this.lastScrollY + 5) {
        this.nav.classList.add('hidden');
      } else if (scrollY < this.lastScrollY - 5) {
        this.nav.classList.remove('hidden');
      }
    } else {
      this.nav.classList.remove('hidden');
    }

    this.lastScrollY = scrollY;
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.hamburger.classList.toggle('active');
    this.mobileMenu.classList.toggle('open');
    
    // Lock body scroll
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    
    // Update ARIA
    this.hamburger.setAttribute('aria-expanded', this.isMenuOpen);
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.hamburger.classList.remove('active');
    this.mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    this.hamburger.setAttribute('aria-expanded', 'false');
  }

  setActivePage() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Normalize paths
      const linkPath = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      const currentPath = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      
      if (linkPath === currentPath || 
          (currentPath.endsWith('/') && linkPath === currentPath + 'index') ||
          (href.includes('index.html') && (currentPath === '/' || currentPath.endsWith('/cvrm college/') || currentPath.endsWith('/cvrm%20college/')))) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});




