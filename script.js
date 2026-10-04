/* ========================================================
   RAKII'S 21st BIRTHDAY WEBSITE — INTERACTIVE LOGIC & SOUND
   ======================================================== */

// -------- SOUND FUNCTIONS (DISABLED) --------
// All click/touch sounds removed — only music jukebox plays audio
function getAudioContext() { return null; }
function playChime() { }
function playSparkleSound() { }
function playCardFlipSound() { }
function playFireworkSound() { }

// -------- HERO INTERACTIVE MINI TOOLS & GATEKEEPER --------
const heightRoasts = [
  "🦒 Rakii standing next to a coconut tree... the coconut tree feels like a tiny bonsai!",
  "🛰️ NASA called! They registered Rakii's head as an orbiting space satellite!",
  "🏫 When Rakii stands up in a classroom, the lecturer asks: 'Sir, why are you on the roof?'",
  "☁️ Rakii doesn't use an umbrella — he just reaches up and holds back the clouds directly!",
  "📶 Rakii gets 5G signals everywhere because his head is in the stratosphere!",
  "🚪 Doorways across Karnataka officially filed a grievance against Rakii for existing!"
];

const savantiMoods = [
  "💃 10:00 AM: 'Find a girl for me please! Every single day!'",
  "🧘 10:05 AM: 'Nah bro, I will follow Brahmachari forever!'",
  "💪 10:10 AM: 'I am super strong, you know!'",
  "🙋 10:15 AM: 'Hey Kulli! Hey Bakridi!'",
  "🎲 10:30 AM: 'Loses Ludo & says: Lucky shot bro, next time I'll cut you!'"
];

let roastIdx = 0;
let moodIdx = 0;
let kulliCount = 108;

function triggerHeightRoast() {
  playSparkleSound();
  const box = document.getElementById('heroInteractiveOutput');
  const txt = document.getElementById('heroOutputText');
  if (box && txt) {
    box.classList.remove('hidden');
    txt.innerText = heightRoasts[roastIdx % heightRoasts.length];
    roastIdx++;
  }
}

function spinMoodWheel() {
  playSparkleSound();
  const box = document.getElementById('heroInteractiveOutput');
  const txt = document.getElementById('heroOutputText');
  if (box && txt) {
    box.classList.remove('hidden');
    txt.innerText = savantiMoods[moodIdx % savantiMoods.length];
    moodIdx++;
  }
}

function triggerKulliPrank() {
  playSparkleSound();
  kulliCount++;
  const counterEl = document.getElementById('kulliCounterVal');
  if (counterEl) counterEl.innerText = kulliCount;

  const box = document.getElementById('heroInteractiveOutput');
  const txt = document.getElementById('heroOutputText');
  if (box && txt) {
    box.classList.remove('hidden');
    txt.innerText = `🚨 Official Log #${kulliCount}: Rakii just called you 'Kulli' or 'Bakridi' again! 😂`;
  }
}

function selectGateOption(choice) {
  playSparkleSound();
  const res = document.getElementById('gateResult');
  const btnContainer = document.getElementById('openingBtn');

  if (res) {
    res.classList.remove('hidden');
    if (choice === 'kulli') {
      res.innerHTML = "👑 <strong>CORRECT ANSWER!</strong> krishi kills more enemy &amp; she is the strength to your match and height roasting kingdom🤣! Archive Unlocked! 🔓";
    } else {
      res.innerHTML = "🦒 <strong>NICE TRY RAKII!</strong> 🤣 But we all know Krishi is the strength for the team and every single time she kills more🤣! Archive Unlocked anyway! 🔓";
    }
  }

  if (btnContainer) {
    btnContainer.classList.remove('hidden');
  }
}

