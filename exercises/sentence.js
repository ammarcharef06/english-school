const ExerciseSentence = {

  async orderWords(container, config) {
    const { sentence } = config;
    const available = [...sentence.words].sort(() => Math.random() - 0.5);
    const chosen = [];

    const area = document.createElement('div');
    area.className = 'sentence-builder student-area';

    const chosenArea = document.createElement('div');
    chosenArea.className = 'chosen-area';

    const availableArea = document.createElement('div');
    availableArea.className = 'available-area';

    area.appendChild(chosenArea);
    area.appendChild(availableArea);
    container.appendChild(area);

    if (sentence.emoji) {
      const emoji = document.createElement('div');
      emoji.style.textAlign = 'center';
      emoji.style.fontSize = '3rem';
      emoji.style.marginBottom = '0.5rem';
      emoji.textContent = sentence.emoji;
      area.insertBefore(emoji, chosenArea);
    }

    return new Promise((resolve) => {

      const renderChosen = () => {
        chosenArea.innerHTML = '';
        if (!chosen.length) {
          const placeholder = document.createElement('span');
          placeholder.style.color = 'var(--color-text-faint)';
          placeholder.textContent = 'اختر الكلمات...';
          chosenArea.appendChild(placeholder);
          return;
        }

        chosen.forEach((word, i) => {
          const chip = document.createElement('button');
          chip.className = 'word-chip';
          chip.textContent = word;
          chip.onclick = () => {
            chosen.splice(i, 1);
            available.push(word);
            render();
          };
          chosenArea.appendChild(chip);
        });
      };

      const renderAvailable = () => {
        availableArea.innerHTML = '';
        available.forEach((word, i) => {
          const chip = document.createElement('button');
          chip.className = 'word-chip';
          chip.textContent = word;
          chip.onclick = () => {
            available.splice(i, 1);
            chosen.push(word);
            render();

            if (!available.length) {
              setTimeout(finish, 300);
            }
          };
          availableArea.appendChild(chip);
        });
      };

      const render = () => {
        renderChosen();
        renderAvailable();
      };

      const finish = () => {
        const userText = chosen.join(' ');
        const correct = userText === sentence.words.join(' ');
        Session.recordAnswer(correct);
        if (correct) AudioPlayer.playEnglish(sentence.text, 0.85);
        resolve(correct);
      };

      Session.startQuestion();
      render();
    });
  },

  async chooseMeaning(container, config) {
    const { sentence, options } = config;

    const display = document.createElement('div');
    display.className = 'word-card';
    display.innerHTML = `<div style="font-size:1.4rem; line-height:1.7;">${sentence.text}</div>`;
    container.appendChild(display);

    AudioPlayer.playEnglish(sentence.text, 0.85);
    await Transitions.pause(600);

    Session.startQuestion();

    const result = await Choices.ask(container, options);
    const correct = result.option.value === sentence.id;
    Choices.mark(result.button, correct);
    Session.recordAnswer(correct);

    return correct;
  }
};