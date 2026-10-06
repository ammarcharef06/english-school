const Progress = {

  TOTAL_LESSONS: 60,

  getOverall() {
    const data = State.load();
    const completed = data.completedLessons.length;
    const percent = Math.round((completed / this.TOTAL_LESSONS) * 100);

    return {
      completed,
      total: this.TOTAL_LESSONS,
      percent,
      current: data.currentLesson
    };
  },

  getLessonScore(lessonId) {
    return State.load().lessonScores[lessonId] || 0;
  },

  completeLesson(lessonId, score) {
    const data = State.load();

    if (!data.completedLessons.includes(lessonId)) {
      data.completedLessons.push(lessonId);
    }

    data.lessonScores[lessonId] = Math.max(
      data.lessonScores[lessonId] || 0,
      score
    );

    if (lessonId >= data.currentLesson) {
      data.currentLesson = lessonId + 1;
    }

    State.save();
    return data.completedLessons.length;
  },

  isUnlocked(lessonId) {
    const data = State.load();
    if (lessonId <= 1) return true;
    return data.completedLessons.includes(lessonId - 1);
  },

  reset() {
    const data = State.load();
    data.completedLessons = [];
    data.lessonScores = {};
    data.currentLesson = 1;
    State.save();
  },

  getStats() {
    const data = State.load();
    return {
      lessonsCompleted: data.completedLessons.length,
      totalAnswers: data.totalAnswers,
      accuracy: State.getAccuracy(),
      streak: data.streak.current,
      longestStreak: data.streak.longest
    };
  }
};