const TeacherSpeech = {

  say(container, message, options = {}) {
    const { mood = 'calm', name = Teacher.name } = options;
    const m = Teacher.getMood(mood);

    const block = document.createElement('div');
    block.className = 'teacher-block';
    block.innerHTML = `
      <div class="teacher-avatar ${m.className}">${m.icon}</div>
      <div class="teacher-speech">
        <div class="teacher-name">${name}</div>
        <div class="teacher-message">${message}</div>
      </div>
    `;

    container.appendChild(block);

    if (options.voice !== false && options.arabicAudio !== false) {
      const plainText = this.stripHtml(message);
      if (plainText) ArabicAudio.say(plainText);
    }

    return block;
  },

  update(block, message, mood = null) {
    const msgEl = block.querySelector('.teacher-message');
    if (msgEl) msgEl.innerHTML = message;

    if (mood) {
      const avatar = block.querySelector('.teacher-avatar');
      const m = Teacher.getMood(mood);
      avatar.className = `teacher-avatar ${m.className}`;
      avatar.textContent = m.icon;
    }
  },

  clear(container) {
    container.querySelectorAll('.teacher-block').forEach(b => b.remove());
  },

  stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  },

  wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
};