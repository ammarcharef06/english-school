const Curriculum = {

  lessons: {},

  register(lesson) {
    if (!LessonTemplate.validate(lesson)) return false;
    this.lessons[lesson.id] = lesson;
    return true;
  },

  get(id) {
    return this.lessons[id] || null;
  },

  has(id) {
    return !!this.lessons[id];
  },

  list() {
    return Object.values(this.lessons).sort((a, b) => a.id - b.id);
  },

  total() {
    return Progress.TOTAL_LESSONS;
  },

  nextAfter(id) {
    const sorted = this.list().map(l => l.id);
    const higher = sorted.filter(n => n > id);
    return higher.length ? higher[0] : null;
  }
};