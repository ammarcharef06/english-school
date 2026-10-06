const Choices = {

  render(container, options, onSelect) {
    const area = document.createElement('div');
    area.className = 'student-area';

    const grid = document.createElement('div');
    grid.className = 'choices-grid';

    if (options.length === 1) {
      grid.style.gridTemplateColumns = '1fr';
    }

    options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      if (opt.emoji) btn.classList.add('emoji-choice');

      if (opt.emoji && opt.label) {
        btn.innerHTML = `
          <div style="font-size:2.5rem; line-height:1;">${opt.emoji}</div>
          <div class="choice-label">${opt.label}</div>
        `;
      } else if (opt.emoji) {
        btn.innerHTML = `<div style="font-size:2.5rem;">${opt.emoji}</div>`;
      } else {
        btn.textContent = opt.label;
      }

      if (opt.sublabel) {
        const sub = document.createElement('div');
        sub.className = 'choice-sublabel';
        sub.textContent = opt.sublabel;
        btn.appendChild(sub);
      }

      btn.onclick = () => {
        grid.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
        onSelect(opt, index, btn);
      };

      grid.appendChild(btn);
    });

    area.appendChild(grid);
    container.appendChild(area);
    return area;
  },

  async ask(container, options) {
    return new Promise((resolve) => {
      this.render(container, options, (opt, index, btn) => {
        resolve({ option: opt, index, button: btn });
      });
    });
  },

  disable(container) {
    container.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
  },

  mark(button, correct) {
    if (!button) return;
    button.classList.add(correct ? 'correct' : 'wrong');
  }
};