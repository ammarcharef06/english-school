const EnglishAudio = {

  _voice: null,
  _ready: false,
  _queue: [],

  init() {
    if (!('speechSynthesis' in window)) {
      console.warn('English audio: not supported');
      return;
    }

    const load = () => {
      const voices = speechSynthesis.getVoices();
      if (!voices.length) return;

      const preferred =
        voices.find(v => v.lang === 'en-US' && /google|samantha|natural/i.test(v.name)) ||
        voices.find(v => v.lang === 'en-US') ||
        voices.find(v => v.lang.startsWith('en-GB')) ||
        voices.find(v => v.lang.startsWith('en')) ||
        null;

      this._voice = preferred;
      this._ready = true;

      while (this._queue.length) {
        const job = this._queue.shift();
        this.speak(job.text, job.rate);
      }
    };

    load();
    speechSynthesis.onvoiceschanged = load;
    setTimeout(load, 400);
    setTimeout(load, 1200);
  },

  speak(text, rate = 0.85) {
    if (!text) return;

    if (!this._ready) {
      this._queue.push({ text, rate });
      return;
    }

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    if (this._voice) utter.voice = this._voice;
    utter.lang = 'en-US';
    utter.rate = rate;
    utter.pitch = 1;
    utter.volume = 1;

    speechSynthesis.speak(utter);
  },

  slow(text) {
    this.speak(text, 0.55);
  },

  normal(text) {
    this.speak(text, 0.85);
  },

  async repeat(text, times = 3, rate = 0.85) {
    for (let i = 0; i < times; i++) {
      this.speak(text, rate);
      await this.wait(1200 + text.length * 80);
    }
  },

  stop() {
    speechSynthesis.cancel();
  },

  wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  },

  isSupported() {
    return 'speechSynthesis' in window;
  }
};

EnglishAudio.init();