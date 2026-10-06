const ExerciseMatch = {

  async emojiToWord(container, config) {
    const { target, options } = config;

    Components.pictureFrame(container, target.emoji);
    await Transitions.pause(400);

    Session.startQuestion();

    const choices = options.map(o => ({
      label: o.text,
      value: o.id,
      sublabel: o.meaning
    }));

    const result = await Choices.ask(container, choices);
    const correct = result.option.value === target.id;
    Choices.mark(result.button, correct);
    Session.recordAnswer(correct);

    if (correct) AudioPlayer.playEnglish(target.text, 0.85);

    return correct;
  },

  async wordToEmoji(container, config) {
    const { target, options } = config;

    Components.wordCard(container, target.text);
    AudioPlayer.playEnglish(target.text, 0.85);
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
  }
};