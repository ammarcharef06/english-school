const Pacing = {

  _responseTimes: [],
  _maxSamples: 20,

  record(responseTime) {
    if (responseTime <= 0) return;
    this._responseTimes.push(responseTime);
    if (this._responseTimes.length > this._maxSamples) {
      this._responseTimes.shift();
    }
  },

  getAverage() {
    if (!this._responseTimes.length) return 3000;
    const sum = this._responseTimes.reduce((a, b) => a + b, 0);
    return sum / this._responseTimes.length;
  },

  getSpeed() {
    const avg = this.getAverage();
    if (avg < 1500) return 'fast';
    if (avg < 3500) return 'normal';
    return 'slow';
  },

  getDelay(base = 1500) {
    const speed = this.getSpeed();
    if (speed === 'fast') return base * 0.6;
    if (speed === 'slow') return base * 1.6;
    return base;
  },

  wait(base = 1500) {
    return new Promise(resolve => setTimeout(resolve, this.getDelay(base)));
  },

  shouldRepeat() {
    return this.getSpeed() === 'slow';
  },

  reset() {
    this._responseTimes = [];
  }
};