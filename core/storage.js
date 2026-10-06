const Storage = {

  PREFIX: 'school.v1.',

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(this.PREFIX + key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Storage.get failed:', key, e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage.set failed:', key, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(this.PREFIX + key);
      return true;
    } catch (e) {
      return false;
    }
  },

  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(k => {
        if (k.startsWith(this.PREFIX)) localStorage.removeItem(k);
      });
      return true;
    } catch (e) {
      return false;
    }
  },

  exists(key) {
    return localStorage.getItem(this.PREFIX + key) !== null;
  }
};