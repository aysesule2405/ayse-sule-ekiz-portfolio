document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("hm-cards");
  const statusEl = document.getElementById("hm-status");
  const restartBtn = document.getElementById("hm-restart");

  if (!container || !statusEl || !restartBtn) return;

  // Ordered from darkest to brightest
  const phases = [
    { id: 0, label: "New Moon", icon: "🌑" },
    { id: 1, label: "Waxing Crescent", icon: "🌒" },
    { id: 2, label: "First Quarter", icon: "🌓" },
    { id: 3, label: "Waxing Gibbous", icon: "🌔" },
    { id: 4, label: "Full Moon", icon: "🌕" },
    { id: 5, label: "Waning Gibbous", icon: "🌖" },
    { id: 6, label: "Last Quarter", icon: "🌗" },
    { id: 7, label: "Waning Crescent", icon: "🌘" }
  ];

  let expectedIndex = 0; // which phase we expect next (0 = New Moon)

  function updateStatus() {
    if (expectedIndex === 0) {
      statusEl.textContent =
        "Click the moon cards in order from New Moon (dark) to Full Moon (bright).";
    } else if (expectedIndex < phases.length) {
      const next = phases[expectedIndex];
      statusEl.textContent = `Great! Now find: ${next.label}.`;
    } else {
      statusEl.textContent = "You completed the full lunar cycle! 🌕🌙";
    }
  }

  function clearCards() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function createCard(phase) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hm-card aspect-[3/4]";
    btn.dataset.phaseId = String(phase.id);

    btn.innerHTML = `
      <div class="hm-card__icon">${phase.icon}</div>
      <div class="hm-card__label">${phase.label}</div>
    `;

    btn.addEventListener("click", () => handleCardClick(btn, phase));

    return btn;
  }

  function handleCardClick(cardEl, phase) {
    // If game already finished, ignore
    if (expectedIndex >= phases.length) return;

    const correctPhase = phases[expectedIndex];

    if (phase.id === correctPhase.id) {
      // Correct choice
      cardEl.classList.remove("hm-card--wrong");
      cardEl.classList.add("hm-card--correct", "hm-card--locked");
      cardEl.disabled = true;
      expectedIndex += 1;
      updateStatus();
    } else {
      // Wrong choice → small shake / red state
      cardEl.classList.add("hm-card--wrong");
      setTimeout(() => {
        cardEl.classList.remove("hm-card--wrong");
      }, 250);
      statusEl.textContent = "Not quite — start from the darkest moon and go toward the brightest.";
    }
  }

  function shufflePhases(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function initializeGame() {
    expectedIndex = 0;
    clearCards();
    const shuffled = shufflePhases(phases);
    shuffled.forEach((phase) => {
      const card = createCard(phase);
      container.appendChild(card);
    });
    updateStatus();
  }

  restartBtn.addEventListener("click", () => {
    initializeGame();
  });

  // First load
  initializeGame();
});
