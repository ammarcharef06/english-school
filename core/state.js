const State = {

  _data: null,

  DEFAULT: {
    version: 1,
    createdAt: null,
    lastVisit: null,

    currentLesson: 1,
    completedLessons: [],
    lessonScores: {},

    phonemeMastery: {},
    letterMastery: {},
    wordMastery: {},

    history: [],
    totalAnswers: 0,
    totalCorrect: 0,

    streak: {
      current: 0,
      longest: 0,
      lastDay: null
    },

    settings: {
      arabicVoice: true,
      englishSpeed: 0.85,
      reducedMotion: false
    }
  },

  load() {
    if (this._data) return this._data;

    const stored = Storage.get('state', null);

    if (stored && stored.version === this.DEFAULT.version) {
      this._data = this.mergeDeep(JSON.parse(JSON.stringify(this.DEFAULT)), stored);
    } else {
      this._data = JSON.parse(JSON.stringify(this.DEFAULT));
      this._data.createdAt = Date.now();
      this.save();
    }

    return this._data;
  },

  save() {
    if (!this._data) return;
    this._data.lastVisit = Date.now();
    Storage.set('state', this._data);
  },

  get() {
    return this.load();
  },

  set(key, value) {
    const data = this.load();
    data[key] = value;
    this.save();
  },

  reset() {
    Storage.remove('state');
    this._data = null;
    this.load();
  },

  mergeDeep(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        this.mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  },

  today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  updateStreak() {
    const data = this.load();
    const today = this.today();
    const last = data.streak.lastDay;

    if (!last) {
      data.streak.current = 1;
      data.streak.longest = 1;
    } else if (last === today) {
      return data.streak.current;
    } else {
      const days = this.daysBetween(last, today);
      if (days === 1) {
        data.streak.current++;
        if (data.streak.current > data.streak.longest) {
          data.streak.longest = data.streak.current;
        }
      } else if (days > 1) {
        data.streak.current = 1;
      }
    }

    data.streak.lastDay = today;
    this.save();
    return data.streak.current;
  },

  daysBetween(d1, d2) {
    const a = new Date(d1);
    const b = new Date(d2);
    return Math.round((b - a) / 86400000);
  },

  recordAnswer(correct) {
    const data = this.load();
    data.totalAnswers++;
    if (correct) data.totalCorrect++;
    this.save();
  },

  getAccuracy() {
    const data = this.load();
    if (!data.totalAnswers) return 0;
    return data.totalCorrect / data.totalAnswers;
  }
};