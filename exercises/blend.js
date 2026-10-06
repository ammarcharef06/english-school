const ExerciseBlend = {

  async phonemesToWord(container, config) {
    const { word, phonemes } = config;

    const chain = document.createElement('div');
    chain.className = 'phoneme-chain';
    container.appendChild(chain);

    phonemes.forEach((p, i) => {
      const phoneme = DataPhonemes.byId(p);
      if (!phoneme) return;

      const chip = document.createElement('div');
      chip.className = 'phoneme-chip';
      chip.innerHTML = `<button>${phoneme.ipa}</button>`;
      chip.querySelector('button').onclick = () => {
        AudioPlayer.playEnglish(phoneme.example, 0.7);
      };
      chain.appendChild(chip);

      if (i < phonemes.length - 1) {
        const plus = document.createElement('span');
        plus.className = 'chain-plus';
        plus.textContent = '+';
        chain.appendChild(plus);
      }
    });

    await Transitions.pause(600);

    Components.audioBlock(container, word.text, { delay: 400 });
    await Transitions.pause(800);

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