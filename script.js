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



// -------- NATIVE DIRECT AUDIO & SYNTH JUKEBOX ENGINE --------
let isAudioPlaying = false;
let currentLocalAudio = null;
let currentTrackNum = 0;
let audioCtx = null;
let synthTimers = [];

function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function stopSynthMelody() {
  synthTimers.forEach(t => clearTimeout(t));
  synthTimers = [];
}

function playSynthNote(freq, type = 'sine', duration = 0.45, timeOffset = 0, volume = 0.15) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

    gain.gain.setValueAtTime(0.001, ctx.currentTime + timeOffset);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + timeOffset + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + timeOffset);
    osc.stop(ctx.currentTime + timeOffset + duration);
  } catch (e) {}
}

const synthMelodies = {
  1: [ // Kavithe Kavithe — Romantic Flute/Synth Melody
    { n: 261.63, d: 0.5 }, { n: 329.63, d: 0.5 }, { n: 392.00, d: 0.5 }, { n: 523.25, d: 0.9 },
    { n: 440.00, d: 0.5 }, { n: 392.00, d: 0.5 }, { n: 329.63, d: 0.5 }, { n: 293.66, d: 0.9 },
    { n: 349.23, d: 0.5 }, { n: 392.00, d: 0.5 }, { n: 440.00, d: 0.5 }, { n: 523.25, d: 0.9 },
    { n: 493.88, d: 0.5 }, { n: 440.00, d: 0.5 }, { n: 392.00, d: 0.5 }, { n: 329.63, d: 1.2 }
  ],
  2: [ // Happy (AllOk) — Upbeat Dance Arpeggio
    { n: 523.25, d: 0.25 }, { n: 523.25, d: 0.25 }, { n: 659.25, d: 0.25 }, { n: 783.99, d: 0.5 },
    { n: 659.25, d: 0.25 }, { n: 783.99, d: 0.25 }, { n: 880.00, d: 0.5 }, { n: 783.99, d: 0.5 },
    { n: 659.25, d: 0.25 }, { n: 523.25, d: 0.25 }, { n: 587.33, d: 0.5 }, { n: 523.25, d: 0.9 }
  ],
  3: [ // Friendship — Heartfelt Acoustic Anthem
    { n: 392.00, d: 0.6 }, { n: 440.00, d: 0.4 }, { n: 523.25, d: 0.6 }, { n: 587.33, d: 0.6 },
    { n: 659.25, d: 0.8 }, { n: 587.33, d: 0.4 }, { n: 523.25, d: 0.6 }, { n: 440.00, d: 0.8 },
    { n: 523.25, d: 0.6 }, { n: 659.25, d: 0.6 }, { n: 783.99, d: 1.3 }
  ],
  4: [ // Lokada Kalaji — Folk Rhythm Strumming
    { n: 329.63, d: 0.35 }, { n: 392.00, d: 0.35 }, { n: 440.00, d: 0.35 }, { n: 493.88, d: 0.55 },
    { n: 440.00, d: 0.35 }, { n: 392.00, d: 0.35 }, { n: 329.63, d: 0.55 }, { n: 293.66, d: 0.55 },
    { n: 329.63, d: 0.35 }, { n: 392.00, d: 0.35 }, { n: 440.00, d: 0.75 }
  ],
  5: [ // Nee Sigoovaregu — Expressive Soaring Ballad
    { n: 440.00, d: 0.7 }, { n: 523.25, d: 0.5 }, { n: 659.25, d: 0.7 }, { n: 783.99, d: 0.9 },
    { n: 698.46, d: 0.5 }, { n: 659.25, d: 0.5 }, { n: 587.33, d: 0.7 }, { n: 523.25, d: 1.4 }
  ]
};

function startSynthLoop(trackNum) {
  stopSynthMelody();
  const sequence = synthMelodies[trackNum] || synthMelodies[1];
  let accumulatedTime = 0;

  function scheduleSequence() {
    accumulatedTime = 0;
    sequence.forEach(item => {
      const t = setTimeout(() => {
        if (isAudioPlaying) {
          playSynthNote(item.n, 'triangle', item.d, 0, 0.18);
          // Play harmonic bass note
          playSynthNote(item.n / 2, 'sine', item.d * 1.2, 0, 0.12);
        }
      }, accumulatedTime * 1000);
      synthTimers.push(t);
      accumulatedTime += item.d;
    });

    // Loop sequence continuously
    const loopTimer = setTimeout(() => {
      if (isAudioPlaying && !currentLocalAudio) {
        scheduleSequence();
      }
    }, accumulatedTime * 1000);
    synthTimers.push(loopTimer);
  }

  scheduleSequence();
}

