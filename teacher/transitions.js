const Transitions = {

  async pause(ms = 800) {
    return new Promise(r => setTimeout(r, ms));
  },

  async fadeOut(element, duration = 300) {
    if (!element) return;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = '0';
    await this.pause(duration);
    element.style.display = 'none';
  },

  async fadeIn(element, duration = 300) {
    if (!element) return;
    element.style.display = '';
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms`;
    await this.pause(20);
    element.style.opacity = '1';
  },

  async clearContent(container, duration = 200) {
    if (!container) return;
    container.style.transition = `opacity ${duration}ms`;
    container.style.opacity = '0';
    await this.pause(duration);
    container.innerHTML = '';
    container.style.opacity = '1';
  },

  celebrate(emojis = ['⭐', '✨', '🌟']) {
    for (let i = 0; i < 6; i++) {
      const star = document.createElement('div');
      star.className = 'star-fly';
      star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      star.style.left = `${25 + Math.random() * 50}%`;
      star.style.top = `${35 + Math.random() * 30}%`;
      star.style.animationDelay = `${i * 0.08}s`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1600);
    }
  }
};