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
    window.soundEngine.select();
    document.getElementById('screen-landing').classList.add('hidden');
    document.getElementById('screen-story-intro').classList.remove('hidden');
  }

  beginLevel1() {
    window.soundEngine.select();
    document.getElementById('screen-story-intro').classList.add('hidden');
    document.getElementById('screen-gameplay').classList.remove('hidden');
    this.loadLevel(this.currentLevelIndex);
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
    this.setElementText('stage-badge-text', stage ? stage.name : 'System Design');
    this.setElementText('level-indicator-text', level.isBoss ? 'Final Boss Challenge' : `Level ${level.id} of 24`);
    this.setElementText('xp-display', `${this.xp} XP`);
    const progressFill = document.getElementById('progress-bar-fill');
    if (progressFill) progressFill.style.width = `${((level.id) / 25) * 100}%`;
  }

  renderLevelView(level) {
    // Hide discovery modal if open
    const modal = document.getElementById('discovery-modal');
    if (modal) modal.classList.add('hidden');

    // Fill Situation card
    this.setElementText('lvl-time', level.time);
    this.setElementText('lvl-users', level.usersCount);
    this.setElementText('lvl-title', level.title);
    this.setElementText('lvl-situation', level.situation);
    this.setElementText('lvl-problem', level.problem);

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
          <div class="choice-action">Select this solution ➔</div>
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

  makeChoice(choice) {
    window.soundEngine.click();
    this.selectedChoice = choice;
    const level = window.GAME_LEVELS[this.currentLevelIndex];

    // Highlight selected card
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

    // Play feedback sound and animate simulation consequence
    if (choice.isOptimal) {
      window.soundEngine.success();
    } else {
      window.soundEngine.overload();
    }

    if (this.simulationEngine) {
      this.simulationEngine.render(level, choice);
    }
    this.updateTeacherMode();

    // Show Consequence Panel
    setTimeout(() => {
      this.showDiscoveryModal(level, choice);
    }, 1200);
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
    }
  }

  toggleAdvancedInfo() {
    const panel = document.getElementById('advanced-panel');
    const btn = document.getElementById('btn-advanced-toggle');
    window.soundEngine.click();
    if (panel.classList.contains('hidden')) {
      panel.classList.remove('hidden');
      btn.innerText = "🔼 Hide Advanced Tech Explanation";
    } else {
      panel.classList.add('hidden');
      btn.innerText = "🔬 Show Advanced Tech Explanation";
    }
  }

  nextLevel() {
    window.soundEngine.select();
    document.getElementById('discovery-modal').classList.add('hidden');
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

document.addEventListener('DOMContentLoaded', () => {
  window.game = new GameController();
});
