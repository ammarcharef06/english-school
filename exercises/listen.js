const ExerciseListen = {

  async discrimination(container, config) {
    const { phonemeA, phonemeB, isSame } = config;

    const playA = phonemeA.example;
    const playB = isSame ? phonemeA.example : phonemeB.example;

    const block = document.createElement('div');
    block.className = 'audio-block';
    block.innerHTML = `
      <button class="listen-btn" id="play-a">🔊</button>
      <button class="listen-btn" id="play-b">🔊</button>
    `;
    container.appendChild(block);

    block.querySelector('#play-a').onclick = () => {
      AudioPlayer.playEnglish(playA, 0.75);
    };
    block.querySelector('#play-b').onclick = () => {
      AudioPlayer.playEnglish(playB, 0.75);
    };

    await Transitions.pause(400);
    AudioPlayer.playEnglish(playA, 0.75);

    Session.startQuestion();

    const result = await Choices.ask(container, [
      { label: 'نعم، نفس الصوت', value: true },
      { label: 'لا، صوتان مختلفان', value: false }
    ]);

    const correct = result.option.value === isSame;
    Choices.mark(result.button, correct);
    Session.recordAnswer(correct);

    return correct;
  },

  async identify(container, config) {
    const { audio, options, correctOption } = config;

    Components.audioBlock(container, audio, { delay: 400 });
    await Transitions.pause(800);

    Session.startQuestion();

    const result = await Choices.ask(container, options);
    const correct = result.option.value === correctOption;
    Choices.mark(result.button, correct);
    Session.recordAnswer(correct);

    return correct;
  }
};