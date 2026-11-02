/**
 * DIVYA PRIYA — AN ENDLESS JOURNEY ❤️
 * Premium Cinematic Romantic Experience Engine
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. PARTICLES & STARFIELD CANVAS
     ========================================================================== */
  const pCanvas = document.getElementById('particles-canvas');
  let pCtx = pCanvas ? pCanvas.getContext('2d') : null;
  let particles = [];
  let pWidth = 0;
  let pHeight = 0;
  let animFrameId = null;

  function resizeCanvas() {
    if (!pCanvas) return;
    pWidth = pCanvas.width = window.innerWidth;
    pHeight = pCanvas.height = window.innerHeight;
  }

  class StardustParticle {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = Math.random() * pWidth;
      this.y = init ? Math.random() * pHeight : pHeight + 10;
      this.size = Math.random() * 2.2 + 0.6;
      this.speedY = Math.random() * 0.45 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.008;
      this.twinklePhase = Math.random() * Math.PI * 2;
      // Palette: Gold, Champagne, Pale Rose
      const hues = [
        'rgba(223, 186, 122, ',  // Champagne gold
        'rgba(246, 227, 192, ',  // Pale gold
        'rgba(230, 164, 180, ',  // Soft rose
        'rgba(255, 248, 235, '   // Ivory
      ];
      this.color = hues[Math.floor(Math.random() * hues.length)];
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.twinklePhase) * 0.2;
      this.twinklePhase += this.twinkleSpeed;
      if (this.y < -10 || this.x < -10 || this.x > pWidth + 10) {
        this.reset();
      }
    }
    draw(ctx) {
      const currentAlpha = Math.max(0.05, this.alpha + Math.sin(this.twinklePhase) * 0.25);
      ctx.fillStyle = this.color + currentAlpha + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    if (!pCanvas || !pCtx) return;
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const count = Math.min(Math.floor((pWidth * pHeight) / 12000), 75);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new StardustParticle());
    }
    loopParticles();
  }

  function loopParticles() {
    if (!pCtx) return;
    pCtx.clearRect(0, 0, pWidth, pHeight);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(pCtx);
    }
    animFrameId = requestAnimationFrame(loopParticles);
  }

  /* ==========================================================================
     2. FINALE CONFETTI & ROSE PETALS ENGINE
     ========================================================================== */
  const cCanvas = document.getElementById('confetti-canvas');
  let cCtx = cCanvas ? cCanvas.getContext('2d') : null;
  let confettiItems = [];
  let confettiRunning = false;
  let confettiTimer = null;

  function resizeConfetti() {
    if (!cCanvas) return;
    cCanvas.width = window.innerWidth;
    cCanvas.height = window.innerHeight;
  }

  class RosePetalAndGold {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * cCanvas.width;
      this.y = -20 - Math.random() * 50;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 1.8 + 1.2;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.angle = Math.random() * 360;
      this.spin = (Math.random() - 0.5) * 2;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = Math.random() * 0.04 + 0.02;
      this.isPetal = Math.random() > 0.45;
      if (this.isPetal) {
        this.color = Math.random() > 0.5 ? '#9e2246' : '#d84a75'; // Rich burgundy rose & soft rose
      } else {
        this.color = Math.random() > 0.5 ? '#dfba7a' : '#f5dfb8'; // Champagne gold
      }
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 1.2;
      this.angle += this.spin;
      this.flip += this.flipSpeed;
    }
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.scale(Math.cos(this.flip), 1);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      if (this.isPetal) {
        // Organic curve for rose petal
        ctx.moveTo(0, -this.size / 2);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 2, this.size / 2, 0, this.size / 2);
        ctx.bezierCurveTo(-this.size / 2, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
      } else {
        // Gold sequin
        ctx.rect(-this.size / 3, -this.size / 3, this.size / 1.5, this.size / 1.5);
      }
      ctx.fill();
      ctx.restore();
    }
  }

  function triggerCelebration(durationMs = 6000) {
    if (!cCanvas || !cCtx) return;
    resizeConfetti();
    confettiItems = [];
    const count = 65;
    for (let i = 0; i < count; i++) {
      confettiItems.push(new RosePetalAndGold());
    }
    confettiRunning = true;

    if (confettiTimer) clearTimeout(confettiTimer);
    confettiTimer = setTimeout(() => {
      confettiRunning = false;
      if (cCtx) cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
    }, durationMs);

    function runLoop() {
      if (!confettiRunning || !cCtx) return;
      cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
      for (let i = 0; i < confettiItems.length; i++) {
        confettiItems[i].update();
        confettiItems[i].draw(cCtx);
      }
      requestAnimationFrame(runLoop);
    }
    runLoop();
  }

  /* ==========================================================================
     3. AUDIO SYSTEM (Plays user song with first 15s skipped)
     ========================================================================== */
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioText = document.getElementById('audio-btn-text');
  let isPlaying = false;
  let audioElement = null;

  try {
    audioElement = new Audio();
    const candidateTracks = ['audio/song.aac', 'audio/song.mp3', 'audio/song.m4a', 'audio/full_song.aac'];
    let trackIdx = 0;

    function loadNextTrack() {
      if (trackIdx < candidateTracks.length) {
        audioElement.src = candidateTracks[trackIdx++];
        audioElement.load();
      }
    }

    audioElement.src = candidateTracks[0];
    trackIdx = 1;
    audioElement.loop = true;
    audioElement.volume = 0.65;

    // Double assurance: if full song is ever played, start strictly at 15.0s
    audioElement.addEventListener('play', () => {
      if (audioElement.src.includes('full_song') && audioElement.currentTime < 15) {
        audioElement.currentTime = 15;
      }
    });

    audioElement.addEventListener('error', loadNextTrack);
  } catch (e) {
    console.log('Audio init error:', e);
  }

  function startAudio() {
    if (!audioElement) return;
    isPlaying = true;
    if (audioBtn) {
      audioBtn.classList.add('playing');
      if (audioText) audioText.textContent = 'OUR SONG: PLAYING';
    }
    const playPromise = audioElement.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log('Playback waiting for interaction:', err);
      });
    }
  }

  function pauseAudio() {
    isPlaying = false;
    if (audioBtn) {
      audioBtn.classList.remove('playing');
      if (audioText) audioText.textContent = 'OUR SONG: PAUSED';
    }
    if (audioElement && !audioElement.paused) {
      audioElement.pause();
    }
  }

  function toggleAudio() {
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio();
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', toggleAudio);
  }

  /* ==========================================================================
     4. NAVIGATION, SCROLL SPY & PROGRESS
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const progressFill = document.getElementById('scroll-progress-fill');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navList = document.getElementById('nav-links-list');

  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
    // Close nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
      });
    });
  }

  function updateScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progressFill) {
      progressFill.style.width = Math.min(100, Math.max(0, progress)) + '%';
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  /* ==========================================================================
     5. HERO "ENTER MY LITTLE WORLD" BUTTON
     ========================================================================== */
  const enterBtn = document.getElementById('enter-world-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      const nextSection = document.getElementById('story');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
      // Start her song smoothly upon entering
      if (!isPlaying) {
        startAudio();
      }
    });
  }

  /* ==========================================================================
     6. WHY YOU ARE SO SPECIAL (7 REASONS DECK)
     ========================================================================== */
  const reasonsData = [
    {
      num: "01 / 07",
      badge: "Connection",
      text: "I've met so many people in this world, but I've never felt the kind of connection I feel with you."
    },
    {
      num: "02 / 07",
      badge: "Understanding",
      text: "Your understanding is something I cannot compare with anyone else."
    },
    {
      num: "03 / 07",
      badge: "Sanctuary",
      text: "You make me feel safe enough to be myself."
    },
    {
      num: "04 / 07",
      badge: "Devotion",
      text: "Even when you have your own family problems and difficulties, you try to stand beside me. I will always appreciate that."
    },
    {
      num: "05 / 07",
      badge: "Presence",
      text: "Your presence has become such an important part of my life."
    },
    {
      num: "06 / 07",
      badge: "Pure Joy",
      text: "You never need to do extraordinary things to make me happy. Just being yourself means so much to me."
    },
    {
      num: "07 / 07",
      badge: "Together Forever",
      text: "I want to understand you, respect you, support you, and keep growing together."
    }
  ];

  let currentReasonIdx = 0;
  const reasonNumEl = document.getElementById('reason-number');
  const reasonBadgeEl = document.getElementById('reason-badge');
  const reasonQuoteEl = document.getElementById('reason-quote');
  const reasonDotsContainer = document.getElementById('reason-dots');
  const prevReasonBtn = document.getElementById('prev-reason-btn');
  const nextReasonBtn = document.getElementById('next-reason-btn');

  // Render dots
  if (reasonDotsContainer) {
    reasonDotsContainer.innerHTML = '';
    reasonsData.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'reason-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to reason ${i + 1}`);
      dot.addEventListener('click', () => showReason(i));
      reasonDotsContainer.appendChild(dot);
    });
  }

  function showReason(index) {
    currentReasonIdx = (index + reasonsData.length) % reasonsData.length;
    const r = reasonsData[currentReasonIdx];

    if (reasonQuoteEl) {
      reasonQuoteEl.style.opacity = '0';
      reasonQuoteEl.style.transform = 'translateY(10px)';

      setTimeout(() => {
        if (reasonNumEl) reasonNumEl.textContent = r.num;
        if (reasonBadgeEl) reasonBadgeEl.textContent = r.badge;
        reasonQuoteEl.textContent = `“${r.text}”`;
        reasonQuoteEl.style.opacity = '1';
        reasonQuoteEl.style.transform = 'translateY(0)';
      }, 200);
    }

    if (reasonDotsContainer) {
      const dots = reasonDotsContainer.querySelectorAll('.reason-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentReasonIdx);
      });
    }
  }

  if (prevReasonBtn) {
    prevReasonBtn.addEventListener('click', () => showReason(currentReasonIdx - 1));
  }
  if (nextReasonBtn) {
    nextReasonBtn.addEventListener('click', () => showReason(currentReasonIdx + 1));
  }

  /* ==========================================================================
     7. THE PERSONAL LOVE LETTER (ENVELOPE INTERACTION)
     ========================================================================== */
  const openLetterBtn = document.getElementById('open-letter-btn');
  const waxSealBtn = document.getElementById('wax-seal');
  const envelopeBox = document.getElementById('envelope-box');
  const letterParchment = document.getElementById('letter-parchment-sheet');
  const resealLetterBtn = document.getElementById('reseal-letter-btn');

  function openLetter() {
    if (envelopeBox) envelopeBox.style.display = 'none';
    if (letterParchment) {
      letterParchment.style.display = 'block';
      letterParchment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Launch romantic stardust
    triggerCelebration(2500);
  }

  function resealLetter() {
    if (letterParchment) letterParchment.style.display = 'none';
    if (envelopeBox) {
      envelopeBox.style.display = 'block';
      envelopeBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  if (openLetterBtn) openLetterBtn.addEventListener('click', openLetter);
  if (waxSealBtn) waxSealBtn.addEventListener('click', openLetter);
  if (resealLetterBtn) resealLetterBtn.addEventListener('click', resealLetter);

  /* ==========================================================================
     8. PHOTO GALLERY LIGHTBOX & ELEGANT IMAGE HANDLER
     ========================================================================== */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const polaroidCards = document.querySelectorAll('.polaroid-card');

  polaroidCards.forEach(card => {
    function openCardLightbox() {
      const img = card.querySelector('img');
      const caption = card.querySelector('.polaroid-caption');
      if (img && img.style.display !== 'none' && img.src && !img.src.includes('error')) {
        if (lightboxImg) lightboxImg.src = img.src;
        if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
        if (lightboxModal) lightboxModal.classList.add('active');
      }
    }
    card.addEventListener('click', openCardLightbox);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardLightbox();
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('active');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Handle Missing Images with Luxury Placeholders
  window.handleImgError = function (imgEl) {
    if (!imgEl) return;
    imgEl.style.display = 'none';
    const parentFrame = imgEl.parentElement;
    if (parentFrame) {
      const placeholder = parentFrame.querySelector('.polaroid-placeholder');
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    }
  };

  /* ==========================================================================
     9. BIRTHDAY FINALE & CANDLE BLOW INTERACTION
     ========================================================================== */
  const candleFlame = document.getElementById('candle-flame');
  const blowCandleBtn = document.getElementById('blow-candle-btn');
  const replayExperienceBtn = document.getElementById('replay-experience-btn');
  let candleBlown = false;

  function blowCandle() {
    if (candleBlown) return;
    candleBlown = true;
    if (candleFlame) candleFlame.classList.add('extinguished');
    if (blowCandleBtn) {
      blowCandleBtn.textContent = '✨ WISH GRANTED WITH LOVE ✨';
      blowCandleBtn.style.background = 'var(--gold-primary)';
      blowCandleBtn.style.color = '#160713';
    }
    // Launch massive shower of rose petals and gold confetti
    triggerCelebration(8000);
  }

  if (candleFlame) candleFlame.addEventListener('click', blowCandle);
  if (blowCandleBtn) blowCandleBtn.addEventListener('click', blowCandle);

  if (replayExperienceBtn) {
    replayExperienceBtn.addEventListener('click', () => {
      // Reset candle state
      candleBlown = false;
      if (candleFlame) candleFlame.classList.remove('extinguished');
      if (blowCandleBtn) {
        blowCandleBtn.innerHTML = '<span>🕯️</span> MAKE A WISH & BLOW CANDLE';
        blowCandleBtn.style.background = '';
        blowCandleBtn.style.color = '';
      }
      // Reseal letter if opened
      resealLetter();
      // Scroll to welcome
      const welcome = document.getElementById('welcome');
      if (welcome) welcome.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     10. CUSTOM DESKTOP CURSOR
     ========================================================================== */
  const cursorRing = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');

  if (cursorRing && cursorDot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverables = document.querySelectorAll('button, a, .polaroid-card, .wax-seal, .candle-flame');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  }

  /* ==========================================================================
     11. INITIALIZATION ON LOAD
     ========================================================================== */
  window.addEventListener('DOMContentLoaded', () => {
    initParticles();
    showReason(0);
    updateScrollProgress();
  });

})();

