/* ============================================================
   CVRM DEGREE COLLEGE — Animation Helpers
   Reusable GSAP + SplitType animation utilities
   ============================================================ */

class AnimationEngine {
  constructor() {
    this.initialized = false;
    this.splitInstances = [];
  }

  init() {
    if (this.initialized) return;
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Set defaults
    gsap.defaults({
      ease: 'power4.out',
      duration: 1
    });

    this.initialized = true;
    this.setupRevealAnimations();
    this.setupSplitTextAnimations();
    this.setupCounterAnimations();
    this.setupParallaxElements();
    this.setupStaggeredGrids();
    this.setupImageReveals();
  }

  /* ── Scroll-Triggered Reveal ── */
  setupRevealAnimations() {
    // Fade up reveals
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Fade from left
    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.fromTo(el,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Fade from right
    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.fromTo(el,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Scale reveals
    gsap.utils.toArray('.reveal-scale').forEach(el => {
      gsap.fromTo(el,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /* ── SplitType Text Animations ── */
  setupSplitTextAnimations() {
    if (typeof SplitType === 'undefined') return;

    gsap.utils.toArray('[data-split]').forEach(el => {
      const splitType = el.dataset.split || 'lines';
      const split = new SplitType(el, { types: splitType });
      this.splitInstances.push(split);

      const elements = split[splitType] || split.lines;
      if (!elements) return;

      gsap.fromTo(elements,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Character reveal
    gsap.utils.toArray('[data-split-chars]').forEach(el => {
      const split = new SplitType(el, { types: 'chars' });
      this.splitInstances.push(split);

      if (!split.chars) return;

      gsap.fromTo(split.chars,
        { y: 40, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /* ── Counter Animations ── */
  setupCounterAnimations() {
    gsap.utils.toArray('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter, 10);
      const suffix = el.dataset.counterSuffix || '';
      const prefix = el.dataset.counterPrefix || '';
      const duration = parseFloat(el.dataset.counterDuration) || 2;

      const counter = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = prefix + Math.floor(counter.val).toLocaleString() + suffix;
            }
          });
        },
        once: true
      });
    });
  }

  /* ── Parallax Elements ── */
  setupParallaxElements() {
    gsap.utils.toArray('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const direction = el.dataset.parallaxDir || 'y';

      gsap.to(el, {
        [direction]: `${speed * 100}`,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }

  /* ── Staggered Grids ── */
  setupStaggeredGrids() {
    gsap.utils.toArray('[data-stagger-grid]').forEach(container => {
      const children = container.children;
      if (!children.length) return;

      gsap.fromTo(children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /* ── Image Mask Reveals ── */
  setupImageReveals() {
    gsap.utils.toArray('[data-image-reveal]').forEach(el => {
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /* ── Magnetic Button Effect ── */
  static initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn, [data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 0.3;

        gsap.to(btn, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: 'power3.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  /* ── 3D Tilt Card Effect ── */
  static initTiltCards() {
    document.querySelectorAll('.tilt-card, [data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * -10;
        const tiltY = (x - 0.5) * 10;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power3.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      });
    });
  }

  /* ── Clean up ── */
  destroy() {
    this.splitInstances.forEach(s => s.revert());
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

// Export
window.AnimationEngine = AnimationEngine;