// -------- START JOURNEY FROM FUNNY GREETING CARD --------
function startOurJourney() {
  playSparkleSound();
  const greetingSec = document.getElementById('bdayGreetingSection');
  const openingSec = document.getElementById('opening');
  const openingBtn = document.getElementById('openingBtn');

  if (greetingSec) greetingSec.classList.add('hidden');
  if (openingSec) {
    openingSec.classList.remove('hidden');
    openingSec.scrollIntoView({ behavior: 'smooth' });
  }
  if (openingBtn) {
    openingBtn.classList.remove('hidden');
  }

  // Trigger section observer and visibility updates
  if (typeof checkSectionVisibility === 'function') {
    checkSectionVisibility();
    setTimeout(checkSectionVisibility, 300);
    setTimeout(checkSectionVisibility, 800);
  }
}



// -------- KANNADA SOUNDTRACK JUKEBOX ENGINE --------
let isAudioPlaying = false;
let currentLocalAudio = null;

function playKannadaTrack(trackNum, title, artist, videoId) {
  const titleEl = document.getElementById('nowPlayingTitle');
  const artistEl = document.getElementById('nowPlayingArtist');
  const badgeEl = document.getElementById('nowPlayingBadge');
  const vinylEl = document.getElementById('vinylDisc');
  const eqEl = document.getElementById('equalizer');
  const frame = document.getElementById('activeMusicFrame');
  const wrapper = document.getElementById('playerFrameWrapper');
  const dot = document.getElementById('ytStatusDot');
  const btn = document.getElementById('ytPlayPauseBtn');
  const songLink = document.getElementById('directSongLink');

  if (titleEl) titleEl.textContent = title;
  if (artistEl) artistEl.textContent = artist;
  if (badgeEl) badgeEl.textContent = '♫ NOW PLAYING';
  if (vinylEl) vinylEl.classList.add('vinyl-spinning');
  if (eqEl) eqEl.classList.remove('hidden');
  if (dot) { dot.style.background = '#22c55e'; dot.style.boxShadow = '0 0 10px #22c55e'; }
  if (btn) btn.innerHTML = '&#9646;&#9646;';

  if (songLink) {
    songLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    songLink.style.display = 'inline-flex';
  }

  // Stop previous audio if active
  if (currentLocalAudio) {
    currentLocalAudio.pause();
    currentLocalAudio = null;
  }
  if (frame) { frame.src = ''; }
  if (wrapper) wrapper.style.display = 'none';

  // Try direct audio files (webm, mp3, m4a)
  const formats = [
    `audio/song${trackNum}.webm`,
    `audio/song${trackNum}.mp3`,
    `audio/song${trackNum}.m4a`
  ];

  let formatIndex = 0;
  function tryNextAudio() {
    if (formatIndex >= formats.length) {
      // Fallback to embedded player if local file blocked
      if (wrapper) wrapper.style.display = 'block';
      if (frame) {
        frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`;
      }
      isAudioPlaying = true;
      return;
    }

    const testAudio = new Audio(formats[formatIndex]);
    testAudio.play().then(() => {
      currentLocalAudio = testAudio;
      isAudioPlaying = true;
      testAudio.onended = () => {
        ytStop();
      };
    }).catch(() => {
      formatIndex++;
      tryNextAudio();
    });
  }

  tryNextAudio();

  // Highlight active track item
  document.querySelectorAll('.track-item').forEach((item, idx) => {
    item.classList.toggle('playing-track', idx === trackNum - 1);
  });
}

function ytTogglePlay() {
  const frame = document.getElementById('activeMusicFrame');
  const vinyl = document.getElementById('vinylDisc');
  const btn = document.getElementById('ytPlayPauseBtn');
  const dot = document.getElementById('ytStatusDot');

  if (currentLocalAudio) {
    if (isAudioPlaying) {
      currentLocalAudio.pause();
      isAudioPlaying = false;
      if (btn) btn.innerHTML = '&#9654;';
      if (vinyl) vinyl.classList.remove('vinyl-spinning');
      if (dot) { dot.style.background = '#374151'; dot.style.boxShadow = 'none'; }
    } else {
      currentLocalAudio.play();
      isAudioPlaying = true;
      if (btn) btn.innerHTML = '&#9646;&#9646;';
      if (vinyl) vinyl.classList.add('vinyl-spinning');
      if (dot) { dot.style.background = '#22c55e'; dot.style.boxShadow = '0 0 10px #22c55e'; }
    }
    return;
  }

  if (!frame || !frame.src) return;

  if (isAudioPlaying) {
    frame.dataset.savedSrc = frame.src;
    frame.src = '';
    isAudioPlaying = false;
    if (btn) btn.innerHTML = '&#9654;';
    if (vinyl) vinyl.classList.remove('vinyl-spinning');
    if (dot) { dot.style.background = '#374151'; dot.style.boxShadow = 'none'; }
  } else {
    if (frame.dataset.savedSrc) {
      frame.src = frame.dataset.savedSrc;
    }
    isAudioPlaying = true;
    if (btn) btn.innerHTML = '&#9646;&#9646;';
    if (vinyl) vinyl.classList.add('vinyl-spinning');
    if (dot) { dot.style.background = '#22c55e'; dot.style.boxShadow = '0 0 10px #22c55e'; }
  }
}

function ytStop() {
  if (currentLocalAudio) {
    currentLocalAudio.pause();
    currentLocalAudio = null;
  }

  const frame = document.getElementById('activeMusicFrame');
  const vinyl = document.getElementById('vinylDisc');
  const eq = document.getElementById('equalizer');
  const badge = document.getElementById('nowPlayingBadge');
  const title = document.getElementById('nowPlayingTitle');
  const artist = document.getElementById('nowPlayingArtist');
  const dot = document.getElementById('ytStatusDot');
  const btn = document.getElementById('ytPlayPauseBtn');
  const songLink = document.getElementById('directSongLink');

  if (frame) { frame.src = ''; frame.dataset.savedSrc = ''; }
  isAudioPlaying = false;
  if (btn) btn.innerHTML = '&#9654;';
  if (vinyl) vinyl.classList.remove('vinyl-spinning');
  if (eq) eq.classList.add('hidden');
  if (dot) { dot.style.background = '#374151'; dot.style.boxShadow = 'none'; }
  if (badge) badge.textContent = 'JUKEBOX READY';
  if (title) title.textContent = 'Select a Kannada Song Below 🎧';
  if (artist) artist.textContent = '5 Curated Kannada Tracks for Rakii\'s Birthday';
  if (songLink) songLink.style.display = 'none';
  document.querySelectorAll('.track-item').forEach(i => i.classList.remove('playing-track'));
}



// -------- PARTICLE CANVAS SYSTEM --------
let canvas, ctx, particles = [];

function initParticleCanvas() {
  canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.6 + 0.2;
    this.gold = Math.random() > 0.4;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.gold ? `rgba(212, 175, 55, ${this.alpha})` : `rgba(255, 255, 255, ${this.alpha * 0.7})`;
    ctx.fill();
  }
}

  for (let i = 0; i < 70; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// -------- OPENING BUTTON REVEAL --------
function revealJoined() {
  playSparkleSound();
  const btn = document.getElementById('openingBtn');
  const reveal = document.getElementById('joinedReveal');
  const section1 = document.getElementById('section1');

  if (btn) btn.classList.add('hidden');
  if (reveal) reveal.classList.remove('hidden');

  if (section1) {
    section1.scrollIntoView({ behavior: 'smooth' });
  }

  if (typeof checkSectionVisibility === 'function') {
    checkSectionVisibility();
    setTimeout(checkSectionVisibility, 400);
  }
}

// -------- INTERSECTION OBSERVER FOR REVEAL SECTIONS --------
const observerOptions = { threshold: 0.05, rootMargin: '0px 0px -20px 0px' };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      const storyBlocks = entry.target.querySelectorAll('.story-block');
      storyBlocks.forEach(b => b.classList.add('in-view'));

      if (entry.target.id === 'section5') {
        animateNames();
      }

      if (entry.target.id === 'finalSection') {
        triggerFinalSequence();
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-section, .final-section').forEach(sec => {
  sectionObserver.observe(sec);
});

// Fallback visibility check on load & scroll
function checkSectionVisibility() {
  document.querySelectorAll('.reveal-section').forEach(sec => {
    sec.classList.add('visible');
    sec.querySelectorAll('.story-block').forEach(b => b.classList.add('in-view'));
  });
}
window.addEventListener('scroll', checkSectionVisibility);
window.addEventListener('load', checkSectionVisibility);
document.addEventListener('DOMContentLoaded', checkSectionVisibility);
setTimeout(checkSectionVisibility, 100);
setTimeout(checkSectionVisibility, 300);

// -------- TIMELINE MEMORY TOGGLE --------
function toggleMemory(item) {
  const memory = item.querySelector('.timeline-memory');
  if (memory) {
    memory.classList.toggle('hidden');
  }
}

// -------- 3D MASTI CARD FLIP --------
function flip3DCard(card) {
  playCardFlipSound();
  card.classList.toggle('flipped');
}

// -------- NAME EXCHANGE ANIMATION --------
let namesAnimated = false;
function animateNames() {
  if (namesAnimated) return;
  namesAnimated = true;

  const allBigNames = document.querySelectorAll('.big-name');
  allBigNames.forEach(el => {
    const delay = parseInt(el.getAttribute('data-delay')) || 0;
    setTimeout(() => {
      el.classList.add('name-visible');
    }, delay);
  });
}

// -------- LIGHTBOX MODAL FOR REAL PHOTOS --------
function openLightbox(el, title, caption) {
  playSparkleSound();
  const lightbox = document.getElementById('lightbox');
  const imgWrap = document.getElementById('lightboxImageContainer');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');

  let imgTag = el.querySelector('img');
  if (imgTag) {
    imgWrap.innerHTML = `<img src="${imgTag.src}" alt="${title}" />`;
  } else {
    imgWrap.innerHTML = `<div style="font-size: 5rem; padding: 40px;">📸</div>`;
  }

  titleEl.innerText = title;
  captionEl.innerText = caption;
  lightbox.classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

// -------- KANNADA KAVANA POEM REVEAL --------
function revealKavana() {
  playSparkleSound();
  const poem = document.getElementById('kavanaPoem');
  poem.classList.remove('hidden');

  const lines = poem.querySelectorAll('.kavana-line');
  lines.forEach(line => {
    const delay = parseInt(line.getAttribute('data-delay')) || 0;
    setTimeout(() => {
      line.classList.add('poem-visible');
    }, delay);
  });
}

// -------- ENVELOPE & LETTER --------
function openEnvelope() {
  const env = document.getElementById('envelope');
  const letter = document.getElementById('letterContent');
  const container = document.getElementById('envelopeContainer');

  env.classList.add('open');

  setTimeout(() => {
    container.style.transition = 'all 0.5s ease';
    container.style.opacity = '0';
    container.style.transform = 'scale(0.85)';
  }, 400);

  setTimeout(() => {
    container.classList.add('hidden');
    letter.classList.remove('hidden');
  }, 900);
}

// -------- FINAL SEQUENCE & FIREWORKS --------
let finalTriggered = false;
function triggerFinalSequence() {
  if (finalTriggered) return;
  finalTriggered = true;

  startFireworks();

  const fl10 = document.getElementById('fl10');
  if (fl10) fl10.classList.add('revealed');

  const cakeSec = document.getElementById('cakeSurpriseSection');
  if (cakeSec) cakeSec.classList.add('cake-visible');

  const star = document.getElementById('secretStar');
  if (star) star.classList.remove('hidden');
}


// -------- MAKE A WISH & BLOW CANDLES INTERACTION --------
function makeAWish() {
  playSparkleSound();
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  if (step1 && step2) {
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
  }
}

function blowCandles() {
  playSparkleSound();

  // Extinguish candles one by one with smoke puff
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const candle = document.getElementById(`candle${i}`);
      const smoke = document.getElementById(`smoke${i}`);
      if (candle) candle.classList.add('blown');
      if (smoke) smoke.classList.add('puffing');
    }, i * 180);
  }

  // Extra celebratory fireworks!
  if (typeof launchFirework === 'function') {
    for (let f = 0; f < 8; f++) {
      setTimeout(launchFirework, f * 200);
    }
  }

  // Show Wish Granted Card (step3) after candles are blown out
  setTimeout(() => {
    const step1 = document.getElementById('step1');
    const step3 = document.getElementById('step3');

    if (step1) step1.classList.add('hidden');
    if (step3) step3.classList.remove('hidden');
  }, 1100);
}



// -------- FIREWORKS CANVAS LOGIC --------
let fwCanvas, fwCtx;
let fireworks = [];

function initFireworksCanvas() {
  fwCanvas = document.getElementById('fireworksCanvas');
  if (!fwCanvas) return;
  fwCtx = fwCanvas.getContext('2d');

  function resizeFwCanvas() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFwCanvas);
  resizeFwCanvas();
}

class FireworkParticle {
  constructor(x, y, color) {
    this.x = x; this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.velocity = {
      x: (Math.random() - 0.5) * (Math.random() * 8 + 2),
      y: (Math.random() - 0.5) * (Math.random() * 8 + 2)
    };
    this.alpha = 1;
    this.friction = 0.96;
    this.gravity = 0.08;
  }
  draw() {
    fwCtx.save();
    fwCtx.globalAlpha = this.alpha;
    fwCtx.beginPath();
    fwCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    fwCtx.fillStyle = this.color;
    fwCtx.fill();
    fwCtx.restore();
  }
  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.015;
  }
}

function launchFirework() {
  if (!fwCanvas) return;
  const x = Math.random() * fwCanvas.width;
  const y = Math.random() * (fwCanvas.height * 0.5);
  const colors = ['#d4af37', '#f7e4a1', '#ffffff', '#3b82f6', '#9333ea', '#ef4444'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 40; i++) {
    fireworks.push(new FireworkParticle(x, y, color));
  }
}

function startFireworks() {
  if (!fwCanvas || !fwCtx) { initFireworksCanvas(); }
  if (!fwCanvas) return;
  setInterval(launchFirework, 1400);

  function animateFw() {
    fwCtx.fillStyle = 'rgba(4, 8, 20, 0.2)';
    fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);

    fireworks.forEach((p, idx) => {
      if (p.alpha > 0) {
        p.update();
        p.draw();
      } else {
        fireworks.splice(idx, 1);
      }
    });
    requestAnimationFrame(animateFw);
  }
  animateFw();
}

// -------- SECRET STAR REVEAL --------
function revealSecret() {
  playSparkleSound();
  document.getElementById('secretMessage').classList.remove('hidden');
}

function closeSecret() {
  document.getElementById('secretMessage').classList.add('hidden');
}

// -------- CLAIM AWARD INTERACTION --------
function claimAward(card, awardTitle) {
  playSparkleSound();
  card.classList.add('award-claimed');
  setTimeout(() => card.classList.remove('award-claimed'), 600);

  let toast = document.getElementById('awardToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'awardToast';
    toast.className = 'award-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `🏆 <strong>${awardTitle}</strong> officially awarded to Rakii! 🎉`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// -------- INITIALISE ON DOM READY --------
document.addEventListener('DOMContentLoaded', function() {
  initParticleCanvas();
  initFireworksCanvas();
  checkSectionVisibility();
});

