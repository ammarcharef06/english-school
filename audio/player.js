const AudioPlayer = {

  _current: null,

  playEnglish(text, rate = 0.85) {
    this._current = 'en';
    EnglishAudio.speak(text, rate);
  },

  playArabic(text) {
    ArabicAudio.say(text);
  },

  async playSequence(items, gapMs = 700) {
    for (const item of items) {
      if (item.lang === 'ar') {
        ArabicAudio.say(item.text);
      } else {
        EnglishAudio.speak(item.text, item.rate || 0.85);
      }
      await this.wait(gapMs + (item.text?.length || 0) * 60);
    }
  },

  stop() {
    EnglishAudio.stop();
    ArabicAudio.stop();
  },

  wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  },

  highlight(element, duration = 1200) {
    if (!element) return;
    element.classList.add('playing');
    setTimeout(() => element.classList.remove('playing'), duration);
  }
};