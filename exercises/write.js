const ExerciseWrite = {

  async typeWord(container, config) {
    const { word, hint } = config;

    if (hint) {
      Components.pictureFrame(container, word.emoji);
    } else {
      Components.wordCard(container, word.meaning);
    }

    AudioPlayer.playEnglish(word.text, 0.85);
    await Transitions.pause(600);

    Session.startQuestion();

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-input';
    input.placeholder = 'اكتب الكلمة';
    input.autocomplete = 'off';
    input.autocorrect = 'off';
    input.autocapitalize = 'off';
    input.spellcheck = false;

    const submit = document.createElement('button');
    submit.className = 'choice-btn';
    submit.textContent = 'تحقق';
    submit.style.marginTop = '0.6rem';

    const area = document.createElement('div');
    area.className = 'student-area';
    area.appendChild(input);
    area.appendChild(submit);
    container.appendChild(area);

    input.focus();

    return new Promise((resolve) => {
      const check = () => {
        const value = input.value.trim().toLowerCase();
        if (!value) return;

        const correct = value === word.text.toLowerCase();
        input.classList.add(correct ? 'correct' : 'wrong');
        input.disabled = true;
        submit.disabled = true;
        Session.recordAnswer(correct);

        if (correct) AudioPlayer.playEnglish(word.text, 0.85);

        resolve(correct);
      };

      submit.onclick = check;
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') check();
      });
    });
  }
};