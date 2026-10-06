const DataStories = {

  list: [
    {
      id: 'story-cat',
      title: 'القطة',
      emoji: '🐱',
      lines: [
        { en: 'A cat.',           ar: 'قطة.' },
        { en: 'The cat is red.',  ar: 'القطة حمراء.' },
        { en: 'The cat is on a mat.', ar: 'القطة على الحصيرة.' }
      ]
    },
    {
      id: 'story-man',
      title: 'الرجل',
      emoji: '👨',
      lines: [
        { en: 'A man.',           ar: 'رجل.' },
        { en: 'The man has a hat.', ar: 'الرجل لديه قبعة.' },
        { en: 'The hat is red.',  ar: 'القبعة حمراء.' }
      ]
    }
  ],

  byId(id) {
    return this.list.find(s => s.id === id);
  }
};