document.addEventListener("DOMContentLoaded", () => {
  const container  = document.getElementById("hm-cards");
  const statusEl   = document.getElementById("hm-status");
  const restartBtn = document.getElementById("hm-restart");

  if (!container || !statusEl || !restartBtn) return;

  const CARD_BACK       = "moon_phases/closed-moon-card.png";
  const PREVIEW_SECS    = 4;    // seconds to show all cards before hiding
  const REVEAL_DELAY    = 480;  // ms after flip-up before judging the pick
  const WRONG_HOLD      = 900;  // ms to show wrong state before flipping back

  // Preload back image so the first flip doesn't flicker
  new Image().src = CARD_BACK;

  const phases = [
    { id: 0, label: "New Moon",        img: "moon_phases/moon_01_new copy.png" },
    { id: 1, label: "Waxing Crescent", img: "moon_phases/moon_02_waxing_crescent copy.png" },
    { id: 2, label: "First Quarter",   img: "moon_phases/moon_03_first_quarter copy.png" },
    { id: 3, label: "Waxing Gibbous",  img: "moon_phases/moon_04_waxing_gibbous copy.png" },
    { id: 4, label: "Full Moon",       img: "moon_phases/moon_05_full copy.png" },
    { id: 5, label: "Waning Gibbous",  img: "moon_phases/moon_06_waning_gibbous copy.png" },
    { id: 6, label: "Third Quarter",   img: "moon_phases/moon_07_third_quarter copy.png" },
    { id: 7, label: "Waning Crescent", img: "moon_phases/moon_08_waning_crescent copy.png" }
  ];

  // ── Game state ──────────────────────────────────────────────────────
  let expectedIndex  = 0;
  let gamePhase      = "preview"; // "preview" | "playing" | "complete"
  let revealing      = false;     // blocks input while a card is being judged
  let countdownTimer = null;
  let mistakeCount   = 0;

  // ── Status text ─────────────────────────────────────────────────────
  function setStatus(text) { statusEl.textContent = text; }

  function updatePlayStatus() {
    if (expectedIndex >= phases.length) return;
    const next = phases[expectedIndex];
    setStatus(expectedIndex === 0
      ? `Find the ${next.label} — the darkest phase.`
      : `Good. Now find: ${next.label}.`
    );
  }

  // ── Build card DOM ──────────────────────────────────────────────────
  function createCard(phase) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hm-card aspect-[3/4]";
    btn.dataset.phaseId = String(phase.id);

    btn.innerHTML = `
      <div class="hm-card__inner">
        <div class="hm-card__face hm-card__front">
          <img src="${phase.img}" alt="${phase.label}" class="hm-card__img">
          <div class="hm-card__label">${phase.label}</div>
        </div>
        <div class="hm-card__face hm-card__back">
          <img src="${CARD_BACK}" alt="" class="hm-card__back-img">
        </div>
      </div>`;

    btn.addEventListener("click", () => handleCardClick(btn, phase));
    return btn;
  }

  // ── Flip helpers ────────────────────────────────────────────────────
  function faceDown(card) { card.classList.add("hm-card--face-down"); }
  function faceUp(card)   { card.classList.remove("hm-card--face-down"); }

  // ── Click handler ───────────────────────────────────────────────────
  function handleCardClick(cardEl, phase) {
    if (gamePhase !== "playing") return;
    if (revealing) return;
    if (cardEl.classList.contains("hm-card--locked")) return;
    if (!cardEl.classList.contains("hm-card--face-down")) return;

    window.SFX?.cardFlip();
    revealing = true;
    faceUp(cardEl);

    setTimeout(() => {
      const correctPhase = phases[expectedIndex];

      if (phase.id === correctPhase.id) {
        window.SFX?.correct();
        cardEl.classList.add("hm-card--correct", "hm-card--locked");
        cardEl.disabled = true;
        expectedIndex++;

        if (expectedIndex >= phases.length) {
          gamePhase = "complete";
          setStatus("You remembered the full lunar cycle! 🌕🌙");
          if (typeof window.showGameComplete === "function") {
            window.setTimeout(() => window.showGameComplete("halfmoon"), 700);
          }
        } else {
          updatePlayStatus();
        }
        revealing = false;

      } else {
        mistakeCount++;
        window.SFX?.wrong();
        cardEl.classList.add("hm-card--wrong");
        setStatus(`That's ${phase.label}. Keep looking for ${phases[expectedIndex].label}.`);

        setTimeout(() => {
          cardEl.classList.remove("hm-card--wrong");
          faceDown(cardEl);
          revealing = false;
        }, WRONG_HOLD);
      }
    }, REVEAL_DELAY);
  }

  // ── Preview + cascade flip ──────────────────────────────────────────
  function startPreview(cards) {
    gamePhase = "preview";
    revealing = false;
    cards.forEach(c => { c.disabled = true; });

    let secondsLeft = PREVIEW_SECS;
    setStatus(`Memorise the phases — ${secondsLeft}…`);

    countdownTimer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft > 0) {
        setStatus(`Memorise the phases — ${secondsLeft}…`);
      } else {
        clearInterval(countdownTimer);
        countdownTimer = null;
        cascadeFlipDown(cards);
      }
    }, 1000);
  }

  function cascadeFlipDown(cards) {
    // Play one whoosh at the start of the cascade
    window.SFX?.shuffle();

    cards.forEach((c, i) => {
      c.disabled = false;
      setTimeout(() => faceDown(c), i * 90);
    });

    // Wait for the last card to finish its flip animation before enabling play
    setTimeout(() => {
      gamePhase = "playing";
      updatePlayStatus();
    }, cards.length * 90 + 620);
  }

  // ── Shuffle ─────────────────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── Init ────────────────────────────────────────────────────────────
  function initializeGame() {
    if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
    expectedIndex = 0;
    mistakeCount  = 0;
    gamePhase     = "preview";
    revealing     = false;

    container.innerHTML = "";
    const cards = shuffle(phases).map(phase => {
      const card = createCard(phase);
      container.appendChild(card);
      return card;
    });

    // Give the browser one frame to paint the face-up cards before the timer starts
    requestAnimationFrame(() => setTimeout(() => startPreview(cards), 80));
  }

  restartBtn.addEventListener("click", () => {
    initializeGame();
  });

  initializeGame();
});
