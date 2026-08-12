/* ============================================================
   CVRM DEGREE COLLEGE — Main Application Entry
   Initializes all systems: Lenis, GSAP, animations
   ============================================================ */

class App {
  constructor() {
    this.lenis = null;
    this.animationEngine = null;
    this.scrollEffects = null;
    this.isHomepage = document.body.classList.contains('page-home');
  }

  /* ── Lenis Smooth Scroll ── */
  initLenis() {
    if (typeof Lenis === 'undefined') return;

    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    });

    // Connect Lenis to GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* ── Initialize All Animations ── */
  initAnimations() {
    // Core animation engine
    this.animationEngine = new AnimationEngine();
    this.animationEngine.init();

    // Scroll effects (hero zoom, horizontal scroll)
    this.scrollEffects = new ScrollEffects();
    this.scrollEffects.init();

    // Interactive effects
    AnimationEngine.initMagneticButtons();
    AnimationEngine.initTiltCards();

    // Page entrance animation
    this.pageEntrance();
  }

  /* ── Page Entrance ── */
  pageEntrance() {
    const hero = document.querySelector('.hero, .page-hero');
    if (!hero) return;

    const tl = gsap.timeline();

    // Fade in hero content
    tl.fromTo(hero.querySelectorAll('.hero-label, .label-text'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      0.2
    );

    tl.fromTo(hero.querySelectorAll('h1, .hero-title, .display-text'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
      0.4
    );

    tl.fromTo(hero.querySelectorAll('.hero-subtitle, p'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.7
    );

    tl.fromTo(hero.querySelectorAll('.hero-buttons, .btn'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      0.9
    );

    tl.fromTo(hero.querySelectorAll('.hero-scroll-indicator'),
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      1.2
    );
  }

  /* ── Lazy Loading ── */
  initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px'
    });

    lazyImages.forEach(img => observer.observe(img));
  }

  /* ── Accordion (FAQ, Program details) ── */
  initAccordions() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active');
        
        // Close all others
        item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // Toggle current
        if (!isActive) item.classList.add('active');
      });
    });
  }

  /* ── Program Card Expansion ── */
  initProgramCards() {
    document.querySelectorAll('.program-detail-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.closest('.program-detail-card');
        const isActive = card.classList.contains('active');

        // Close others
        document.querySelectorAll('.program-detail-card').forEach(c => c.classList.remove('active'));

        if (!isActive) card.classList.add('active');
      });
    });
  }

  /* ── Gallery Lightbox ── */
  initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    if (!galleryItems.length || !lightbox) return;

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    let currentIndex = 0;
    const images = [];

    galleryItems.forEach((item, i) => {
      const img = item.querySelector('img');
      if (img) {
        images.push(img.src);
        item.addEventListener('click', () => {
          currentIndex = i;
          lightboxImg.src = images[currentIndex];
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
      }
    });

    // Gallery filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            gsap.fromTo(item, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  init() {
    this.initLenis();
    this.initAnimations();
    this.initLazyLoading();
    this.initAccordions();
    this.initProgramCards();
    this.initGallery();
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});




