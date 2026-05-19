/**
 * sfx.js — enchanted sound effects for playground mini-games
 * Web Audio API for all synthesized tones; HTMLAudio for MP3 loops.
 * Stays silent until the first user gesture (browser autoplay policy).
 */
(function () {
  let ctx = null;
  let masterGain = null;
  let ready = false;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.6;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // ── MP3 loader ─────────────────────────────────────────────────────
  const mp3Cache = {};
  function loadMp3(key, src) {
    const a = new Audio(src);
    a.preload = 'auto';
    mp3Cache[key] = a;
  }
  loadMp3('pour1',   'sfx/sand-pour-long-sanken-01.mp3');
  loadMp3('pour2',   'sfx/sand-pour-long-sanken-02.mp3');
  loadMp3('cardBox', 'sfx/small-card-box-removing-an-item-mono copy.mp3');

  function playMp3(key, vol = 0.4, loop = false) {
    if (SFX.muted) return null;
    const src = mp3Cache[key];
    if (!src) return null;
    const clone = src.cloneNode();
    clone.volume = vol;
    clone.loop = loop;
    clone.play().catch(() => {});
    return clone;
  }

  // ── Primitive tone builder ─────────────────────────────────────────
  function tone(freq, type, t0, dur, peak, attack = 0.008, decay = 0.15) {
    const c = getCtx();
    const osc = c.createOscillator();
    const g   = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  // White-noise burst (for shake / clear whoosh)
  function noise(t0, dur, peak, hipass = 0) {
    const c    = getCtx();
    const rate = c.sampleRate;
    const buf  = c.createBuffer(1, Math.ceil(rate * dur), rate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const filt = c.createBiquadFilter();
    filt.type = 'highpass';
    filt.frequency.value = hipass;
    const g = c.createGain();
    g.gain.setValueAtTime(peak, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filt); filt.connect(g); g.connect(masterGain);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  // ── Pour-loop state ────────────────────────────────────────────────
  let pourNode   = null;
  let pourTimer  = null;
  let pourVolume = 0;

  function clearPourTimer() {
    if (pourTimer) { clearInterval(pourTimer); pourTimer = null; }
  }

  // ── Public API ─────────────────────────────────────────────────────
  const SFX = {
    muted: false,

    init() {
      if (ready) return;
      ready = true;
      getCtx();
    },

    setMuted(val) {
      SFX.muted = val;
      if (masterGain) masterGain.gain.value = val ? 0 : 0.6;
      if (val) SFX.pourStop();
    },

    // ── Half Moon ──────────────────────────────────────────────────

    // Card clicked (any click — tactile flip feel)
    cardFlip() {
      if (SFX.muted) return;
      playMp3('cardBox', 0.25);
    },

    // Correct moon phase selected — rising crystalline chime
    correct() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(523.25, 'sine', t,        0.45, 0.28);          // C5
      tone(659.25, 'sine', t + 0.10, 0.42, 0.22);          // E5
      tone(783.99, 'sine', t + 0.20, 0.50, 0.20);          // G5
      tone(1046.5,  'sine', t + 0.30, 0.30, 0.14, 0.005);  // C6 shimmer
    },

    // Wrong pick — soft descending hollow thud
    wrong() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      const osc = c.createOscillator();
      const g   = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.22);
      g.gain.setValueAtTime(0.22, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      osc.connect(g); g.connect(masterGain);
      osc.start(t); osc.stop(t + 0.32);
    },

    // Restart / shuffle cards — airy flutter
    shuffle() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      [380, 480, 350, 560, 420, 650, 300].forEach((f, i) =>
        tone(f, 'triangle', t + i * 0.05, 0.14, 0.14, 0.004, 0.12)
      );
    },

    // ── Palette Oracle ─────────────────────────────────────────────

    // Correct oracle answer — warm singing-bowl resonance
    oracleCorrect() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(440,  'sine', t,        0.9, 0.30, 0.01);       // A4 fundamental
      tone(880,  'sine', t + 0.04, 0.8, 0.18, 0.01);       // A5 overtone
      tone(1320, 'sine', t + 0.08, 0.6, 0.10, 0.008, 0.7); // E6 shimmer
    },

    // Wrong oracle answer — muted low pulse
    oracleWrong() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(180, 'sine', t,        0.18, 0.20);
      tone(160, 'sine', t + 0.08, 0.14, 0.18);
    },

    // Advance to next round — quiet breath/transition
    advance() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(660, 'sine', t, 0.22, 0.12, 0.006, 0.20);
      noise(t + 0.05, 0.12, 0.04, 2200);
    },

    // ── Palette Studio ─────────────────────────────────────────────

    // Lock a swatch — satisfying click-down
    lock() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(300, 'square', t,        0.05, 0.18, 0.002, 0.04);
      tone(450, 'square', t + 0.04, 0.06, 0.14, 0.002, 0.05);
    },

    // Unlock a swatch — lighter click-up
    unlock() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(450, 'square', t,        0.05, 0.14, 0.002, 0.04);
      tone(300, 'square', t + 0.04, 0.04, 0.10, 0.002, 0.04);
    },

    // Copy palette — bright clear ding
    copy() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(1046.5, 'sine', t,        0.22, 0.28, 0.01, 0.28);
      tone(1318.5, 'sine', t + 0.11, 0.18, 0.24, 0.01, 0.28);
    },

    // ── Sand Canvas ────────────────────────────────────────────────

    // Pick color from spectrum strip or preset dot — water-crystal ping
    colorPick() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      const f = 1000 + Math.random() * 600;
      tone(f,     'sine', t,        0.10, 0.20, 0.003, 0.09);
      tone(f * 1.5, 'sine', t + 0.04, 0.07, 0.12, 0.003, 0.07);
    },

    // Save single color to palette — soft pop
    paletteSave() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(880,  'sine', t,        0.09, 0.22, 0.004, 0.10);
      tone(1108, 'sine', t + 0.06, 0.09, 0.16, 0.004, 0.10);
    },

    // Add color to gradient builder — airy ascending note
    gradientAdd() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(740 + Math.random() * 180, 'sine', t, 0.10, 0.16, 0.004, 0.12);
    },

    // Save gradient entry — cascading sparkle arpeggio
    gradientSave() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone(f, 'sine', t + i * 0.08, 0.24, 0.20, 0.005, 0.20)
      );
    },

    // Shake the sand — soft granular rustle
    shake() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      for (let i = 0; i < 6; i++) noise(t + i * 0.07, 0.10, 0.07, 600);
      tone(160, 'sine', t + 0.04, 0.28, 0.10, 0.04, 0.28);
    },

    // Clear canvas — high whoosh
    clear() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      noise(t, 0.38, 0.28, 900);
      tone(200, 'sine', t, 0.16, 0.14, 0.01, 0.36);
    },

    // Double-tap continuous lock confirmed — two-note pulse
    continuousLock() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      tone(440, 'sine', t,        0.12, 0.24, 0.005, 0.14);
      tone(554, 'sine', t + 0.09, 0.12, 0.20, 0.005, 0.14);
    },

    // Sand pour loop — fade in MP3
    pourStart() {
      if (SFX.muted) return;
      clearPourTimer();
      if (pourNode) { pourNode.pause(); pourNode.currentTime = 0; pourNode = null; }
      const key = Math.random() < 0.5 ? 'pour1' : 'pour2';
      pourNode = playMp3(key, 0, true);
      if (!pourNode) return;
      pourVolume = 0;
      pourTimer = setInterval(() => {
        pourVolume = Math.min(pourVolume + 0.05, 0.32);
        if (pourNode) pourNode.volume = pourVolume;
        if (pourVolume >= 0.32) clearPourTimer();
      }, 25);
    },

    // Fade out and stop pour loop
    pourStop() {
      if (!pourNode) return;
      clearPourTimer();
      const node = pourNode;
      pourTimer = setInterval(() => {
        pourVolume = Math.max(pourVolume - 0.07, 0);
        node.volume = pourVolume;
        if (pourVolume <= 0) {
          node.pause();
          node.currentTime = 0;
          clearPourTimer();
          if (pourNode === node) pourNode = null;
        }
      }, 25);
    },

    // ── Game completion — shared ───────────────────────────────────
    // Magical ascending lunar fanfare
    complete() {
      if (SFX.muted) return;
      const c = getCtx(), t = c.currentTime;
      const melody = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 1046.5];
      melody.forEach((f, i) => {
        tone(f,     'sine', t + i * 0.12, 0.60, 0.28, 0.01, 0.50);
        tone(f * 2, 'sine', t + i * 0.12, 0.25, 0.08, 0.005, 0.30);
      });
      // Final sustaining chord
      [523.25, 659.25, 783.99, 1046.5].forEach(f =>
        tone(f, 'sine', t + 0.96, 1.4, 0.22, 0.02, 1.35)
      );
      noise(t + 0.5, 0.6, 0.06, 3000);
    }
  };

  window.SFX = SFX;

  // Wake up AudioContext on first user gesture (browser autoplay policy)
  ['pointerdown', 'keydown'].forEach(ev =>
    document.addEventListener(ev, () => SFX.init(), { once: true, passive: true })
  );
})();
