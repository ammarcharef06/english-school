const SRS = {

  INTERVALS: [0, 1, 2, 4, 8, 16, 32, 64],

  update(storeName, id, correct) {
    const data = State.load();
    const store = data[storeName];

    if (!store[id]) {
      store[id] = {
        level: 0,
        streak: 0,
        wrongStreak: 0,
        correct: 0,
        wrong: 0,
        nextReview: 0,
        lastSeen: 0,
        seen: 0
      };
    }

    const item = store[id];
    item.lastSeen = Date.now();
    item.seen++;

    if (correct) {
      item.correct++;
      item.streak++;
      item.wrongStreak = 0;

      if (item.streak >= 3) {
        item.level = Math.min(this.INTERVALS.length - 1, item.level + 1);
        item.streak = 0;
      }
    } else {
      item.wrong++;
      item.wrongStreak++;
      item.streak = 0;
      item.level = Math.max(0, item.level - 1);
    }

    const days = this.INTERVALS[item.level] || 0;
    item.nextReview = Date.now() + days * 86400000;

    State.save();
    return item;
  },

  getDue(storeName, limit = 20) {
    const store = State.load()[storeName];
    const now = Date.now();

    return Object.entries(store)
      .filter(([_, item]) => item.nextReview <= now)
      .sort((a, b) => a[1].level - b[1].level)
      .slice(0, limit)
      .map(([id, item]) => ({ id, ...item }));
  },

  getWeak(storeName, limit = 10) {
    const store = State.load()[storeName];

    return Object.entries(store)
      .filter(([_, item]) => item.wrongStreak > 0)
      .sort((a, b) => b[1].wrongStreak - a[1].wrongStreak)
      .slice(0, limit)
      .map(([id, item]) => ({ id, ...item }));
  },

  getMastery(storeName, id) {
    const item = State.load()[storeName][id];
    return item ? item.level : 0;
  },

  isMastered(storeName, id) {
    return this.getMastery(storeName, id) >= 3;
  },

  reset(storeName, id) {
    const data = State.load();
    if (data[storeName][id]) {
      delete data[storeName][id];
      State.save();
    }
  }
};