const Lesson00 = LessonTemplate.create(0, {
  title: 'حصة تجريبية',
  goal: 'التأكد من أن كل شيء يعمل: الصوت، العرض، التفاعل',
  duration: 3,
  stages: []
});

Lesson00.run = async function(container) {

  Session.start(0);

  let correctCount = 0;
  let totalCount = 0;

  container.innerHTML = '';

  TeacherSpeech.say(container, `
    أهلاً بك.
    <br><br>
    هذه حصة قصيرة للتأكد من أن كل شيء يعمل.
    <br><br>
    سأشغّل لك صوتاً إنجليزياً، ثم أسألك سؤالاً بسيطاً.
  `, { mood: 'calm' });

  await Transitions.pause(4000);

  container.innerHTML = '';

  TeacherSpeech.say(container, `
    اسمع هذه الكلمة:
  `, { mood: 'calm', arabicAudio: true });

  await Transitions.pause(2000);

  Components.audioBlock(container, 'cat');

  await Transitions.pause(2000);

  container.innerHTML = '';

  TeacherSpeech.say(container, `
    السؤال: هل هذه قطة أم كلب؟
  `, { mood: 'thinking' });

  await Transitions.pause(2000);

  totalCount++;
  const result = await Choices.ask(container, [
    { emoji: '🐱', label: 'قطة', value: 'cat' },
    { emoji: '🐶', label: 'كلب', value: 'dog' }
  ]);

  const isCorrect = result.option.value === 'cat';
  Choices.mark(result.button, isCorrect);
  Session.recordAnswer(isCorrect);

  if (isCorrect) {
    correctCount++;
    Feedback.correct(container);
    Transitions.celebrate(['⭐', '✨']);
    await Transitions.pause(1500);
  } else {
    Feedback.wrong(container, 'قطة');
    await Transitions.pause(1500);
  }

  container.innerHTML = '';

  TeacherSpeech.say(container, `
    انتهت الحصة التجريبية.
    <br><br>
    إذا سمعت الصوت، ورأيت الأزرار، وتم تسجيل إجابتك، فكل شيء يعمل.
    <br><br>
    الحصص الحقيقية ستبدأ قريباً.
  `, { mood: 'happy' });

  await Transitions.pause(3000);

  const stats = Session.end();
  return {
    passed: correctCount >= 1,
    score: correctCount / Math.max(1, totalCount),
    stats
  };
};

Curriculum.register(Lesson00);