const DataSentences = {

  list: [
    { id: 's1',  text: 'A cat.',           words: ['A', 'cat'],              meaning: 'قطة.',           emoji: '🐱' },
    { id: 's2',  text: 'A red hat.',       words: ['A', 'red', 'hat'],       meaning: 'قبعة حمراء.',    emoji: '🎩' },
    { id: 's3',  text: 'The man is here.', words: ['The', 'man', 'is', 'here'], meaning: 'الرجل هنا.', emoji: '👨' },
    { id: 's4',  text: 'I see a cat.',     words: ['I', 'see', 'a', 'cat'],  meaning: 'أرى قطة.',       emoji: '👀' },
    { id: 's5',  text: 'The sun is hot.',  words: ['The', 'sun', 'is', 'hot'], meaning: 'الشمس حارة.',  emoji: '☀️' },
    { id: 's6',  text: 'A big red box.',   words: ['A', 'big', 'red', 'box'], meaning: 'صندوق أحمر كبير.', emoji: '📦' }
  ],

  byId(id) {
    return this.list.find(s => s.id === id);
  },

  all() {
    return this.list;
  }
};