function playKannadaTrack(trackNum, title, artist) {
  currentTrackNum = trackNum;
  const titleEl = document.getElementById('nowPlayingTitle');
  const artistEl = document.getElementById('nowPlayingArtist');
  const badgeEl = document.getElementById('nowPlayingBadge');
  const vinylEl = document.getElementById('vinylDisc');
  const eqEl = document.getElementById('equalizer');
  const dot = document.getElementById('ytStatusDot');
  const btn = document.getElementById('ytPlayPauseBtn');

  if (titleEl) titleEl.textContent = title;
  if (artistEl) artistEl.textContent = artist;
  if (vinylEl) vinylEl.classList.add('vinyl-spinning');
  if (eqEl) eqEl.classList.remove('hidden');
  if (dot) { dot.style.background = '#22c55e'; dot.style.boxShadow = '0 0 10px #22c55e'; }
  if (btn) btn.innerHTML = '&#9646;&#9646;';

  // Stop previous local audio and synth
  if (currentLocalAudio) {
    currentLocalAudio.pause();
    currentLocalAudio = null;
  }
  stopSynthMelody();

  isAudioPlaying = true;

  // Check if local MP3 file exists (audio/song1.mp3 ... song5.mp3)
  const localAudioPath = `audio/song${trackNum}.mp3`;
  const testAudio = new Audio(localAudioPath);

  testAudio.play().then(() => {
    // MP3 file found & playing!
    currentLocalAudio = testAudio;
    if (badgeEl) badgeEl.textContent = '♫ NOW PLAYING (AUDIO FILE)';
  }).catch(() => {
    // MP3 file not found or empty — play Web Audio Melodic Synth!
    if (badgeEl) badgeEl.textContent = '♫ NOW PLAYING (DIRECT MELODY)';
    startSynthLoop(trackNum);
  });

  // Highlight active track item
  document.querySelectorAll('.track-item').forEach((item, idx) => {
    item.classList.toggle('playing-track', idx === trackNum - 1);
  });
}

function loadCustomMP3(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (currentLocalAudio) {
    currentLocalAudio.pause();
    currentLocalAudio = null;
  }
  stopSynthMelody();

  const fileUrl = URL.createObjectURL(file);
  const audio = new Audio(fileUrl);
  currentLocalAudio = audio;
  isAudioPlaying = true;

  audio.play().then(() => {
    const titleEl = document.getElementById('nowPlayingTitle');
    const artistEl = document.getElementById('nowPlayingArtist');
    const badgeEl = document.getElementById('nowPlayingBadge');
    const vinylEl = document.getElementById('vinylDisc');
    const eqEl = document.getElementById('equalizer');
    const dot = document.getElementById('ytStatusDot');
    const btn = document.getElementById('ytPlayPauseBtn');

    if (titleEl) titleEl.textContent = file.name;
    if (artistEl) artistEl.textContent = 'Custom Device Track';
    if (badgeEl) badgeEl.textContent = '♫ NOW PLAYING (YOUR MP3)';
    if (vinylEl) vinylEl.classList.add('vinyl-spinning');
    if (eqEl) eqEl.classList.remove('hidden');
    if (dot) { dot.style.background = '#22c55e'; dot.style.boxShadow = '0 0 10px #22c55e'; }
    if (btn) btn.innerHTML = '&#9646;&#9646;';
  });
}

function ytTogglePlay() {
  const vinyl = document.getElementById('vinylDisc');
  const btn = document.getElementById('ytPlayPauseBtn');
  const dot = document.getElementById('ytStatusDot');

  if (isAudioPlaying) {
    if (currentLocalAudio) currentLocalAudio.pause();
    stopSynthMelody();
    isAudioPlaying = false;
    if (btn) btn.innerHTML = '&#9654;';
    if (vinyl) vinyl.classList.remove('vinyl-spinning');
    if (dot) { dot.style.background = '#374151'; dot.style.boxShadow = 'none'; }
  } else {
    isAudioPlaying = true;
    if (btn) btn.innerHTML = '&#9646;&#9646;';
    if (vinyl) vinyl.classList.add('vinyl-spinning');
    if (dot) { dot.style.background = '#22c55e'; dot.style.boxShadow = '0 0 10px #22c55e'; }

    if (currentLocalAudio) {
      currentLocalAudio.play();
    } else if (currentTrackNum > 0) {
      startSynthLoop(currentTrackNum);
    } else {
      playKannadaTrack(1, 'Kavithe Kavithe 🎵', 'Yuva — Sanjith Hegde & Ajaneesh Loknath');
    }
  }
}

function ytStop() {
  if (currentLocalAudio) {
    currentLocalAudio.pause();
    currentLocalAudio = null;
  }
  stopSynthMelody();
  isAudioPlaying = false;

  const vinyl = document.getElementById('vinylDisc');
  const eq = document.getElementById('equalizer');
  const badge = document.getElementById('nowPlayingBadge');
  const title = document.getElementById('nowPlayingTitle');
  const artist = document.getElementById('nowPlayingArtist');
  const dot = document.getElementById('ytStatusDot');
  const btn = document.getElementById('ytPlayPauseBtn');

  if (btn) btn.innerHTML = '&#9654;';
  if (vinyl) vinyl.classList.remove('vinyl-spinning');
  if (eq) eq.classList.add('hidden');
  if (dot) { dot.style.background = '#374151'; dot.style.boxShadow = 'none'; }
  if (badge) badge.textContent = 'JUKEBOX READY';
  if (title) title.textContent = 'Select a Kannada Song Below 🎧';
  if (artist) artist.textContent = '5 Curated Kannada Tracks for Rakii\'s Birthday';
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

