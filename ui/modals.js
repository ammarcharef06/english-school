const Modals = {

  open(contentHtml) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');

    content.innerHTML = contentHtml;
    overlay.classList.remove('hidden');

    overlay.onclick = (e) => {
      if (e.target === overlay) this.close();
    };

    return content;
  },

  close() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('hidden');
    document.getElementById('overlay-content').innerHTML = '';
  },

  confirm(title, message, onConfirm) {
    const content = this.open(`
      <h2 style="font-size:1.3rem; color:var(--color-gold); margin-bottom:1rem;">${title}</h2>
      <p style="color:var(--color-text-dim); margin-bottom:1.5rem; line-height:1.8;">${message}</p>
      <div style="display:flex; gap:0.6rem;">
        <button class="choice-btn" id="modal-cancel" style="flex:1;">إلغاء</button>
        <button class="choice-btn" id="modal-confirm" style="flex:1; background:linear-gradient(180deg, var(--color-error), var(--color-error-deep)); border-color:var(--color-error); color:white;">تأكيد</button>
      </div>
    `);

    content.querySelector('#modal-cancel').onclick = () => this.close();
    content.querySelector('#modal-confirm').onclick = () => {
      this.close();
      if (onConfirm) onConfirm();
    };
  },

  stats() {
    const stats = Progress.getStats();

    const content = this.open(`
      <h2 style="font-size:1.3rem; color:var(--color-gold); margin-bottom:1.2rem;">📊 إحصائياتك</h2>
      <div style="display:flex; flex-direction:column; gap:0.8rem;">
        <div style="display:flex; justify-content:space-between; padding:0.6rem 0; border-bottom:1px solid var(--color-border);">
          <span>الحصص المكتملة</span>
          <strong style="color:var(--color-accent);">${stats.lessonsCompleted} / 60</strong>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.6rem 0; border-bottom:1px solid var(--color-border);">
          <span>إجمالي الإجابات</span>
          <strong style="color:var(--color-accent);">${stats.totalAnswers}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.6rem 0; border-bottom:1px solid var(--color-border);">
          <span>الدقة</span>
          <strong style="color:var(--color-accent);">${Math.round(stats.accuracy * 100)}%</strong>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.6rem 0; border-bottom:1px solid var(--color-border);">
          <span>السلسلة الحالية</span>
          <strong style="color:var(--color-warn);">${stats.streak} أيام</strong>
        </div>
        <div style="display:flex; justify-content:space-between; padding:0.6rem 0;">
          <span>أطول سلسلة</span>
          <strong style="color:var(--color-warn);">${stats.longestStreak} أيام</strong>
        </div>
      </div>
      <div style="display:flex; gap:0.6rem; margin-top:1.5rem;">
        <button class="choice-btn" id="modal-close" style="flex:1;">إغلاق</button>
        <button class="choice-btn" id="modal-reset" style="flex:1; background:linear-gradient(180deg, var(--color-error), var(--color-error-deep)); border-color:var(--color-error); color:white;">إعادة تعيين</button>
      </div>
    `);

    content.querySelector('#modal-close').onclick = () => this.close();
    content.querySelector('#modal-reset').onclick = () => {
      this.close();
      this.confirm(
        'إعادة التعيين',
        'سيتم حذف كل تقدمك. لا يمكن التراجع.',
        () => {
          State.reset();
          location.reload();
        }
      );
    };
  }
};