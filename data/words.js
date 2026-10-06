const DataWords = {

  list: [
    { id: 'cat',   text: 'cat',   meaning: 'قطة',   emoji: '🐱', phonemes: ['k','ae','t'] },
    { id: 'hat',   text: 'hat',   meaning: 'قبعة',  emoji: '🎩', phonemes: ['h','ae','t'] },
    { id: 'bat',   text: 'bat',   meaning: 'خفاش',  emoji: '🦇', phonemes: ['b','ae','t'] },
    { id: 'rat',   text: 'rat',   meaning: 'فأر',   emoji: '🐀', phonemes: ['r','ae','t'] },
    { id: 'mat',   text: 'mat',   meaning: 'حصيرة', emoji: '🟫', phonemes: ['m','ae','t'] },
    { id: 'map',   text: 'map',   meaning: 'خريطة', emoji: '🗺️', phonemes: ['m','ae','p'] },
    { id: 'cap',   text: 'cap',   meaning: 'طاقية', emoji: '🧢', phonemes: ['k','ae','p'] },
    { id: 'nap',   text: 'nap',   meaning: 'قيلولة',emoji: '😴', phonemes: ['n','ae','p'] },
    { id: 'tap',   text: 'tap',   meaning: 'صنبور', emoji: '🚰', phonemes: ['t','ae','p'] },
    { id: 'pan',   text: 'pan',   meaning: 'مقلاة', emoji: '🍳', phonemes: ['p','ae','n'] },
    { id: 'man',   text: 'man',   meaning: 'رجل',   emoji: '👨', phonemes: ['m','ae','n'] },
    { id: 'fan',   text: 'fan',   meaning: 'مروحة', emoji: '🌀', phonemes: ['f','ae','n'] },
    { id: 'bed',   text: 'bed',   meaning: 'سرير',  emoji: '🛏️', phonemes: ['b','e','d'] },
    { id: 'pen',   text: 'pen',   meaning: 'قلم',   emoji: '🖊️', phonemes: ['p','e','n'] },
    { id: 'ten',   text: 'ten',   meaning: 'عشرة', emoji: '🔟', phonemes: ['t','e','n'] },
    { id: 'hen',   text: 'hen',   meaning: 'دجاجة',emoji: '🐔', phonemes: ['h','e','n'] },
    { id: 'men',   text: 'men',   meaning: 'رجال',  emoji: '👬', phonemes: ['m','e','n'] },
    { id: 'red',   text: 'red',   meaning: 'أحمر',  emoji: '🔴', phonemes: ['r','e','d'] },
    { id: 'sun',   text: 'sun',   meaning: 'شمس',   emoji: '☀️', phonemes: ['s','ah','n'] },
    { id: 'cup',   text: 'cup',   meaning: 'كوب',   emoji: '🥤', phonemes: ['k','ah','p'] }
  ],

  byId(id) {
    return this.list.find(w => w.id === id);
  },

  byPhoneme(phonemeId) {
    return this.list.filter(w => w.phonemes.includes(phonemeId));
  },

  random(count = 1) {
    const shuffled = [...this.list].sort(() => Math.random() - 0.5);
    return count === 1 ? shuffled[0] : shuffled.slice(0, count);
  },

  all() {
    return this.list;
  }
};