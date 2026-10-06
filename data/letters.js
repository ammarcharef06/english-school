const DataLetters = {

  list: [
    { char: 'a', sound: 'ae', word: 'apple',  emoji: '🍎' },
    { char: 'b', sound: 'b',  word: 'bed',    emoji: '🛏️' },
    { char: 'c', sound: 'k',  word: 'cat',    emoji: '🐱' },
    { char: 'd', sound: 'd',  word: 'dog',    emoji: '🐶' },
    { char: 'e', sound: 'e',  word: 'egg',    emoji: '🥚' },
    { char: 'f', sound: 'f',  word: 'fish',   emoji: '🐟' },
    { char: 'g', sound: 'g',  word: 'goat',   emoji: '🐐' },
    { char: 'h', sound: 'h',  word: 'hat',    emoji: '🎩' },
    { char: 'i', sound: 'i',  word: 'ink',    emoji: '🖋️' },
    { char: 'j', sound: 'j',  word: 'jam',    emoji: '🍯' },
    { char: 'k', sound: 'k',  word: 'kite',   emoji: '🪁' },
    { char: 'l', sound: 'l',  word: 'leg',    emoji: '🦵' },
    { char: 'm', sound: 'm',  word: 'man',    emoji: '👨' },
    { char: 'n', sound: 'n',  word: 'net',    emoji: '🥅' },
    { char: 'o', sound: 'o',  word: 'ox',     emoji: '🐂' },
    { char: 'p', sound: 'p',  word: 'pen',    emoji: '🖊️' },
    { char: 'q', sound: 'k',  word: 'queen',  emoji: '👑' },
    { char: 'r', sound: 'r',  word: 'red',    emoji: '🔴' },
    { char: 's', sound: 's',  word: 'sun',    emoji: '☀️' },
    { char: 't', sound: 't',  word: 'top',    emoji: '🔝' },
    { char: 'u', sound: 'ah', word: 'cup',    emoji: '🥤' },
    { char: 'v', sound: 'v',  word: 'van',    emoji: '🚐' },
    { char: 'w', sound: 'w',  word: 'wet',    emoji: '💧' },
    { char: 'x', sound: 'k',  word: 'box',    emoji: '📦' },
    { char: 'y', sound: 'y',  word: 'yes',    emoji: '✅' },
    { char: 'z', sound: 'z',  word: 'zoo',    emoji: '🦁' }
  ],

  byChar(char) {
    return this.list.find(l => l.char === char);
  },

  bySound(soundId) {
    return this.list.filter(l => l.sound === soundId);
  }
};