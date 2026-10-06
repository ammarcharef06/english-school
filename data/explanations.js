const DataExplanations = {

  greetings: [
    'أهلاً بك.',
    'مرحباً بعودتك.',
    'أهلاً بك مرة أخرى.'
  ],

  encouragement: [
    'أحسنت.',
    'ممتاز.',
    'رائع.',
    'عمل جيد.',
    'استمر هكذا.',
    'تقدم جميل.'
  ],

  gentle: [
    'لا بأس. لنجرب مرة أخرى.',
    'قريب. اسمع بعناية.',
    'الأخطاء جزء من التعلم.',
    'دعني أساعدك.'
  ],

  transitions: [
    'لننتقل إلى الخطوة التالية.',
    'الآن، الجزء التالي.',
    'استعد.',
    'انتبه.'
  ],

  getGreeting() {
    return this.greetings[Math.floor(Math.random() * this.greetings.length)];
  },

  getEncouragement() {
    return this.encouragement[Math.floor(Math.random() * this.encouragement.length)];
  },

  getGentle() {
    return this.gentle[Math.floor(Math.random() * this.gentle.length)];
  },

  getTransition() {
    return this.transitions[Math.floor(Math.random() * this.transitions.length)];
  }
};