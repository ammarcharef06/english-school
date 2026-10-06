const App = {

  init() {
    State.load();
    State.updateStreak();

    this.bindWelcome();
    this.bindMenu();
    this.bindKeyboard();

    Progress.updateUI();
    this.updateHeader();

    setTimeout(() => {
      const hasProgress = State.get().completedLessons.length > 0;

      if (hasProgress) {
        Screens.show('school');
        this.startLesson(State.get().currentLesson);
      } else {
        Screens.show('welcome');
      }
    }, 1400);
  },

  bindWelcome() {
    const btn = document.getElementById('btn-enter');
    if (btn) {
      btn.onclick = () => {
        Screens.show('school');
        const startAt = State.get().currentLesson || 0;
        this.startLesson(startAt);
      };
    }
  },

  bindMenu() {
    const btn = document.getElementById('btn-menu');
    if (btn) {
      btn.onclick = () => Modals.stats();
    }
  },

  bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') Modals.close();
    });
  },

  async startLesson(lessonId) {
    const container = document.getElementById('stage-content');
    container.innerHTML = '';

    let lesson = Curriculum.get(lessonId);

    if (!lesson) {
      lesson = Curriculum.get(0);
      if (!lesson) {
        this.showPlaceholder(container, lessonId);
        return;
      }
    }

    this.updateLessonLabel(lesson);

    await lesson.run(container);

    const stats = Session.getStats();
    this.showCompletion(container, lesson, stats);
  },

  updateLessonLabel(lesson) {
    const label = document.getElementById('lesson-label');
    if (label) {
      if (lesson.id === 0) {
        label.textContent = 'الحصة التجريبية';
      } else {
        label.textContent = `الحصة ${lesson.id} — ${lesson.title}`;
      }
    }
  },

  updateHeader() {
    Progress.updateUI();
  },

  showPlaceholder(container, lessonId) {
    container.innerHTML = '';

    TeacherSpeech.say(container, `
      الحصة <strong>${lessonId}</strong> قيد الإعداد.
      <br><br>
      يمكنك تجربة الحصة التجريبية لرؤية كيف يعمل النظام.
    `, { mood: 'thinking' });

    setTimeout(() => {
      const btn = Components.button('ابدأ الحصة التجريبية', {
        className: 'choice-btn',
        onClick: () => this.startLesson(0)
      });
      const area = document.createElement('div');
      area.className = 'student-area';
      area.appendChild(btn);
      container.appendChild(area);
    }, 2500);
  },

  showCompletion(container, lesson, stats) {
    const accuracy = Math.round(stats.accuracy * 100);
    const duration = stats.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const timeStr = minutes > 0 ? `${minutes} د ${seconds} ث` : `${seconds} ث`;

    if (lesson.id > 0) {
      Progress.completeLesson(lesson.id, stats.accuracy);
    }

    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'completion-card';
    card.innerHTML = `
      <div class="completion-icon">🎉</div>
      <div class="completion-title">${Reactions.pickComplete()}</div>
      <div class="completion-subtitle">
        ${lesson.id > 0 ? 'أكملت الحصة بنجاح.' : 'الحصة التجريبية انتهت.'}
      </div>

      <div class="completion-stats">
        ${Components.statBox('إجابات صحيحة', stats.correct)}
        ${Components.statBox('إجمالي الأسئلة', stats.answers)}
        ${Components.statBox('الدقة', `${accuracy}%`)}
        ${Components.statBox('الوقت', timeStr)}
      </div>

      <button class="choice-btn" id="btn-next" style="width:100%;">
        ${lesson.id > 0 ? 'الحصة التالية' : 'العودة للبداية'}
      </button>
    `;

    container.appendChild(card);

    Transitions.celebrate(['🎉', '⭐', '✨', '🌟']);

    setTimeout(() => {
      const nextBtn = document.getElementById('btn-next');
      if (!nextBtn) return;
      nextBtn.onclick = () => {
        if (lesson.id === 0) {
          Screens.show('welcome');
        } else {
          this.startLesson(lesson.id + 1);
        }
      };
    }, 100);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());