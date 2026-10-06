const Session = {

  _start: null,
  _answers: 0,
  _correct: 0,
  _lessonId: null,
  _questionStart: null,

  start(lessonId) {
    this._start = Date.now();
    this._answers = 0;
    this._correct = 0;
    this._lessonId = lessonId;
    this._questionStart = null;
  },

  end() {
    const duration = this._start ? Math.round((Date.now() - this._start) / 1000) : 0;
    const stats = {
      lessonId: this._lessonId,
      duration,
      answers: this._answers,
      correct: this._correct,
      accuracy: this._answers ? this._correct / this._answers : 0
    };
    this._start = null;
    return stats;
  },

  startQuestion() {
    this._questionStart = Date.now();
  },

  responseTime() {
    if (!this._questionStart) return 0;
    return Date.now() - this._questionStart;
  },

  recordAnswer(correct) {
    this._answers++;
    if (correct) this._correct++;
    State.recordAnswer(correct);
  },

  getStats() {
    return {
      answers: this._answers,
      correct: this._correct,
      accuracy: this._answers ? this._correct / this._answers : 0,
      duration: this._start ? Math.round((Date.now() - this._start) / 1000) : 0
    };
  },

  isActive() {
    return this._start !== null;
  }
};