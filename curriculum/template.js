const LessonTemplate = {

  create(id, config = {}) {
    return {
      id,
      title: config.title || `الحصة ${id}`,
      goal: config.goal || '',
      duration: config.duration || 15,
      stages: config.stages || [],
      onComplete: config.onComplete || null
    };
  },

  validate(lesson) {
    if (!lesson.id || typeof lesson.id !== 'number') {
      console.error('Lesson must have numeric id');
      return false;
    }
    if (!lesson.title) {
      console.error('Lesson must have title');
      return false;
    }
    return true;
  }
};