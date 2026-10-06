const Teacher = {

  name: 'المعلم',

  moods: {
    calm:         { icon: '👨‍🏫', className: 'mood-calm' },
    thinking:     { icon: '🤔', className: 'mood-thinking' },
    happy:        { icon: '😊', className: 'mood-happy' },
    encouraging:  { icon: '💪', className: 'mood-encouraging' },
    sad:          { icon: '😔', className: 'mood-calm' }
  },

  getMood(mood) {
    return this.moods[mood] || this.moods.calm;
  }
};