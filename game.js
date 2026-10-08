/**
 * RideQuest - Core Game State & Controller
 * Manages game loop, progression, pedagogical discovery popups, sound cues,
 * Teacher Mode, Codex drawer, and Boss level transitions.
 */

class GameController {
  constructor() {
    this.currentLevelIndex = 0;
    this.xp = 0;
    this.completedLevelIds = new Set();
    this.selectedChoice = null;
    this.simulationEngine = null;
    this.bossCanvas = null;
    this.isTeacherModeOpen = false;
    this.isCodexOpen = false;

    this.init();
  }

  setElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  }

  init() {
    this.loadState();
    this.simulationEngine = new window.SimulationEngine('sim-viewport');
    this.bossCanvas = new window.BossCanvasEngine('boss-canvas-container');
    window.bossCanvas = this.bossCanvas;

    // Pre-render the current level so UI is never blank
    this.loadLevel(this.currentLevelIndex);

    if (this.currentLevelIndex > 0 || this.completedLevelIds.size > 0) {
      const startBtn = document.getElementById('btn-start-journey');
      if (startBtn) startBtn.innerText = "CONTINUE YOUR JOURNEY ➔";
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem('ridequest_save');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentLevelIndex = data.currentLevelIndex || 0;
        this.xp = data.xp || 0;
        this.completedLevelIds = new Set(data.completedLevelIds || []);
      }
    } catch (e) {
      console.warn('Failed to load state', e);
    }
  }

  saveState() {
    try {
      const data = {
        currentLevelIndex: this.currentLevelIndex,
        xp: this.xp,
        completedLevelIds: Array.from(this.completedLevelIds)
      };
      localStorage.setItem('ridequest_save', JSON.stringify(data));
    } catch (e) {}
  }

  resetProgress() {
    if (confirm("Reset all game progress back to Level 1?")) {
      localStorage.removeItem('ridequest_save');
      this.currentLevelIndex = 0;
      this.xp = 0;
      this.completedLevelIds.clear();
      window.location.reload();
    }
  }

  startGame() {
    try { window.soundEngine?.select?.(); } catch (e) {}
    const landing = document.getElementById('screen-landing');
    const story = document.getElementById('screen-story-intro');
    if (landing) landing.classList.add('hidden');
    if (story) story.classList.remove('hidden');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }

  beginLevel1() {
    try { window.soundEngine?.select?.(); } catch (e) {}
    const story = document.getElementById('screen-story-intro');
    const gameplay = document.getElementById('screen-gameplay');
    if (story) story.classList.add('hidden');
    if (gameplay) gameplay.classList.remove('hidden');
    this.loadLevel(this.currentLevelIndex);
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }

  loadLevel(index) {
    if (index >= window.GAME_LEVELS.length) {
      index = window.GAME_LEVELS.length - 1;
    }
    this.currentLevelIndex = index;
    this.selectedChoice = null;
    this.saveState();

    const level = window.GAME_LEVELS[this.currentLevelIndex];

    // Update global UI badges
    this.updateTopBar(level);

    if (level.isBoss) {
      document.getElementById('level-standard-view').classList.add('hidden');
      document.getElementById('level-boss-view').classList.remove('hidden');
      this.bossCanvas.init();
    } else {
      document.getElementById('level-standard-view').classList.remove('hidden');
      document.getElementById('level-boss-view').classList.add('hidden');
      this.renderLevelView(level);
    }

    this.updateTeacherMode();
  }

  updateTopBar(level) {
    const stage = window.GAME_STAGES.find(s => s.id === level.stage);
    this.setElementText('stage-badge-text', stage ? stage.name.toUpperCase() : 'SYSTEM DESIGN');
    this.setElementText('level-indicator-text', level.isBoss ? 'FINAL BOSS' : `Level ${level.id} / 24`);
    this.setElementText('xp-count-val', `${this.xp}`);

    // Stepper dots for the current stage
    const stepperContainer = document.getElementById('stage-stepper-dots');
    if (stepperContainer && stage) {
      stepperContainer.innerHTML = stage.levels.map((lvlId, idx) => {
        const isDone = this.completedLevelIds.has(lvlId);
        const isCurrent = lvlId === level.id;
        const dotClass = isCurrent ? 'dot current' : (isDone ? 'dot done' : 'dot pending');
        const connector = idx < stage.levels.length - 1 ? `<div class="dot-connector ${isDone ? 'active' : ''}"></div>` : '';
        return `<div class="${dotClass}" title="Level ${lvlId}"></div>${connector}`;
      }).join('');
    }

    // Non-jargon challenge topic pill
    this.setElementText('challenge-topic-text', `🎯 Challenge: ${level.topicHint || level.title}`);

    const progressFill = document.getElementById('progress-bar-fill');
    if (progressFill) progressFill.style.width = `${((level.id) / 25) * 100}%`;
  }

  updateCompanionState(state, dialogue) {
    const faceEl = document.getElementById('avatar-face');
    const textEl = document.getElementById('companion-text');
    const compCard = document.getElementById('architect-companion');

    if (compCard) {
      compCard.classList.remove('state-thinking', 'state-observing', 'state-curious', 'state-celebrating');
      compCard.classList.add(`state-${state}`);
    }

    if (faceEl) {
      switch (state) {
        case 'thinking':
          faceEl.innerText = '🧐';
          break;
        case 'observing':
          faceEl.innerText = '👀';
          break;
        case 'curious':
          faceEl.innerText = '🤔';
          break;
        case 'celebrating':
          faceEl.innerText = '🎉';
          break;
        default:
          faceEl.innerText = '🧐';
      }
    }

    if (textEl && dialogue) {
      textEl.innerText = dialogue;
    }
  }

  renderLevelView(level) {
    // Hide all overlays and feedback banners
    const modal = document.getElementById('discovery-modal');
    if (modal) modal.classList.add('hidden');
    const consCard = document.getElementById('consequence-feedback-card');
    if (consCard) consCard.classList.add('hidden');
    const succBanner = document.getElementById('success-feedback-banner');
    if (succBanner) succBanner.classList.add('hidden');
    const whModal = document.getElementById('what-happened-modal');
    if (whModal) whModal.classList.add('hidden');

    this.isEvaluating = false;

    // Fill Situation card
    this.setElementText('lvl-time', level.time);
    this.setElementText('lvl-users', level.usersCount);
    this.setElementText('lvl-title', level.title);
    this.setElementText('lvl-situation', level.situation);
    this.setElementText('lvl-problem', level.problem);

    // Initial character prompt
    this.updateCompanionState('thinking', `“Review the situation carefully. What strategy should we deploy?”`);

    // Render Options
    const optionsContainer = document.getElementById('options-grid');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';

      level.choices.forEach(choice => {
        const btn = document.createElement('div');
        btn.className = 'choice-card';
        btn.id = `choice-opt-${choice.id}`;
        btn.innerHTML = `
          <div class="choice-letter">Option ${choice.id}</div>
          <div class="choice-text">"${choice.text}"</div>
          <div class="choice-action">Test this solution ➔</div>
        `;
        btn.onclick = () => this.makeChoice(choice);
        optionsContainer.appendChild(btn);
      });
    }

    // Initial simulation rendering
    if (this.simulationEngine) {
      this.simulationEngine.render(level, null);
    }
  }

  setChoicesDisabled(disabled) {
    const allCards = document.querySelectorAll('.choice-card');
    allCards.forEach(c => {
      if (disabled) {
        c.classList.add('disabled');
      } else {
        c.classList.remove('disabled');
      }
    });
  }

  makeChoice(choice) {
    if (this.isEvaluating) return;
    this.isEvaluating = true;
    window.soundEngine.click();
    this.selectedChoice = choice;
    const level = window.GAME_LEVELS[this.currentLevelIndex];

    // Lock choices and highlight
    this.setChoicesDisabled(true);

    const allCards = document.querySelectorAll('.choice-card');
    allCards.forEach(c => c.classList.remove('selected', 'optimal', 'suboptimal'));

    const selectedElem = document.getElementById(`choice-opt-${choice.id}`);
    if (selectedElem) {
      selectedElem.classList.add('selected');
      if (choice.isOptimal) {
        selectedElem.classList.add('optimal');
      } else {
        selectedElem.classList.add('suboptimal');
      }
    }

    // Story companion observes
    this.updateCompanionState('observing', `“Testing Option ${choice.id}... Let's observe what happens!”`);

    // Render simulation consequence
    if (this.simulationEngine) {
      this.simulationEngine.render(level, choice);
    }
    this.updateTeacherMode();

    if (!choice.isOptimal) {
      // --- SUBOPTIMAL / WRONG ANSWER FLOW ---
      setTimeout(() => {
        window.soundEngine.overload();
        this.updateCompanionState('curious', `“Hmm... look at what happened! Something else is slowing the system down.”`);
        this.showConsequenceCard(level, choice);
        this.isEvaluating = false;
      }, 1200);
    } else {
      // --- OPTIMAL / CORRECT ANSWER FLOW ---
      setTimeout(() => {
        window.soundEngine.success();
        this.updateCompanionState('celebrating', `“Brilliant! Look what changed! The system is running smoothly!”`);
        this.showSuccessBanner(level, choice);

        setTimeout(() => {
          this.showDiscoveryModal(level, choice);
          this.isEvaluating = false;
        }, 1600);
      }, 1200);
    }
  }

  showConsequenceCard(level, choice) {
    const card = document.getElementById('consequence-feedback-card');
    if (card) {
      card.classList.remove('hidden');
      const wh = choice.whatHappened || {};
      this.setElementText('consequence-title', "Interesting choice! Let's see what happened...");
      this.setElementText('consequence-body', wh.reflectionQuestion || "Did this decision solve the whole system bottleneck?");
    }
  }

  hideConsequenceCard() {
    const card = document.getElementById('consequence-feedback-card');
    if (card) card.classList.add('hidden');
  }

  showSuccessBanner(level, choice) {
    const banner = document.getElementById('success-feedback-banner');
    if (banner) {
      banner.classList.remove('hidden');
      this.setElementText('success-desc-text', choice.successSummary || "The workload is flowing smoothly across the system without bottlenecks!");
    }
  }

  hideSuccessBanner() {
    const banner = document.getElementById('success-feedback-banner');
    if (banner) banner.classList.add('hidden');
  }

  retryLevel() {
    window.soundEngine.click();
    this.hideConsequenceCard();
    this.hideWhatHappenedModal();
    this.setChoicesDisabled(false);

    const allCards = document.querySelectorAll('.choice-card');
    allCards.forEach(c => c.classList.remove('selected', 'optimal', 'suboptimal', 'disabled'));

    this.selectedChoice = null;
    this.isEvaluating = false;

    const level = window.GAME_LEVELS[this.currentLevelIndex];
    this.updateCompanionState('thinking', `“Let's rethink our approach. Which solution should we test next?”`);

    // Reset simulation to clean problem state
    if (this.simulationEngine) {
      this.simulationEngine.render(level, null);
    }
  }

  showWhatHappened() {
    window.soundEngine.click();
    const modal = document.getElementById('what-happened-modal');
    const choice = this.selectedChoice;
    if (modal && choice) {
      modal.classList.remove('hidden');
      this.setElementText('wh-choice-echo', `You tested Option ${choice.id}: "${choice.text}"`);

      const wh = choice.whatHappened || {};
      this.setElementText('wh-helped-text', wh.helped || "This took action on the immediate situation.");
      this.setElementText('wh-bottleneck-text', wh.bottleneck || choice.consequenceText);
      this.setElementText('wh-reflection-prompt', `💡 Architect's Reflection: ${wh.reflectionQuestion || "Did this approach solve the underlying system bottleneck?"}`);
    }
  }

  hideWhatHappenedModal() {
    const modal = document.getElementById('what-happened-modal');
    if (modal) modal.classList.add('hidden');
  }

  showDiscoveryModal(level, choice) {
    const modal = document.getElementById('discovery-modal');
    if (modal) modal.classList.remove('hidden');

    const disc = level.discovery;
    this.setElementText('disc-badge-title', disc.badge);
    this.setElementText('disc-tagline', disc.tagline);
    this.setElementText('disc-analogy', disc.analogy);
    this.setElementText('disc-contrast-a-title', disc.contrast.termA);
    this.setElementText('disc-contrast-a-desc', disc.contrast.descA);
    this.setElementText('disc-contrast-b-title', disc.contrast.termB);
    this.setElementText('disc-contrast-b-desc', disc.contrast.descB);
    this.setElementText('disc-advanced-text', disc.advancedInfo);

    // Reset advanced toggle
    const advPanel = document.getElementById('advanced-panel');
    if (advPanel) advPanel.classList.add('hidden');
    this.setElementText('btn-advanced-toggle', "🔬 Show Advanced Tech Explanation");

    // Award XP if first time
    if (!this.completedLevelIds.has(level.id)) {
      this.completedLevelIds.add(level.id);
      this.xp += 150;
      this.updateTopBar(level);
      this.saveState();
      this.animateXpGain();
    }
  }

  animateXpGain() {
    const xpBadge = document.getElementById('xp-display');
    if (xpBadge) {
      xpBadge.classList.add('pulse-glow');
      setTimeout(() => xpBadge.classList.remove('pulse-glow'), 2000);
    }
  }

  nextLevel() {
    window.soundEngine.select();
    const modal = document.getElementById('discovery-modal');
    if (modal) modal.classList.add('hidden');
    this.hideConsequenceCard();
    this.hideSuccessBanner();
    this.hideWhatHappenedModal();
    this.setChoicesDisabled(false);
    this.selectedChoice = null;
    this.isEvaluating = false;

    this.loadLevel(this.currentLevelIndex + 1);
  }

  testLbStrategy(strategyId) {
    const level = window.GAME_LEVELS[this.currentLevelIndex];
    const choice = level.choices.find(c => c.id === strategyId);
    if (choice) {
      this.simulationEngine.render(level, choice);
    }
  }

  toggleTeacherMode() {
    window.soundEngine.click();
    this.isTeacherModeOpen = !this.isTeacherModeOpen;
    const drawer = document.getElementById('teacher-drawer');
    if (this.isTeacherModeOpen) {
      drawer.classList.remove('hidden');
      this.updateTeacherMode();
    } else {
      drawer.classList.add('hidden');
    }
  }

  updateTeacherMode() {
    if (!this.isTeacherModeOpen) return;
    const level = window.GAME_LEVELS[this.currentLevelIndex];
    if (level.isBoss) {
      document.getElementById('teach-level-title').innerText = "Final Boss: Architectural Blueprint Construction";
      document.getElementById('teach-concept-revealed').innerText = "Complete System Synthesis (All 24 Concepts combined)";
      document.getElementById('teach-experience').innerText = "Students must assemble users, edge caching, load balancing, microservices, caches, and database replication into a working platform.";
      document.getElementById('teach-realworld').innerText = "Production ride-hailing architecture of Ola / Uber / Grab handling 500k req/s.";
      document.getElementById('teach-question').innerText = "What trade-offs did you make between cost and 99.999% reliability?";
      return;
    }

    document.getElementById('teach-level-title').innerText = `Level ${level.id}: ${level.title}`;
    document.getElementById('teach-concept-revealed').innerText = level.discovery.badge;
    document.getElementById('teach-experience').innerText = level.discovery.teacherNotes.experience;
    document.getElementById('teach-realworld').innerText = level.discovery.teacherNotes.realWorld;
    document.getElementById('teach-question').innerText = level.discovery.teacherNotes.question;

    // Student choice telemetry
    const choiceInfo = document.getElementById('teach-student-choice');
    if (this.selectedChoice) {
      choiceInfo.innerHTML = `
        <span class="${this.selectedChoice.isOptimal ? 'text-success' : 'text-warning'}">
          Student chose Option ${this.selectedChoice.id}: "${this.selectedChoice.text}"
          (${this.selectedChoice.isOptimal ? 'Optimal architectural decision' : 'Suboptimal / Common misconception'})
        </span>
      `;
    } else {
      choiceInfo.innerHTML = `<span class="text-muted">Student is currently thinking and reviewing options...</span>`;
    }

    // Populate Level Jump select
    const select = document.getElementById('teach-jump-select');
    if (select && select.children.length === 0) {
      window.GAME_LEVELS.forEach((lvl, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.innerText = lvl.isBoss ? "Final Boss: Build RideQuest" : `Level ${lvl.id}: ${lvl.title}`;
        select.appendChild(opt);
      });
      select.value = this.currentLevelIndex;
      select.onchange = (e) => {
        this.loadLevel(parseInt(e.target.value));
      };
    } else if (select) {
      select.value = this.currentLevelIndex;
    }
  }

  toggleCodex() {
    window.soundEngine.click();
    this.isCodexOpen = !this.isCodexOpen;
    const drawer = document.getElementById('codex-drawer');
    if (this.isCodexOpen) {
      drawer.classList.remove('hidden');
      this.renderCodex();
    } else {
      drawer.classList.add('hidden');
    }
  }

  renderCodex() {
    const list = document.getElementById('codex-list');
    list.innerHTML = '';

    window.GAME_LEVELS.slice(0, 24).forEach(lvl => {
      const isUnlocked = this.completedLevelIds.has(lvl.id);
      const card = document.createElement('div');
      card.className = `codex-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="codex-num">Level ${lvl.id}</div>
        <div class="codex-title">${isUnlocked ? lvl.discovery.badge : '🔒 Mystery Concept'}</div>
        <div class="codex-desc">${isUnlocked ? lvl.discovery.tagline : 'Complete this level challenge to unlock and discover this concept.'}</div>
        ${isUnlocked ? `<div class="codex-analogy">💡 <em>"${lvl.discovery.analogy}"</em></div>` : ''}
      `;
      list.appendChild(card);
    });
  }

  showVictoryScreen() {
    document.getElementById('screen-gameplay').classList.add('hidden');
    document.getElementById('screen-victory').classList.remove('hidden');
  }

  toggleSound() {
    const isMuted = window.soundEngine.toggleMute();
    document.getElementById('btn-sound-toggle').innerText = isMuted ? '🔇 Sound Off' : '🔊 Sound On';
  }
}

window.GameController = GameController;

window.startGame = function() {
  if (window.game) {
    window.game.startGame();
  } else {
    document.getElementById('screen-landing')?.classList.add('hidden');
    document.getElementById('screen-story-intro')?.classList.remove('hidden');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }
};

window.beginLevel1 = function() {
  if (window.game) {
    window.game.beginLevel1();
  } else {
    document.getElementById('screen-story-intro')?.classList.add('hidden');
    document.getElementById('screen-gameplay')?.classList.remove('hidden');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }
};

function initRideQuest() {
  if (!window.game) {
    try {
      window.game = new GameController();
      console.log('RideQuest Engine initialized successfully!');
    } catch (e) {
      console.error('Failed to initialize GameController:', e);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRideQuest);
} else {
  initRideQuest();
}

