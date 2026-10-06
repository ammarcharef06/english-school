const Screens = {

  current: 'splash',

  show(name) {
    const screens = ['splash', 'welcome', 'school'];
    screens.forEach(s => {
      const el = document.getElementById(s);
      if (el) el.classList.toggle('hidden', s !== name);
    });

    document.getElementById('app').classList.remove('app-loading');
    this.current = name;
  },

  hide(name) {
    const el = document.getElementById(name);
    if (el) el.classList.add('hidden');
  },

  openOverlay(html) {
    return Modals.open(html);
  },

  closeOverlay() {
    Modals.close();
  }
};