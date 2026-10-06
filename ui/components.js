const Components = {

  create(tag, className = '', html = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (html) el.innerHTML = html;
    return el;
  },

  button(label, options = {}) {
    const btn = document.createElement('button');
    btn.className = options.className || 'choice-btn';
    btn.textContent = label;
    if (options.id) btn.id = options.id;
    if (options.disabled) btn.disabled = true;
    if (options.onClick) btn.onclick = options.onClick;
    return btn;
  },

  audioBlock(container, text, options = {}) {
    const block = this.create('div', 'audio-block');
    block.innerHTML = `
      <button class="listen-btn" aria-label="listen">🔊</button>
      <button class="slow-btn" aria-label="slow">🐢</button>
    `;

    const mainBtn = block.querySelector('.listen-btn');
    const slowBtn = block.querySelector('.slow-btn');

    mainBtn.onclick = () => {
      AudioPlayer.playEnglish(text, 0.85);
      mainBtn.classList.add('playing');
      setTimeout(() => mainBtn.classList.remove('playing'), 1200);
    };

    slowBtn.onclick = () => {
      AudioPlayer.playEnglish(text, 0.5);
    };

    if (options.autoPlay !== false) {
      setTimeout(() => {
        AudioPlayer.playEnglish(text, 0.85);
        mainBtn.classList.add('playing');
        setTimeout(() => mainBtn.classList.remove('playing'), 1200);
      }, options.delay || 400);
    }

    if (options.append !== false) container.appendChild(block);
    return block;
  },

  wordCard(container, word, hint = '') {
    const card = this.create('div', 'word-card');
    card.innerHTML = `
      <div class="word-big">${word}</div>
      ${hint ? `<div class="word-hint">${hint}</div>` : ''}
    `;
    if (container) container.appendChild(card);
    return card;
  },

  pictureFrame(container, emoji, word = '') {
    const frame = this.create('div', 'picture-frame');
    frame.innerHTML = `
      <div class="picture-display">${emoji}</div>
      ${word ? `<div class="picture-word">${word}</div>` : ''}
    `;
    if (container) container.appendChild(frame);
    return frame;
  },

  chalkboard(container, text) {
    const board = this.create('div', 'chalkboard');
    board.innerHTML = `<div class="chalk-text">${text}</div>`;
    if (container) container.appendChild(board);
    return board;
  },

  feedback(container, correct, correctText = '') {
    const existing = container.querySelector('.feedback-banner');
    if (existing) existing.remove();

    const banner = this.create('div', `feedback-banner ${correct ? 'ok' : 'no'}`);
    banner.textContent = correct
      ? Reactions.pickCorrect()
      : (correctText ? `الصحيح: ${correctText}` : Reactions.pickWrong());

    container.appendChild(banner);
    return banner;
  },

  statBox(label, value) {
    return `
      <div class="stat-box">
        <div class="stat-box-label">${label}</div>
        <div class="stat-box-value">${value}</div>
      </div>
    `;
  }
};