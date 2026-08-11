/* ============================================================
   CVRM DEGREE COLLEGE — Particle Text Engine
   Canvas-based text-to-particle system for cinematic intro
   ============================================================ */

class ParticleTextEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.isRunning = false;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(this.dpr, this.dpr);
  }

  /**
   * Sample pixel positions from text rendered to an offscreen canvas
   */
  sampleTextPixels(text, fontSize, maxParticles = 2000) {
    const offscreen = document.createElement('canvas');
    offscreen.width = this.width * this.dpr;
    offscreen.height = this.height * this.dpr;
    const octx = offscreen.getContext('2d');
    octx.scale(this.dpr, this.dpr);

    // Render text centered
    octx.fillStyle = '#fff';
    octx.font = `700 ${fontSize}px 'Playfair Display', Georgia, serif`;
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';

    // Handle multi-line text
    const lines = text.split('\n');
    const lineHeight = fontSize * 1.3;
    const totalHeight = lines.length * lineHeight;
    const startY = (this.height - totalHeight) / 2 + lineHeight / 2;

    lines.forEach((line, i) => {
      octx.fillText(line, this.width / 2, startY + i * lineHeight);
    });

    // Sample pixels
    const imageData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
    const pixels = imageData.data;
    const positions = [];
    const gap = Math.max(3, Math.floor(Math.sqrt((offscreen.width * offscreen.height) / (maxParticles * 4))));

    for (let y = 0; y < offscreen.height; y += gap) {
      for (let x = 0; x < offscreen.width; x += gap) {
        const i = (y * offscreen.width + x) * 4;
        if (pixels[i + 3] > 128) {
          positions.push({
            x: x / this.dpr,
            y: y / this.dpr
          });
        }
      }
    }

    // Limit particles
    if (positions.length > maxParticles) {
      const step = positions.length / maxParticles;
      const sampled = [];
      for (let i = 0; i < maxParticles; i++) {
        sampled.push(positions[Math.floor(i * step)]);
      }
      return sampled;
    }

    return positions;
  }

  /**
   * Create particles that will form the text
   */
  createParticles(targetPositions) {
    this.particles = targetPositions.map(pos => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      targetX: pos.x,
      targetY: pos.y,
      originX: pos.x,
      originY: pos.y,
      size: Math.random() * 1.5 + 0.5,
      alpha: 0,
      targetAlpha: Math.random() * 0.5 + 0.5,
      vx: 0,
      vy: 0,
      phase: 'forming', // forming, holding, dissolving
      turbulence: Math.random() * 2 - 1,
      speed: Math.random() * 0.02 + 0.03,
      noiseOffset: Math.random() * 1000,
      dissolveAngle: Math.random() * Math.PI * 2,
      dissolveSpeed: Math.random() * 2 + 1,
    }));
  }

  /**
   * Animate particles forming text
   */
  formText(duration = 1200) {
    return new Promise(resolve => {
      const startTime = Date.now();
      this.particles.forEach(p => { p.phase = 'forming'; });

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = this.easeOutQuart(progress);

        this.particles.forEach(p => {
          // Move towards target
          p.x += (p.targetX - p.x) * (0.05 + eased * 0.1);
          p.y += (p.targetY - p.y) * (0.05 + eased * 0.1);
          
          // Add slight turbulence during formation
          const turbFactor = (1 - eased) * 2;
          p.x += Math.sin(Date.now() * 0.003 + p.noiseOffset) * turbFactor;
          p.y += Math.cos(Date.now() * 0.003 + p.noiseOffset * 1.3) * turbFactor;
          
          // Fade in
          p.alpha = Math.min(p.targetAlpha, eased);
        });

        this.render();

        if (progress < 1) {
          this.animationId = requestAnimationFrame(animate);
        } else {
          // Snap to final positions
          this.particles.forEach(p => {
            p.phase = 'holding';
          });
          resolve();
        }
      };
      
      this.animationId = requestAnimationFrame(animate);
    });
  }

  /**
   * Hold the text with subtle floating
   */
  holdText(duration = 800) {
    return new Promise(resolve => {
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;

        this.particles.forEach(p => {
          // Subtle floating motion
          const floatX = Math.sin(elapsed * 0.002 + p.noiseOffset) * 0.5;
          const floatY = Math.cos(elapsed * 0.002 + p.noiseOffset * 1.3) * 0.5;
          p.x = p.targetX + floatX;
          p.y = p.targetY + floatY;
        });

        this.render();

        if (elapsed < duration) {
          this.animationId = requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      this.animationId = requestAnimationFrame(animate);
    });
  }

  /**
   * Dissolve/evaporate the text
   */
  dissolveText(duration = 1000) {
    return new Promise(resolve => {
      const startTime = Date.now();
      this.particles.forEach(p => { p.phase = 'dissolving'; });

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = this.easeInQuart(progress);

        this.particles.forEach(p => {
          // Smoke dispersion
          const angle = p.dissolveAngle + progress * 0.5;
          const speed = p.dissolveSpeed * eased * 4;
          
          p.x += Math.cos(angle) * speed + Math.sin(elapsed * 0.005 + p.noiseOffset) * eased * 3;
          p.y += Math.sin(angle) * speed - eased * 2; // drift upward
          
          // Fade out
          p.alpha = p.targetAlpha * (1 - eased);
          
          // Size decrease
          p.size = p.size * (1 - eased * 0.5);
        });

        this.render();

        if (progress < 1) {
          this.animationId = requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      this.animationId = requestAnimationFrame(animate);
    });
  }

  /**
   * Full sequence: form → hold → dissolve
   */
  async showText(text, fontSize) {
    const positions = this.sampleTextPixels(text, fontSize);
    this.createParticles(positions);
    await this.formText(1000);
    await this.holdText(600);
    await this.dissolveText(800);
  }

  /**
   * Final reveal: form text and keep it
   */
  async revealFinalText(text, fontSize) {
    const positions = this.sampleTextPixels(text, fontSize);
    this.createParticles(positions);
    await this.formText(1200);
    await this.holdText(1000);
  }

  /**
   * Render all particles
   */
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach(p => {
      if (p.alpha <= 0.01) return;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      this.ctx.fill();

      // Glow effect for larger particles
      if (p.size > 1 && p.alpha > 0.3) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha * 0.08})`;
        this.ctx.fill();
      }
    });
  }

  /**
   * Fade out everything
   */
  fadeOut(duration = 600) {
    return new Promise(resolve => {
      const startTime = Date.now();
      const initialAlphas = this.particles.map(p => p.alpha);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        this.particles.forEach((p, i) => {
          p.alpha = initialAlphas[i] * (1 - progress);
        });

        this.render();

        if (progress < 1) {
          this.animationId = requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      this.animationId = requestAnimationFrame(animate);
    });
  }

  /**
   * Clean up
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.particles = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // Easing functions
  easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
  easeInQuart(t) { return t * t * t * t; }
  easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; }
}

// Export for use
window.ParticleTextEngine = ParticleTextEngine;
