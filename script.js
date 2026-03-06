/**
 * Birthday Surprise - Maria
 * Confetti, Music, and Gallery functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initPuzzleIntro();
});

function onPuzzleComplete() {
  initConfetti();
  initMusicPlayer();
  initGallery();
  initTapHearts();
  initHiddenLoveNote();
  initStoryAnimations();
}

/* ============================================
   Puzzle Intro
   ============================================ */

function initPuzzleIntro() {
  const overlay = document.getElementById('puzzle-overlay');
  const mainContent = document.getElementById('main-content');
  const pieces = document.querySelectorAll('.puzzle-piece');

  if (!overlay || !mainContent || pieces.length === 0) {
    mainContent?.classList.remove('hidden');
    onPuzzleComplete();
    return;
  }

  const scatterPositions = [
    { x: -120, y: -80 },
    { x: 150, y: -100 },
    { x: -100, y: 120 },
    { x: 130, y: 90 },
  ];

  pieces.forEach((piece, i) => {
    const pos = scatterPositions[i] || { x: 0, y: 0 };
    piece.style.transform = `translate(${pos.x}%, ${pos.y}%) scale(0.5)`;
    piece.style.opacity = '0';
  });

  setTimeout(() => {
    pieces.forEach((piece, i) => {
      setTimeout(() => {
        piece.style.transform = 'translate(0, 0) scale(1)';
        piece.style.opacity = '1';
      }, i * 120);
    });
  }, 400);

  setTimeout(() => {
    overlay.classList.add('hidden');
    mainContent.classList.remove('hidden');
    setTimeout(() => {
      overlay.style.display = 'none';
      onPuzzleComplete();
    }, 800);
  }, 2400);
}

/* ============================================
   Confetti Effect
   ============================================ */

function initConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  const colors = ['#e8a0a8', '#c97b84', '#9d4b6b', '#f8e1e7', '#d4a574', '#fff5f7'];
  const particleCount = 80;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
      shape: Math.random() > 0.5 ? 'circle' : 'square',
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;

    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    }

    ctx.restore();
  }

  function updateParticle(p) {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    if (p.y > height + 20) {
      p.y = -20;
      p.x = Math.random() * width;
    }
    if (p.x > width + 20) p.x = -20;
    if (p.x < -20) p.x = width + 20;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      drawParticle(p);
      updateParticle(p);
    });

    requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
}

/* ============================================
   Music Player
   ============================================ */

function initMusicPlayer() {
  const toggleBtn = document.getElementById('music-toggle');
  const audio = document.getElementById('birthday-music');
  const musicLabel = toggleBtn?.querySelector('.music-label');

  if (!toggleBtn || !audio) return;

  toggleBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch((err) => {
        console.warn('Audio play failed:', err);
      });
      toggleBtn.classList.add('playing');
      if (musicLabel) musicLabel.textContent = 'Pause';
    } else {
      audio.pause();
      toggleBtn.classList.remove('playing');
      if (musicLabel) musicLabel.textContent = 'Play our song';
    }
  });

  audio.addEventListener('ended', () => {
    toggleBtn.classList.remove('playing');
    if (musicLabel) musicLabel.textContent = 'Play our song';
  });

  // Auto-play when page is ready (after puzzle)
  audio.play().then(() => {
    toggleBtn.classList.add('playing');
    if (musicLabel) musicLabel.textContent = 'Pause';
  }).catch(() => {
    // Autoplay blocked by browser - user can click to play
  });
}

/* ============================================
   Photo Gallery with Lightbox
   ============================================ */

function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox-content');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;
    item.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ============================================
   Tap to Add Hearts
   ============================================ */

function initTapHearts() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  mainContent.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const heart = document.createElement('span');
    heart.className = 'tap-heart';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  });
}

/* ============================================
   Hidden Love Note (click Maria's name)
   ============================================ */

function initHiddenLoveNote() {
  const nameEl = document.querySelector('.hero-title .name');
  const modal = document.getElementById('love-note-modal');
  const modalClose = document.querySelector('.love-note-close');

  if (!nameEl || !modal) return;

  nameEl.style.cursor = 'pointer';
  nameEl.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ============================================
   Story Scroll Animations
   ============================================ */

function initStoryAnimations() {
  const steps = document.querySelectorAll('.story-step');
  if (!steps.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  steps.forEach((step) => observer.observe(step));
}
