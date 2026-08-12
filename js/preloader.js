/* ============================================================
   CVRM DEGREE COLLEGE — Preloader / Cinematic Intro
   ============================================================ */

class CinematicIntro {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.canvas = document.getElementById('preloader-canvas');
    this.engine = null;
    this.hasPlayed = sessionStorage.getItem('cvrm-intro-played');
  }

  async init() {
    // Skip if already played this session
    if (this.hasPlayed) {
      this.skipIntro();
      return;
    }

    if (!this.canvas || !this.preloader) {
      return;
    }

    // Wait for font to load
    await this.waitForFont();

    this.engine = new ParticleTextEngine(this.canvas);

    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Determine font size based on screen
    const isMobile = window.innerWidth < 768;
    const mainSize = isMobile ? 24 : 48;
    const brandSize = isMobile ? 28 : 56;
    const welcomeSize = isMobile ? 20 : 36;

    try {
      // Sequence 1: "Transforming Potential Into Excellence"
      await this.engine.showText('Transforming Potential\nInto Excellence', mainSize);
      await this.pause(200);

      // Sequence 2: "Ambition Into Achievement"
      await this.engine.showText('Ambition Into\nAchievement', mainSize);
      await this.pause(200);

      // Sequence 3: "Students Into Leaders"
      await this.engine.showText('Students Into\nLeaders', mainSize);
      await this.pause(200);

      // Final: "CVRM DEGREE COLLEGE"
      await this.engine.revealFinalText('CVRM\nDEGREE COLLEGE', brandSize);
      await this.pause(400);

      // Fade and show "WELCOME"
      await this.engine.fadeOut(400);
      await this.engine.revealFinalText('WELCOME', welcomeSize);
      await this.pause(300);

      // Transition out
      await this.transitionOut();
    } catch (e) {
      console.warn('Intro animation error:', e);
      this.skipIntro();
    }
  }

  async waitForFont() {
    try {
      await document.fonts.load('700 48px "Playfair Display"');
    } catch (e) {
      // Font loading failed, continue anyway
      await this.pause(500);
    }
  }

  pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async transitionOut() {
    // Zoom + blur transition
    this.preloader.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease';
    this.preloader.style.transform = 'scale(1.2)';
    this.preloader.style.opacity = '0';
    this.preloader.style.filter = 'blur(20px)';

    await this.pause(800);

    // Clean up
    this.preloader.classList.add('done');
    this.preloader.style.display = 'none';
    document.body.style.overflow = '';

    if (this.engine) {
      this.engine.destroy();
    }

    sessionStorage.setItem('cvrm-intro-played', 'true');

    // Trigger page entrance animations
    document.dispatchEvent(new CustomEvent('introComplete'));
  }

  skipIntro() {
    if (this.preloader) {
      this.preloader.classList.add('done');
      this.preloader.style.display = 'none';
    }
    document.body.style.overflow = '';

    // Trigger page entrance animations
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('introComplete'));
    }, 100);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const intro = new CinematicIntro();
  intro.init();
});




