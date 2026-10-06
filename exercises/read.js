const ExerciseRead = {

  async readWord(container, config) {
    const { word } = config;

    Components.wordCard(container, word.text);
    Components.audioBlock(container, word.text, { delay: 400 });

    await Transitions.pause(800);

    Session.startQuestion();

    const result = await Choices.ask(container, [
      { label: word.meaning, value: 'correct' },
      { label: 'لا أعرف', value: 'unknown' }
    ]);

    const correct = result.option.value === 'correct';
    Choices.mark(result.button, correct);
    Session.recordAnswer(correct);

    return correct;
  }
};