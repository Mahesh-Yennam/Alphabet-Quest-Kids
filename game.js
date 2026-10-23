/**
 * ============================================================================
 * ALPHABET QUEST KIDS — FUN SPELLING & ALPHABET QUIZ
 * Pure Vanilla JavaScript Game Engine & Web Audio Procedural Synthesizer
 * ============================================================================
 */

(function () {
  'use strict';

  // --- GAME CONSTANTS & CONFIGURATION ---
  const STORAGE_KEY_BEST = 'gamility_alphabet_quest_best';
  const MAX_ATTEMPTS = 3;

  // Curated Vocabulary Database for Word Quest Mode
  const WORD_DATABASE = {
    tier4: [
      { word: 'LION', emoji: '🦁', category: 'Animal' },
      { word: 'DUCK', emoji: '🦆', category: 'Animal' },
      { word: 'FROG', emoji: '🐸', category: 'Animal' },
      { word: 'STAR', emoji: '⭐', category: 'Sky' },
      { word: 'MOON', emoji: '🌙', category: 'Sky' },
      { word: 'FISH', emoji: '🐠', category: 'Sea' },
      { word: 'CAKE', emoji: '🎂', category: 'Food' },
      { word: 'BOAT', emoji: '⛵', category: 'Vehicle' },
      { word: 'BALL', emoji: '⚽', category: 'Toy' },
      { word: 'TREE', emoji: '🌳', category: 'Nature' },
      { word: 'BIRD', emoji: '🐦', category: 'Animal' },
      { word: 'BOOK', emoji: '📖', category: 'School' },
      { word: 'BEAR', emoji: '🐻', category: 'Animal' },
      { word: 'CRAB', emoji: '🦀', category: 'Sea' },
      { word: 'SHIP', emoji: '🚢', category: 'Vehicle' },
      { word: 'RING', emoji: '💍', category: 'Item' },
      { word: 'DEER', emoji: '🦌', category: 'Animal' },
      { word: 'KITE', emoji: '🪁', category: 'Toy' }
    ],
    tier6: [
      { word: 'MONKEY', emoji: '🐒', category: 'Animal' },
      { word: 'CASTLE', emoji: '🏰', category: 'Place' },
      { word: 'ROCKET', emoji: '🚀', category: 'Space' },
      { word: 'PENCIL', emoji: '✏️', category: 'School' },
      { word: 'GUITAR', emoji: '🎸', category: 'Music' },
      { word: 'RABBIT', emoji: '🐰', category: 'Animal' },
      { word: 'BANANA', emoji: '🍌', category: 'Fruit' },
      { word: 'TURTLE', emoji: '🐢', category: 'Animal' },
      { word: 'FLOWER', emoji: '🌸', category: 'Nature' },
      { word: 'PLANET', emoji: '🪐', category: 'Space' },
      { word: 'BRIDGE', emoji: '🌉', category: 'Place' },
      { word: 'KITTEN', emoji: '🐱', category: 'Animal' },
      { word: 'WIZARD', emoji: '🧙', category: 'Magic' },
      { word: 'DRAGON', emoji: '🐲', category: 'Fantasy' }
    ],
    tier8: [
      { word: 'ELEPHANT', emoji: '🐘', category: 'Animal' },
      { word: 'DINOSAUR', emoji: '🦖', category: 'Animal' },
      { word: 'AIRPLANE', emoji: '✈️', category: 'Vehicle' },
      { word: 'SUNSHINE', emoji: '☀️', category: 'Nature' },
      { word: 'FOOTBALL', emoji: '🏈', category: 'Sport' },
      { word: 'BUTTERFLY', emoji: '🦋', category: 'Nature' },
      { word: 'MOUNTAIN', emoji: '🏔️', category: 'Nature' },
      { word: 'TREASURE', emoji: '💎', category: 'Adventure' },
      { word: 'RAINBOWS', emoji: '🌈', category: 'Sky' },
      { word: 'SANDWICH', emoji: '🥪', category: 'Food' }
    ]
  };

  // --- AUDIO SYNTHESIZER (Web Audio API) ---
  class SoundController {
    constructor() {
      this.ctx = null;
      this.soundEnabled = true;
    }

    init() {
      if (this.ctx) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }

    resume() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.soundEnabled = !this.soundEnabled;
      return this.soundEnabled;
    }

    // Warm Wooden Block Tap
    playCardClick() {
      if (!this.soundEnabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.05);

        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
      } catch (e) {}
    }

    // Cheerful Slot Snap Clink
    playSnap() {
      if (!this.soundEnabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(1320, t + 0.08);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
      } catch (e) {}
    }

    // Gentle "Uh-Oh" Wobble (Encouraging, not punishing)
    playOops() {
      if (!this.soundEnabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const freqs = [330, 260];
        freqs.forEach((f, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t + idx * 0.12);
          gain.gain.setValueAtTime(0.25, t + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.16);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + idx * 0.12);
          osc.stop(t + idx * 0.12 + 0.17);
        });
      } catch (e) {}
    }

    // Correct Answer Learning Reveal Chime
    playReveal() {
      if (!this.soundEnabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
        freqs.forEach((f, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t + idx * 0.1);
          gain.gain.setValueAtTime(0.25, t + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + idx * 0.1);
          osc.stop(t + idx * 0.1 + 0.41);
        });
      } catch (e) {}
    }

    // Victory Fanfare & Sparkly Arpeggios
    playVictory() {
      if (!this.soundEnabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((f, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, t + idx * 0.08);
          gain.gain.setValueAtTime(0.3, t + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + idx * 0.08);
          osc.stop(t + idx * 0.08 + 0.36);
        });
      } catch (e) {}
    }
  }

  // --- GAME ENGINE ---
  class AlphabetQuestGame {
    constructor() {
      // DOM Elements
      this.viewport = document.getElementById('gameViewport');
      this.btnModeWords = document.getElementById('btnModeWords');
      this.btnModeABC = document.getElementById('btnModeABC');
      this.btnTier4 = document.getElementById('btnTier4');
      this.btnTier6 = document.getElementById('btnTier6');
      this.btnTier8 = document.getElementById('btnTier8');
      this.btnToggleCase = document.getElementById('btnToggleCase');
      this.caseLabel = document.getElementById('caseLabel');
      this.btnToggleAudio = document.getElementById('btnToggleAudio');
      this.audioIcon = document.getElementById('audioIcon');

      // Stats
      this.starsContainer = document.getElementById('starsContainer');
      this.hudScore = document.getElementById('hudScore');
      this.hudStreakBadge = document.getElementById('hudStreakBadge');
      this.hudBestScore = document.getElementById('hudBestScore');

      // Stage
      this.clueCard = document.getElementById('clueCard');
      this.clueIcon = document.getElementById('clueIcon');
      this.clueCategory = document.getElementById('clueCategory');
      this.clueHint = document.getElementById('clueHint');
      this.letterSlotsRow = document.getElementById('letterSlotsRow');
      this.feedbackText = document.getElementById('feedbackText');
      this.woodenDeckShelf = document.getElementById('woodenDeckShelf');
      this.deckCardsWrapper = document.getElementById('deckCardsWrapper');
      this.fxOverlay = document.getElementById('fxOverlay');

      // Modals
      this.startOverlay = document.getElementById('startOverlay');
      this.gameOverOverlay = document.getElementById('gameOverOverlay');
      this.btnStartGame = document.getElementById('btnStartGame');
      this.btnPlayAgain = document.getElementById('btnPlayAgain');
      this.modalSelectWords = document.getElementById('modalSelectWords');
      this.modalSelectABC = document.getElementById('modalSelectABC');

      // Game Over Stats
      this.goFinalScore = document.getElementById('goFinalScore');
      this.goBestScore = document.getElementById('goBestScore');
      this.goPuzzlesSolved = document.getElementById('goPuzzlesSolved');
      this.goMaxStreak = document.getElementById('goMaxStreak');
      this.goStarsEarned = document.getElementById('goStarsEarned');

      // Audio Controller
      this.audio = new SoundController();

      // State
      this.currentMode = 'words'; // 'words' | 'abc'
      this.currentTier = 4; // 4 | 6 | 8
      this.isUpperCase = true;
      this.score = 0;
      this.bestScore = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.puzzlesSolved = 0;
      this.totalStarsEarned = 0;
      this.attemptsLeft = MAX_ATTEMPTS;

      // Active Puzzle Data
      this.activePuzzle = null;
      this.selectedDeckCard = null;
      this.selectedSlotIndex = null;
      this.isChecking = false;

      this.loadBestScore();
      this.bindEvents();
    }

    loadBestScore() {
      try {
        const val = localStorage.getItem(STORAGE_KEY_BEST);
        this.bestScore = val ? parseInt(val, 10) || 0 : 0;
        this.hudBestScore.textContent = this.bestScore.toLocaleString();
      } catch (e) {
        this.bestScore = 0;
      }
    }

    saveBestScore() {
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
        try {
          localStorage.setItem(STORAGE_KEY_BEST, this.bestScore.toString());
        } catch (e) {}
        this.hudBestScore.textContent = this.bestScore.toLocaleString();
      }
    }

    bindEvents() {
      // Audio toggle
      this.btnToggleAudio.addEventListener('click', (e) => {
        e.stopPropagation();
        this.audio.init();
        const enabled = this.audio.toggle();
        this.audioIcon.textContent = enabled ? '🔊' : '🔇';
      });

      // Start modal actions
      this.modalSelectWords.addEventListener('click', () => {
        this.modalSelectWords.classList.add('active');
        this.modalSelectABC.classList.remove('active');
        this.currentMode = 'words';
      });
      this.modalSelectABC.addEventListener('click', () => {
        this.modalSelectABC.classList.add('active');
        this.modalSelectWords.classList.remove('active');
        this.currentMode = 'abc';
      });

      this.btnStartGame.addEventListener('click', () => {
        this.audio.init();
        this.audio.resume();
        this.startOverlay.style.display = 'none';
        this.updateModeUI();
        this.generateNewPuzzle();
      });

      this.btnPlayAgain.addEventListener('click', () => {
        this.gameOverOverlay.style.display = 'none';
        this.score = 0;
        this.streak = 0;
        this.puzzlesSolved = 0;
        this.hudScore.textContent = '0';
        this.hudStreakBadge.style.display = 'none';
        this.generateNewPuzzle();
      });

      // Mode Switcher in Top Bar
      this.btnModeWords.addEventListener('click', () => {
        if (this.currentMode === 'words') return;
        this.currentMode = 'words';
        this.updateModeUI();
        this.generateNewPuzzle();
      });

      this.btnModeABC.addEventListener('click', () => {
        if (this.currentMode === 'abc') return;
        this.currentMode = 'abc';
        this.updateModeUI();
        this.generateNewPuzzle();
      });

      // Tier Switchers: 4, 6, 8
      [this.btnTier4, this.btnTier6, this.btnTier8].forEach(btn => {
        btn.addEventListener('click', () => {
          const tier = parseInt(btn.dataset.tier, 10);
          if (this.currentTier === tier) return;
          this.currentTier = tier;
          this.updateTierUI();
          this.generateNewPuzzle();
        });
      });

      // Case Toggle Button (ABC / abc)
      this.btnToggleCase.addEventListener('click', () => {
        this.isUpperCase = !this.isUpperCase;
        this.caseLabel.textContent = this.isUpperCase ? 'ABC' : 'abc';
        this.audio.playCardClick();
        this.refreshDisplayedCases();
      });
    }

    updateModeUI() {
      if (this.currentMode === 'words') {
        this.btnModeWords.classList.add('active');
        this.btnModeABC.classList.remove('active');
      } else {
        this.btnModeABC.classList.add('active');
        this.btnModeWords.classList.remove('active');
      }
    }

    updateTierUI() {
      [this.btnTier4, this.btnTier6, this.btnTier8].forEach(btn => {
        if (parseInt(btn.dataset.tier, 10) === this.currentTier) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    formatLetter(char) {
      if (!char) return '';
      return this.isUpperCase ? char.toUpperCase() : char.toLowerCase();
    }

    refreshDisplayedCases() {
      // Update slots
      const slotBlocks = this.letterSlotsRow.querySelectorAll('.letter-slot-block');
      slotBlocks.forEach((slot, idx) => {
        if (slot.dataset.char) {
          slot.textContent = this.formatLetter(slot.dataset.char);
        }
      });
      // Update deck cards
      const deckCards = this.deckCardsWrapper.querySelectorAll('.deck-letter-card');
      deckCards.forEach(card => {
        if (card.dataset.char) {
          card.textContent = this.formatLetter(card.dataset.char);
        }
      });
    }

    // --- PUZZLE GENERATION ---
    generateNewPuzzle() {
      this.isChecking = false;
      this.selectedDeckCard = null;
      this.selectedSlotIndex = null;
      this.attemptsLeft = MAX_ATTEMPTS;
      this.updateStarsUI();

      let wordOrSeq = [];
      let clueEmoji = '🔤';
      let clueCat = 'ALPHABET ORDER';
      let clueHintText = 'Find the missing ABC letters!';

      if (this.currentMode === 'words') {
        const pool = WORD_DATABASE[`tier${this.currentTier}`] || WORD_DATABASE.tier4;
        const item = pool[Math.floor(Math.random() * pool.length)];
        wordOrSeq = item.word.split('');
        clueEmoji = item.emoji;
        clueCat = item.category.toUpperCase();
        clueHintText = `Spell the word: ${item.word.length} letters!`;
      } else {
        // Alphabet Order Sequence Mode
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const maxStart = 26 - this.currentTier;
        const startIdx = Math.floor(Math.random() * (maxStart + 1));
        wordOrSeq = alphabet.slice(startIdx, startIdx + this.currentTier);
        clueEmoji = '🔤';
        clueCat = 'ALPHABET ORDER';
        clueHintText = 'Put the letters in ABC order!';
      }

      // Update Clue Card
      this.clueIcon.textContent = clueEmoji;
      this.clueCategory.textContent = clueCat;
      this.clueHint.textContent = clueHintText;
      this.feedbackText.textContent = 'Tap a letter below to place it!';

      // Determine Missing Slots based on Tier
      // Tier 4: 1 missing | Tier 6: 2 missing | Tier 8: 3 missing
      const numMissing = this.currentTier === 4 ? 1 : (this.currentTier === 6 ? 2 : 3);
      const missingIndices = [];
      while (missingIndices.length < numMissing) {
        const idx = Math.floor(Math.random() * this.currentTier);
        if (!missingIndices.includes(idx)) {
          missingIndices.push(idx);
        }
      }
      missingIndices.sort((a, b) => a - b);

      // Deck generation
      // Deck contains the correct missing letters + distinct random distractors
      const correctMissingLetters = missingIndices.map(idx => wordOrSeq[idx]);
      const deckSize = this.currentTier === 4 ? 4 : 6;
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

      let deckLetters = [...correctMissingLetters];
      while (deckLetters.length < deckSize) {
        const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
        // Add random distractor (avoid overloading duplicates)
        if (deckLetters.filter(c => c === randomChar).length < 2) {
          deckLetters.push(randomChar);
        }
      }
      // Shuffle deck
      deckLetters.sort(() => Math.random() - 0.5);

      this.activePuzzle = {
        targetWord: wordOrSeq,
        missingIndices: missingIndices,
        placedLetters: {}, // { slotIndex: { char: 'A', deckCardId: '...' } }
        deckLetters: deckLetters
      };

      this.renderSlots();
      this.renderDeck();
    }

    renderSlots() {
      this.letterSlotsRow.innerHTML = '';
      this.letterSlotsRow.dataset.tier = this.currentTier.toString();

      this.activePuzzle.targetWord.forEach((char, idx) => {
        const slot = document.createElement('div');
        slot.className = 'letter-slot-block';
        slot.dataset.slotIndex = idx.toString();

        if (this.activePuzzle.missingIndices.includes(idx)) {
          // Missing slot
          slot.classList.add('slot-empty');
          slot.textContent = '';
          slot.addEventListener('click', () => this.handleSlotClick(idx));
        } else {
          // Pre-filled letter
          slot.classList.add('slot-filled-preset');
          slot.dataset.char = char;
          slot.textContent = this.formatLetter(char);
        }

        this.letterSlotsRow.appendChild(slot);
      });
    }

    renderDeck() {
      this.deckCardsWrapper.innerHTML = '';
      this.woodenDeckShelf.dataset.deckSize = this.activePuzzle.deckLetters.length.toString();

      this.activePuzzle.deckLetters.forEach((char, idx) => {
        const card = document.createElement('div');
        card.className = 'deck-letter-card';
        card.id = `deck_card_${idx}`;
        card.dataset.deckIndex = idx.toString();
        card.dataset.char = char;
        card.textContent = this.formatLetter(char);

        card.addEventListener('click', () => this.handleDeckCardClick(card, idx));
        this.deckCardsWrapper.appendChild(card);
      });
    }

    // --- INTERACTION & PLACEMENT LOGIC ---
    handleDeckCardClick(card, deckIndex) {
      if (this.isChecking || card.classList.contains('used')) return;
      this.audio.playCardClick();

      // If an empty slot was already selected, immediately place this card into that slot!
      if (this.selectedSlotIndex !== null) {
        this.placeLetterInSlot(card, deckIndex, this.selectedSlotIndex);
        this.clearSelection();
        return;
      }

      // Otherwise, toggle selection of this deck card
      if (this.selectedDeckCard === card) {
        this.selectedDeckCard.classList.remove('selected');
        this.selectedDeckCard = null;
        this.feedbackText.textContent = 'Tap a letter below to place it!';
      } else {
        if (this.selectedDeckCard) {
          this.selectedDeckCard.classList.remove('selected');
        }
        this.selectedDeckCard = card;
        card.classList.add('selected');
        this.feedbackText.textContent = `Selected "${this.formatLetter(card.dataset.char)}"! Tap an empty box above.`;
      }
    }

    handleSlotClick(slotIndex) {
      if (this.isChecking) return;

      // Check if this slot already has a player-placed letter
      if (this.activePuzzle.placedLetters[slotIndex]) {
        // Tapping an existing placed letter returns it to the deck!
        this.removeLetterFromSlot(slotIndex);
        this.clearSelection();
        this.feedbackText.textContent = 'Letter returned to tray!';
        return;
      }

      // If a deck card was already selected, place it here!
      if (this.selectedDeckCard) {
        const deckIndex = parseInt(this.selectedDeckCard.dataset.deckIndex, 10);
        this.placeLetterInSlot(this.selectedDeckCard, deckIndex, slotIndex);
        this.clearSelection();
        return;
      }

      // Otherwise, mark this slot as active target
      const slots = this.letterSlotsRow.querySelectorAll('.letter-slot-block');
      slots.forEach(s => s.classList.remove('active-target'));

      if (this.selectedSlotIndex === slotIndex) {
        this.selectedSlotIndex = null;
        this.feedbackText.textContent = 'Tap a letter below to place it!';
      } else {
        this.selectedSlotIndex = slotIndex;
        const targetSlot = this.letterSlotsRow.querySelector(`[data-slot-index="${slotIndex}"]`);
        if (targetSlot) targetSlot.classList.add('active-target');
        this.feedbackText.textContent = 'Now choose a letter from the wooden tray!';
      }
    }

    placeLetterInSlot(card, deckIndex, slotIndex) {
      const char = card.dataset.char;
      this.activePuzzle.placedLetters[slotIndex] = {
        char: char,
        deckIndex: deckIndex,
        cardId: card.id
      };

      // Mark card as used on deck
      card.classList.remove('selected');
      card.classList.add('used');

      // Update slot DOM
      const slot = this.letterSlotsRow.querySelector(`[data-slot-index="${slotIndex}"]`);
      if (slot) {
        slot.classList.remove('slot-empty', 'active-target');
        slot.classList.add('slot-placed');
        slot.dataset.char = char;
        slot.textContent = this.formatLetter(char);
      }

      this.audio.playSnap();

      // Check if all missing slots are now filled
      const placedCount = Object.keys(this.activePuzzle.placedLetters).length;
      if (placedCount === this.activePuzzle.missingIndices.length) {
        this.validateSolution();
      }
    }

    removeLetterFromSlot(slotIndex) {
      const placement = this.activePuzzle.placedLetters[slotIndex];
      if (!placement) return;

      // Restore deck card
      const card = document.getElementById(placement.cardId);
      if (card) {
        card.classList.remove('used');
      }

      delete this.activePuzzle.placedLetters[slotIndex];

      // Restore empty slot
      const slot = this.letterSlotsRow.querySelector(`[data-slot-index="${slotIndex}"]`);
      if (slot) {
        slot.classList.remove('slot-placed', 'slot-wrong');
        slot.classList.add('slot-empty');
        slot.dataset.char = '';
        slot.textContent = '';
      }

      this.audio.playCardClick();
    }

    clearSelection() {
      if (this.selectedDeckCard) {
        this.selectedDeckCard.classList.remove('selected');
        this.selectedDeckCard = null;
      }
      this.selectedSlotIndex = null;
      const slots = this.letterSlotsRow.querySelectorAll('.letter-slot-block');
      slots.forEach(s => s.classList.remove('active-target'));
    }

    // --- VALIDATION & 3-ATTEMPT LEARNING ENGINE ---
    validateSolution() {
      this.isChecking = true;
      let allCorrect = true;
      const wrongSlots = [];

      this.activePuzzle.missingIndices.forEach(idx => {
        const expected = this.activePuzzle.targetWord[idx];
        const placed = this.activePuzzle.placedLetters[idx]?.char;
        if (placed !== expected) {
          allCorrect = false;
          wrongSlots.push(idx);
        }
      });

      if (allCorrect) {
        this.handleSuccess();
      } else {
        this.handleMistake(wrongSlots);
      }
    }

    handleSuccess() {
      this.audio.playVictory();
      this.spawnConfetti();

      // Celebrate all slots
      const slots = this.letterSlotsRow.querySelectorAll('.letter-slot-block');
      slots.forEach(s => s.classList.add('slot-correct'));

      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      this.puzzlesSolved++;
      this.totalStarsEarned += this.attemptsLeft;

      // Score bonus based on tier & remaining attempts
      const basePts = this.currentTier === 4 ? 100 : (this.currentTier === 6 ? 200 : 300);
      const earnedPts = basePts * this.attemptsLeft;
      this.score += earnedPts;
      this.saveBestScore();

      this.hudScore.textContent = this.score.toLocaleString();
      if (this.streak > 1) {
        this.hudStreakBadge.textContent = `${this.streak}🔥`;
        this.hudStreakBadge.style.display = 'inline-block';
      }

      this.feedbackText.textContent = `🌟 Awesome job! +${earnedPts} pts! 🌟`;

      setTimeout(() => {
        this.generateNewPuzzle();
      }, 1400);
    }

    handleMistake(wrongSlots) {
      this.audio.playOops();
      this.attemptsLeft--;
      this.updateStarsUI();

      // Shake wrong slots
      wrongSlots.forEach(idx => {
        const slot = this.letterSlotsRow.querySelector(`[data-slot-index="${idx}"]`);
        if (slot) slot.classList.add('slot-wrong');
      });

      if (this.attemptsLeft > 0) {
        // Attempts remaining
        this.feedbackText.textContent = `Oops! Try again (${this.attemptsLeft} ⭐ left!)`;

        setTimeout(() => {
          // Return wrong letters back to tray so child can retry
          wrongSlots.forEach(idx => {
            this.removeLetterFromSlot(idx);
          });
          this.isChecking = false;
        }, 650);
      } else {
        // 3rd attempt failed: Gently reveal correct answer for learning!
        this.streak = 0;
        this.hudStreakBadge.style.display = 'none';
        this.feedbackText.textContent = `💡 Here is the correct answer! Great try! ✨`;
        this.audio.playReveal();

        this.activePuzzle.missingIndices.forEach(idx => {
          const correctChar = this.activePuzzle.targetWord[idx];
          const slot = this.letterSlotsRow.querySelector(`[data-slot-index="${idx}"]`);
          if (slot) {
            slot.classList.remove('slot-empty', 'slot-placed', 'slot-wrong');
            slot.classList.add('slot-revealed');
            slot.dataset.char = correctChar;
            slot.textContent = this.formatLetter(correctChar);
          }
        });

        setTimeout(() => {
          this.generateNewPuzzle();
        }, 2200);
      }
    }

    updateStarsUI() {
      const stars = [
        document.getElementById('star1'),
        document.getElementById('star2'),
        document.getElementById('star3')
      ];
      stars.forEach((s, idx) => {
        if (idx < this.attemptsLeft) {
          s.classList.add('active');
          s.classList.remove('lost');
        } else {
          s.classList.remove('active');
          s.classList.add('lost');
        }
      });
    }

    spawnConfetti() {
      const colors = ['#f43f5e', '#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      for (let i = 0; i < 24; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = `${15 + Math.random() * 70}%`;
        piece.style.top = `${40 + Math.random() * 20}%`;

        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 90;
        piece.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        piece.style.setProperty('--ty', `${Math.sin(angle) * dist - 30}px`);

        this.fxOverlay.appendChild(piece);
        setTimeout(() => piece.remove(), 1200);
      }
    }
  }

  // Boot on DOM ready
  window.addEventListener('DOMContentLoaded', () => {
    window.gamilityAlphabetQuest = new AlphabetQuestGame();
  });

})();
