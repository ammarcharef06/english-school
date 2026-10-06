const ExerciseRepeat = {

  async listenAndRepeat(container, config) {
    const { text, times = 3 } = config;

    Components.audioBlock(container, text, { autoPlay: false });
    await Transitions.pause(400);

    for (let i = 0; i < times; i++) {
      AudioPlayer.playEnglish(text, 0.85);
      await Transitions.pause(1500);
    }

    return true;
  }
};