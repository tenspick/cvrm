/* ============================================================
   CVRM DEGREE COLLEGE — Scroll Effects
   Hero video zoom, horizontal scroll, parallax systems
   ============================================================ */

class ScrollEffects {
  constructor() {
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.initHeroVideoZoom();
    this.initHorizontalScroll();
  }

  /* -- Hero Video Zoom on Scroll -- */
  initHeroVideoZoom() {
    const zoomSection = document.querySelector('.hero-zoom-section');
    if (!zoomSection) return;

    const pinWrapper = zoomSection.querySelector('.hero-zoom-pin');
    const video = zoomSection.querySelector('.hero-zoom-video');
    const content = zoomSection.querySelector('.hero-zoom-content');
    const overlay = zoomSection.querySelector('.hero-zoom-overlay');

    if (!pinWrapper || !video) return;

    // Pin the hero and zoom video
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: zoomSection,
        start: 'top top',
        end: 'bottom top',
        pin: pinWrapper,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // Video zoom from 1 to 1.5
    tl.fromTo(video,
      { scale: 1 },
      { scale: 1.5, ease: 'none' },
      0
    );

    // Content fades out
    if (content) {
      tl.to(content, {
        opacity: 0,
        y: -100,
        ease: 'none'
      }, 0);
    }

    // Overlay darkens
    if (overlay) {
      tl.to(overlay, {
        background: 'linear-gradient(180deg, rgba(10,10,18,0.9) 0%, rgba(10,10,18,0.95) 50%, rgba(10,10,18,1) 100%)',
        ease: 'none'
      }, 0.5);
    }
  }

  /* -- Horizontal Scroll Section -- */
  initHorizontalScroll() {
    const scrollWrapper = document.querySelector('.facilities-scroll-wrapper');
    if (!scrollWrapper) return;

    const track = scrollWrapper.querySelector('.facilities-track');
    if (!track) return;

    // Calculate how far to scroll
    const getScrollAmount = () => {
      return -(track.scrollWidth - window.innerWidth + 100);
    };

    gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: scrollWrapper,
        start: 'top 15%',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    // Animate each slide as it enters viewport
    const slides = track.querySelectorAll('.facility-slide');
    slides.forEach((slide, i) => {
      gsap.fromTo(slide,
        { opacity: 0.3, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: slide,
            containerAnimation: gsap.getById && gsap.getById('facilitiesScroll'),
            start: 'left 80%',
            end: 'left 20%',
            scrub: 1
          }
        }
      );
    });
  }


}

// Export
window.ScrollEffects = ScrollEffects;
