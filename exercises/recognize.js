const ExerciseRecognize = {

  async picture(container, config) {
    const { target, options } = config;

    Components.pictureFrame(container, target.emoji);
    await Transitions.pause(400);

    Session.startQuestion();

    const choices = options.map(o => ({
      emoji: o.emoji,
      label: o.meaning,
      value: o.id
    }));

    const result = await Choices.ask(container, choices);
    const correct = result.option.value === target.id;
    Choices.mark(result.button, correct);
    Session.recordAnswer(correct);

    return correct;
  },

  async word(container, config) {
    const { word, options } = config;

    Components.wordCard(container, word.text);
    await Transitions.pause(400);

    AudioPlayer.playEnglish(word.text, 0.85);

    Session.startQuestion();

    const result = await Choices.ask(container, options);
    const correct = result.option.value === word.id;
    Choices.mark(result.button, correct);
    Session.recordAnswer(correct);

    return correct;
  }
};