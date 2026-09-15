/**
 * Flashcard App Logic
 * Handles interaction, queue management, and progression.
 */

window.FlashcardApp = class FlashcardApp {
    constructor(config) {
        this.containerId = config.containerId;
        this.data = config.data; // Array of { question, answer }
        this.queue = [...this.data]; // Copy of data to manage state
        this.shuffleQueue(); // Randomize the order
        this.currentCard = null;
        this.isFlipped = false;

        this.init();
    }

    shuffleQueue() {
        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }
    }

    init() {
        this.renderStructure();
        this.loadNextCard();
        this.attachEventListeners();
    }

    renderStructure() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="flashcard-section">
                <div class="flashcard-container" id="fc-card-container">
                    <div class="flashcard" id="fc-card">
                        <div class="flashcard-inner">
                            <div class="flashcard-front" id="fc-front"></div>
                            <div class="flashcard-back" id="fc-back"></div>
                        </div>
                    </div>
                </div>
                <div class="flashcard-controls" id="fc-controls">
                    <button id="btn-not-yet" class="control-btn btn-not-yet">Not Yet (Repeat)</button>
                    <button id="btn-got-it" class="control-btn btn-got-it">Got It</button>
                </div>
                <div class="flashcard-progress" id="fc-progress"></div>
            </div>
        `;

        this.cardElement = document.getElementById('fc-card');
        this.frontElement = document.getElementById('fc-front');
        this.backElement = document.getElementById('fc-back');
        this.controlsElement = document.getElementById('fc-controls');
        this.progressElement = document.getElementById('fc-progress');
    }

    loadNextCard() {
        if (this.queue.length === 0) {
            this.showCompletion();
            return;
        }

        this.currentCard = this.queue.shift(); // Take first item
        this.isFlipped = false;
        this.cardElement.classList.remove('flipped');

        // Small delay to allow flip animation to reset if needed
        setTimeout(() => {
            this.frontElement.innerHTML = this.currentCard.question;
            this.backElement.innerHTML = this.currentCard.answer;
            this.updateProgress();
        }, 200);
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;
        this.cardElement.classList.toggle('flipped');
    }

    handleGotIt() {
        // Card is already removed from queue (shift), so just load next
        this.loadNextCard();
    }

    handleNotYet() {
        // Put card back at the end of queue
        this.queue.push(this.currentCard);
        this.loadNextCard();
    }

    updateProgress() {
        const remaining = this.queue.length + 1; // +1 for current card
        const total = this.data.length;
        // this.progressElement.textContent = `Card ${total - remaining + 1} of ${total}`;
        this.progressElement.textContent = `${remaining} cards remaining in this session`;
    }

    showCompletion() {
        this.cardElement.style.display = 'none';
        this.controlsElement.style.display = 'none';

        this.progressElement.innerHTML = `
            <div style="padding: 2rem; background: #d4edda; border-radius: 8px; color: #155724;">
                <h3 style="margin-bottom: 1rem;">Session Complete! 🎉</h3>
                <p>You've reviewed all ${this.data.length} flashcards.</p>
                <button onclick="location.reload()" class="control-btn" style="background:#004587; color:#fff; margin-top:1rem;">Restart Session</button>
            </div>
        `;
    }

    attachEventListeners() {
        // Flip on click
        document.getElementById('fc-card-container').addEventListener('click', () => this.flipCard());

        // Controls
        document.getElementById('btn-not-yet').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent flip
            this.handleNotYet();
        });

        document.getElementById('btn-got-it').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent flip
            this.handleGotIt();
        });
    }
};
