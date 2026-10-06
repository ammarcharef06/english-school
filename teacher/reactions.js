const Reactions = {

  onCorrect: [
    'أحسنت.',
    'بالضبط.',
    'ممتاز.',
    'صحيح تماماً.',
    'رائع.'
  ],

  onWrong: [
    'لا بأس، لنجرب مرة أخرى.',
    'قريب. اسمع بعناية.',
    'هذا طبيعي في البداية.',
    'دعني أساعدك.'
  ],

  onComplete: [
    'عمل رائع اليوم.',
    'أنا فخور بك.',
    'تقدم جميل.',
    'أكملت الحصة بنجاح.'
  ],

  pickCorrect() {
    return this.onCorrect[Math.floor(Math.random() * this.onCorrect.length)];
  },

  pickWrong() {
    return this.onWrong[Math.floor(Math.random() * this.onWrong.length)];
  },

  pickComplete() {
    return this.onComplete[Math.floor(Math.random() * this.onComplete.length)];
  }
};