const Feedback = {

  correct(container, message = null) {
    return Components.feedback(container, true, '');
  },

  wrong(container, correctText = '') {
    return Components.feedback(container, false, correctText);
  },

  clear(container) {
    container.querySelectorAll('.feedback-banner').forEach(b => b.remove());
  },

  celebrate() {
    Transitions.celebrate();
  },

  toast(message, duration = 2500) {
    const el = document.getElementById('toast');
    if (!el) return;

    el.textContent = message;
    el.classList.remove('hidden');
    requestAnimationFrame(() => el.classList.add('show'));

    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.classList.add('hidden'), 300);
    }, duration);
  }
};