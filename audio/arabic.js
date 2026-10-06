const ArabicAudio = {

  _voice: null,
  _ready: false,
  _enabled: true,
  _queue: [],

  init() {
    if (!('speechSynthesis' in window)) return;

    const load = () => {
      const voices = speechSynthesis.getVoices();
      if (!voices.length) return;

      const preferred =
        voices.find(v => v.lang === 'ar-SA') ||
        voices.find(v => v.lang.startsWith('ar')) ||
        null;

      this._voice = preferred;
      this._ready = true;

      while (this._queue.length) {
        const job = this._queue.shift();
        this.say(job.text);
      }
    };

    load();
    speechSynthesis.onvoiceschanged = load;
    setTimeout(load, 400);
    setTimeout(load, 1200);
  },

  setEnabled(enabled) {
    this._enabled = !!enabled;
    State.get().settings.arabicVoice = this._enabled;
    State.save();
  },

  isEnabled() {
    return this._enabled && State.get().settings.arabicVoice !== false;
  },

  say(text) {
    if (!text || !this.isEnabled()) return;
    if (!this._voice) {
      this._queue.push({ text });
      return;
    }

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = this._voice;
    utter.lang = 'ar-SA';
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.volume = 1;

    speechSynthesis.speak(utter);
  },

  stop() {
    speechSynthesis.cancel();
  },

  hasVoice() {
    return this._voice !== null;
  }
};

ArabicAudio.init();